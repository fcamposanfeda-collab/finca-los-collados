export function isActiveNav(href: string, currentPath: string): boolean {
  if (href.startsWith('/#')) {
    return currentPath === '/';
  }
  if (href === '/') {
    return currentPath === '/' || currentPath === '';
  }
  return currentPath.startsWith(href);
}
