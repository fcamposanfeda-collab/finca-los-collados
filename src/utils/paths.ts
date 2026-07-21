/** Prefija rutas absolutas con el `base` de Astro (necesario en GitHub Pages). */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//') || path.startsWith('/#')) {
    return path;
  }

  const base = import.meta.env.BASE_URL;
  if (!base || base === '/') return path;

  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${path.slice(1)}`;
}

/** Quita el `base` del pathname para comparar con hrefs lógicos (`/alojamiento`). */
export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!base) return pathname || '/';

  if (pathname === base || pathname === `${base}/`) return '/';
  if (pathname.startsWith(`${base}/`)) {
    return pathname.slice(base.length) || '/';
  }
  return pathname || '/';
}
