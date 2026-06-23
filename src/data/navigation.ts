export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: 'La Finca', href: '/la-finca' },
  { label: 'Alojamiento', href: '/alojamiento' },
  { label: 'Gastronomía', href: '/gastronomia' },
  { label: 'Experiencias', href: '/experiencias' },
  { label: 'Empresas', href: '/empresas' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Packs', href: '/packs' },
  { label: 'Entorno', href: '/entorno' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Contacto', href: '/contacto' },
];

export const footerNav: NavLink[] = [
  { label: 'La Finca', href: '/la-finca' },
  { label: 'Alojamiento', href: '/alojamiento' },
  { label: 'Gastronomía', href: '/gastronomia' },
  { label: 'Experiencias', href: '/experiencias' },
  { label: 'Empresas', href: '/empresas' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'Packs', href: '/packs' },
  { label: 'Entorno', href: '/entorno' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Reservas', href: '/reservas-online' },
];

export const legalNav = [
  { label: 'Política de privacidad', href: '/politica-de-privacidad' },
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Política de cookies', href: '/politica-de-cookies' },
  { label: 'Política de reservas', href: '/politica-de-reservas' },
] as const;

export type LegalNavItem = (typeof legalNav)[number];
