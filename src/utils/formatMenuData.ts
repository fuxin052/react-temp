import { filter, cloneDeep, every } from 'lodash';

export interface Menu {
  permissionCode?: string //权限码
  name: string //名称
  path: string //url
  icon?: string,
  type: 'menu'
  children?: (Menu | Button)[]
}

export interface Button {
  permissionCode: string //权限码
  message?: string
  type: 'button'
  children: undefined
}

export default function (menu: Menu[], permission: Set<string>, flag: boolean = false) {
  return filter(cloneDeep(menu).map(item => removeNoPermission(item, permission, flag)), o => o != null);
}

function removeNoPermission(menuItem: Menu | Button, permission: Set<string>, flag: boolean): Menu | undefined {

  const allButton = every(menuItem.children, childrenItem => childrenItem.type === 'button');
  if (menuItem.type === 'button') {
    return undefined;
  } else if (menuItem.children && menuItem.children.length > 0) {
    if (flag && menuItem.permissionCode && !permission.has(menuItem.permissionCode)) {
      return undefined;
    } else if (allButton) {
      delete menuItem.children;
      return menuItem;
    } else {
      const children = filter(menuItem.children.map(item => removeNoPermission(item, permission, flag)), o => o != null) as (Menu | Button)[];
      if (children.length > 0) {
        menuItem.children = children;
      } else {
        delete menuItem.children;
      }
      return menuItem;
    }
  } else {
    if (menuItem.permissionCode && !permission.has(menuItem.permissionCode)) {
      return undefined;
    } else {
      delete menuItem.children;
      return menuItem;
    }
  }
}