import path from 'path';
import * as fs from 'node:fs';
import _ from 'lodash';
import render from './render.js';

const compare = (data1, data2) => {
  const result = [];

  const unionKeys = _.union(_.keys(data1), _.keys(data2)).sort();

  unionKeys.forEach((key) => {
    if (_.has(data1, key) && !_.has(data2, key)) {
      result.push(
        {
          key, value: data1[key], result: 'deleted',
        },
      );
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      result.push(
        {
          key, value: data2[key], result: 'added',
        },
      );
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
      result.push(
        {
          key, value: data1[key], result: 'deleted',
        },
      );
      result.push(
        {
          key, value: data2[key], result: 'added',
        },
      );
    }
    if (_.has(data1, key) && _.has(data2, key) && data1[key] === data2[key]) {
      result.push(
        {
          key, value: data1[key], result: 'equals',
        },
      );
    }
  });

  return result;
};
const runCompare = (filepath1, filepath2, options) => {
  const file1 = path.resolve(filepath1);
  const file2 = path.resolve(filepath2);

  const data1 = JSON.parse(fs.readFileSync(file1, 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(file2, 'utf-8'));

  const result = compare(data1, data2);
  render(result);
};
export { compare, runCompare };
