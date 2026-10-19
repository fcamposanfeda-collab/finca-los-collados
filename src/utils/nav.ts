import type { NavItem } from '../data/navigation';
import type { PageKey } from '../i18n';

export function isActiveNav(itemKey: PageKey, currentPageKey: PageKey): boolean {
  return itemKey === currentPageKey;
}

export function isActiveNavItem(item: NavItem, currentPageKey: PageKey): boolean {
  if (item.children?.some((child) => isActiveNav(child, currentPageKey))) {
    return true;
  }
  return isActiveNav(item.pageKey, currentPageKey);
}
