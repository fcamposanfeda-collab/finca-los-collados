import type { NavItem } from '../data/navigation';
import { stripBase } from './paths';

export function isActiveNav(href: string, currentPath: string): boolean {
  const path = stripBase(currentPath);
  if (href.startsWith('/#')) {
    return path === '/';
  }
  if (href === '/') {
    return path === '/' || path === '';
  }
  return path.startsWith(href);
}

export function isActiveNavItem(item: NavItem, currentPath: string): boolean {
  if (item.children?.some((child) => isActiveNav(child.href, currentPath))) {
    return true;
  }
  return isActiveNav(item.href, currentPath);
}
