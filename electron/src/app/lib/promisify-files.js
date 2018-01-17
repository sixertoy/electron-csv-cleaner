import path from 'path';

const electron = window.require('electron');

const fs = electron.remote.require('fs');
const { URL } = electron.remote.require('url');
const parse = electron.remote.require('csv-parse');
const stringify = electron.remote.require('csv-stringify');

const cleanify = (value, regex, delimiter) => value.split(delimiter)
  .map(val => val.replace(regex, '').trim())
  .join(delimiter);

const splitLines = (lines, regex, delimiter) => lines.map(line =>
  line.map(value => cleanify(value, regex, delimiter)));

const parseFile = (data, regex, delimiter) =>
  new Promise((resolve, reject) =>
    parse(data, { delimiter, quote: '', trim: true }, (err, lines) =>
      (err ? reject(err) : resolve(splitLines(lines, regex, delimiter)))));

const stringifyContent = (parsed, delimiter) =>
  new Promise((resolve, reject) =>
    stringify(parsed, { delimiter, trim: true }, (err, output) =>
      (err ? reject(err) : resolve(output))));

const writeFile = (content, fileobj) =>
  new Promise((resolve, reject) => {
    const dirname = path.dirname(fileobj.path);
    const basename = path.basename(fileobj.path, '.csv');
    const fileuri = path.join(dirname, `${basename}_converted.csv`);
    fs.writeFile(fileuri, content, { encoding: 'utf8' }, err =>
      (err ? reject(err) : resolve(fileobj)));
  });

const promisifyFiles = (fileobj, { delimiter, regex }) =>
  new Promise((resolve, reject) => {
    const fileuri = new URL(`file://${fileobj.path}`);
    return fs.readFile(fileuri, { encoding: 'utf8' }, (err, data) => {
      if (err) reject(err);
      else {
        parseFile(data, regex, delimiter)
          .then(parsed => stringifyContent(parsed, delimiter))
          .then(content => writeFile(content, fileobj))
          .catch(reject);
      }
    });
  });

export default promisifyFiles;
