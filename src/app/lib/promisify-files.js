const fs = window.require('fs');
const { URL } = window.require('url');
const csv = window.require('csvtojson');

const DELIMITER = ';';
const REGEX = new RegExp(/[\r\n\t"]/, 'gi');
const PARSER_OPTIONS = {
  trim: true,
  workerNum: 4,
  flatKeys: true,
  noHeader: true,
  delimiter: DELIMITER
};

const cleanify = value => value.split(DELIMITER)
  .map(val => val.replace(REGEX, '').trim())
  .join(DELIMITER);

const parseContent = cvsstr => new Promise((resolve, reject) => {
  csv(PARSER_OPTIONS).fromString(cvsstr)
    .preFileLine(line => cleanify(line))
    .on('end_parsed', json => resolve(json))
    .on('done', err => (err ? reject(err) : null));
});

const promisifyFiles = (file) => {
  const promise = new Promise((resolve, reject) => {
    const fileuri = new URL(`file://${file}`);
    fs.readFile(fileuri, { encoding: 'utf8' }, (err, data) => {
      if (err) return reject(err);
      return parseContent(data)
        // FIXME -> essayer de ne pas passer le path
        .then(json => resolve({ data: json, filepath: file }))
        .catch(reject);
    });
  });
  return promise;
};

export default promisifyFiles;
