import type { PageKey } from '../i18n';

/**
 * Temporada cinegética (Orden de vedas CLM, DOCM 12/06/2026).
 * Actualizar este archivo cada temporada. No publicar importes.
 *
 * Distancia Madrid 247 km / ~3 h 25 min: OSRM / OpenStreetMap, 19/10/2026,
 * desde el casco de Villamanrique. No mostrar esa fuente en la web ni en JSON-LD.
 */
export const hunting = {
  seasonLabel: '2026-27',
  videoPublished: '2026-10-26',
  videoCredit: 'Vídeo: Certeros Ballesteros · Huntser',
  loopDuration: 'PT13S',
  jornadaDuration: 'PT1M',
  general: {
    start: '2026-10-08',
    end: '2027-02-08',
  },
  reclamoMale: {
    lowAltitude: { start: '2027-01-10', end: '2027-02-20' },
    other: { start: '2027-01-23', end: '2027-03-05' },
    /** TODO_DATO: tramo del Anexo II que corresponde a Villamanrique. */
    villamanriqueBand: null as 'lowAltitude' | 'other' | null,
  },
} as const;

/** Enlaces oficiales. No publicar plazos ni importes. */
export const huntingDocs = {
  clmLicence: 'https://cazaypesca.castillalamancha.es/licencias',
  europeanFirearmsPass:
    'https://web.guardiacivil.es/es/tramites/autorizaciones-de-armas-y-explosivos/controldearmas/tarjeta_europea/',
} as const;

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isInGeneralHuntingSeason(date = new Date()): boolean {
  const day = isoDay(date);
  return day >= hunting.general.start && day <= hunting.general.end;
}

export const huntingModalityOffers = [
  { id: 'ojeo', pageKey: 'caza-ojeo-perdiz', season: 'general' },
  { id: 'en-mano', pageKey: 'caza-en-mano', season: 'general' },
  { id: 'reclamo', pageKey: 'caza-en-mano', season: 'reclamo' },
  { id: 'sueltas', pageKey: 'caza-en-mano', season: 'general' },
] as const satisfies readonly {
  id: string;
  pageKey: PageKey;
  season: 'general' | 'reclamo';
}[];

export const huntingOffersByPage: Partial<Record<PageKey, readonly string[]>> = {
  'la-calerilla': ['ojeo', 'en-mano', 'reclamo', 'sueltas'],
  'caza-ojeo-perdiz': ['ojeo'],
  'caza-en-mano': ['en-mano', 'reclamo', 'sueltas'],
  'caza-estancia': ['ojeo'],
};

export const huntingChildKeys = [
  'caza-ojeo-perdiz',
  'caza-en-mano',
  'caza-estancia',
  'caza-como-llegar',
] as const satisfies readonly PageKey[];

export type HuntingChildKey = (typeof huntingChildKeys)[number];

export function isHuntingChild(pageKey: PageKey): pageKey is HuntingChildKey {
  return (huntingChildKeys as readonly string[]).includes(pageKey);
}

export function isHuntingPage(pageKey: PageKey): boolean {
  return pageKey === 'la-calerilla' || isHuntingChild(pageKey);
}

export function visibleFaqItems<T extends { q: string; a: string }>(items: T[]): T[] {
  return items.filter((item) => !item.q.includes('TODO_DATO') && !item.a.includes('TODO_DATO'));
}

export function visibleLines(items: string[]): string[] {
  return items.filter((item) => !item.includes('TODO_DATO'));
}

export function formatHuntingDay(iso: string, locale: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
