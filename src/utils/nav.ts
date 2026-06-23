import type { NavItem } from '../data/navigation';

export function isActiveNav(href: string, currentPath: string): boolean {
  if (href.startsWith('/#')) {
    return currentPath === '/';
  }
  if (href === '/') {
    return currentPath === '/' || currentPath === '';
  }
  return currentPath.startsWith(href);
}

export function isActiveNavItem(item: NavItem, currentPath: string): boolean {
  if (item.children?.some((child) => isActiveNav(child.href, currentPath))) {
    return true;
  }
  return isActiveNav(item.href, currentPath);
}
