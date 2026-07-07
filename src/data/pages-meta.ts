import { site } from './site';

const brand = site.name;
const location = 'Villamanrique, Ciudad Real';

export const pagesMeta = {
  '/': {
    title: brand,
    description:
      'Finca Los Collados de San Miguel: alojamiento rural en Campos de Montiel. Bungalows pet friendly, teambuilding, rodajes, eventos pequeños y packs en Castilla-La Mancha.',
  },
  '/la-finca': {
    title: `La Finca | Turismo Rural en Campos de Montiel | ${brand}`,
    description:
      'Descubre Los Collados de San Miguel: finca rural con historia de más de 2.500 años, bungalows, piscina y entorno natural en Villamanrique, Ciudad Real.',
  },
  '/la-calerilla': {
    title: `La Calerilla | Caza de Perdiz Roja en Mano | ${brand}`,
    description:
      'La Calerilla: coto de caza de perdiz roja en Campos de Montiel. Caza en mano, temporada de octubre a febrero y alojamiento en Los Collados de San Miguel.',
  },
  '/alojamiento': {
    title: `Alojamiento Rural ${location} | 8 Bungalows Pet Friendly | ${brand}`,
    description:
      '8 bungalows rurales para hasta 16 adultos en Campos de Montiel. Pet friendly, Wi-Fi, piscina y restauración. Reserva en Los Collados de San Miguel.',
  },
  '/gastronomia': {
    title: `Gastronomía Manchega | Restauración Rural | ${brand}`,
    description:
      'Cocina tradicional manchega en entorno rural: migas, perdiz, caldereta y producto local en Finca Los Collados, Ciudad Real.',
  },
  '/experiencias': {
    title: `Experiencias y Rutas en La Mancha | ${brand}`,
    description:
      'Rutas a medida, caballo, bicicleta, golf y globo en Campos de Montiel. Actividades y experiencias en Los Collados de San Miguel.',
  },
  '/empresas': {
    title: `Teambuilding y Rodajes en Finca Rural | Empresas | ${brand}`,
    description:
      'Espacio rural para teambuilding, retiros de empresa, shootings, rodajes y grabación de contenido en Castilla-La Mancha. PYME y equipos.',
  },
  '/eventos': {
    title: `Bodas, Eventos y Celebraciones en Finca Rural | ${location} | ${brand}`,
    description:
      'Bodas hasta 50 invitados, comuniones, cumpleaños, empresas y shootings en finca rural exclusiva. Catering con Azurea. Villamanrique, Ciudad Real.',
  },
  '/packs': {
    title: `Packs Romántico, Familiar y Gastronómico | ${brand}`,
    description:
      'Packs de escapada rural: romántico, familiar, gastronomía y rutas por La Mancha en Los Collados de San Miguel.',
  },
  '/entorno': {
    title: `Entorno y La Mancha | Campos de Montiel | ${brand}`,
    description:
      'Turismo en Campos de Montiel: Villamanrique, patrimonio íbero, Torre de Juan Abad y Villanueva de los Infantes cerca de Los Collados.',
  },
  '/contacto': {
    title: `Contacto y Reservas | ${brand}`,
    description:
      'Contacte con Finca Los Collados de San Miguel. Teléfono, email y formulario para reservas, eventos, empresas y consultas.',
  },
  '/reservas-online': {
    title: `Reservas Online | ${brand}`,
    description:
      'Reserve en Booking.com o por WhatsApp. Finca Los Collados de San Miguel: 8 bungalows rurales en Villamanrique, Ciudad Real. Pet friendly.',
  },
  '/politica-de-privacidad': {
    title: `Política de privacidad | ${brand}`,
    description: 'Política de privacidad y protección de datos de Finca Los Collados de San Miguel.',
  },
  '/aviso-legal': {
    title: `Aviso legal | ${brand}`,
    description: 'Aviso legal de Finca Los Collados de San Miguel.',
  },
  '/politica-de-cookies': {
    title: `Política de cookies | ${brand}`,
    description: 'Política de cookies de Finca Los Collados de San Miguel.',
  },
  '/politica-de-reservas': {
    title: `Política de reservas | ${brand}`,
    description: 'Condiciones y política de reservas de Finca Los Collados de San Miguel.',
  },
} as const;

export type PagePath = keyof typeof pagesMeta;

export function getPageMeta(path: PagePath) {
  return pagesMeta[path];
}
