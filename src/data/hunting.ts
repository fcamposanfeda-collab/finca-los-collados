/**
 * Temporada cinegética (Orden de vedas CLM, DOCM 12/06/2026).
 * Actualizar este archivo cada temporada. No publicar importes.
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

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isInGeneralHuntingSeason(date = new Date()): boolean {
  const day = isoDay(date);
  return day >= hunting.general.start && day <= hunting.general.end;
}
