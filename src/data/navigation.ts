import type { PageKey } from '../i18n';

export type NavItem = {
  pageKey: PageKey;
  /** i18n nav key when the label differs from the pageKey (e.g. Caza). */
  labelKey?: string;
  children?: PageKey[];
};

export const mainNav: NavItem[] = [
  {
    pageKey: 'alojamiento',
    children: ['la-finca', 'gastronomia', 'experiencias', 'entorno'],
  },
  {
    pageKey: 'la-calerilla',
    labelKey: 'caza',
    children: ['caza-ojeo-perdiz', 'caza-en-mano', 'caza-estancia', 'caza-como-llegar'],
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
