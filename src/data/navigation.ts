import type { PageKey } from '../i18n';

export type NavItem = {
  pageKey: PageKey;
  children?: PageKey[];
};

export const mainNav: NavItem[] = [
  {
    pageKey: 'alojamiento',
    children: ['la-finca', 'la-calerilla', 'gastronomia', 'experiencias', 'entorno'],
  },
  { pageKey: 'empresas' },
  { pageKey: 'eventos' },
  { pageKey: 'packs' },
];

export const footerNav: PageKey[] = [
  'la-finca',
  'la-calerilla',
  'alojamiento',
  'gastronomia',
  'experiencias',
  'empresas',
  'eventos',
  'packs',
  'entorno',
  'contacto',
  'reservas-online',
];

export const legalNav = [
  'politica-de-privacidad',
  'aviso-legal',
  'politica-de-cookies',
  'politica-de-reservas',
] as const satisfies readonly PageKey[];
