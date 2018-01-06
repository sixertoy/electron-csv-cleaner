import path from 'path';

const fs = window.require('fs');

const promisifyWriteFiles = ({ data, filepath }) => {
  const dirname = path.dirname(filepath);
  const basename = path.basename(filepath, '.csv');
  const fileuri = path.join(dirname, `${basename}_converted.csv`);
  const promise = new Promise((resolve, reject) =>
    fs.writeFile(fileuri, data, { encoding: 'utf8' }, err =>
      (err ? reject(err) : resolve())));
  return promise;
};

export default promisifyWriteFiles;
