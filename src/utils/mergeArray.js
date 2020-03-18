import { uniqWith } from 'lodash';

export default function (a, b, key) {
  key = key || 'path';
  return uniqWith([...a, ...b], (c, d) => {
    if (c[key] === d[key]) {
      Object.assign(d, c);
      return true;
    } else {
      return false;
    }
  });
}

