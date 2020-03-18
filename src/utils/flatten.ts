import { cloneDeep } from 'lodash';

interface OptType {
  childrenKey: string
}

function flatten(
  arr: any[],
  opt: OptType,
) {
  opt = Object.assign(opt || {}, {
    childrenKey: 'children',
  });
  let i = 0;
  arr = cloneDeep(arr);
  while (arr[i]) {
    const children = arr[i][opt.childrenKey];
    const path = arr[i].path;
    if (children && children.length > 0) {
      children.forEach((v: { parent: any; }) => {
        try { v.parent = path; } catch  { }
      });
      delete arr[i][opt.childrenKey];
      arr.push(...children);
    }
    i++;
  }
  return arr;
}

export default flatten;