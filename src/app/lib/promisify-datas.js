const json2csv = window.require('json2csv');

const DELIMITER = ';';
const PARSER_OPTIONS = {
  quotes: '',
  del: DELIMITER,
  includeEmptyRows: true
};

const promisifyDatas = ({ data, filepath }) => {
  const promise = new Promise((resolve, reject) => {
    try {
      const params = Object.assign({}, PARSER_OPTIONS, { data });
      const json = json2csv(params);
      // FIXME -> essayer de ne pas passer le path
      resolve({ data: json, filepath });
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};

export default promisifyDatas;
