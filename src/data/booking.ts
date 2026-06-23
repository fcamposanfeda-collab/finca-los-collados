import { contact } from './contact';

/**
 * Configuración del motor de reservas.
 *
 * La web en Hostinger es estática (HTML). El calendario, pagos y sincronización
 * con Booking.com los gestiona un proveedor externo (Smoobu, Beds24, Lodgify…).
 * Aquí solo embebemos su widget o redirigimos con fechas.
 *
 * Variables de entorno (crear .env en la raíz del proyecto):
 *   PUBLIC_BOOKING_IFRAME_URL   → URL del iframe del channel manager
 *   PUBLIC_BOOKING_SCRIPT_URL     → URL del script del widget (si aplica)
 *   PUBLIC_BOOKING_COM_URL        → URL directa de vuestra ficha en Booking.com
 */
const env = import.meta.env;

export type BookingProvider = 'iframe' | 'script' | 'redirect' | 'contact';

function resolveProvider(): BookingProvider {
  if (env.PUBLIC_BOOKING_IFRAME_URL) return 'iframe';
  if (env.PUBLIC_BOOKING_SCRIPT_URL) return 'script';
  if (env.PUBLIC_BOOKING_COM_URL) return 'redirect';
  return 'contact';
}

export const booking = {
  provider: resolveProvider(),

  widget: {
    iframeUrl: env.PUBLIC_BOOKING_IFRAME_URL ?? '',
    scriptUrl: env.PUBLIC_BOOKING_SCRIPT_URL ?? '',
    iframeHeight: '900px',
    iframeTitle: 'Motor de reservas — Finca Los Collados de San Miguel',
  },

  bookingCom: {
    enabled: true,
    /**
     * Ficha en Booking.com (confirmar con el cliente si cambia).
     * @see https://www.booking.com/hotel/es/finca-los-collados-de-san-miguel-villamanrique-ciudad-real.es.html
     */
    propertyUrl:
      env.PUBLIC_BOOKING_COM_URL ??
      'https://www.booking.com/hotel/es/finca-los-collados-de-san-miguel-villamanrique-ciudad-real.es.html',
    label: 'Reservar en Booking.com',
  },

  /** 8 bungalows publicados como habitaciones en Booking.com (máx. 16 adultos) */
  accommodation: {
    roomCount: 8,
    maxAdults: 16,
    maxAdultsPerRoom: 2,
  },

  whatsapp: {
    enabled: true,
    phone: contact.phone.replace('+', ''),
    defaultMessage:
      'Hola, me gustaría consultar disponibilidad en Finca Los Collados de San Miguel.',
  },

  sync: {
    title: 'Cómo gestionamos las reservas',
    paragraphs: [
      'Las reservas online se canalizan por Booking.com (con pago seguro en la plataforma) o por WhatsApp y teléfono para packs, eventos, empresas y consultas personalizadas.',
      'Antes de confirmar por WhatsApp una estancia con alojamiento, comprobamos siempre la disponibilidad en el calendario de Booking.com y bloqueamos las fechas manualmente en el extranet para evitar solapamientos.',
      'Para grupos, eventos o reservas de varios bungalows, WhatsApp suele ser la vía más ágil: os asesoramos y os indicamos el mejor modo de formalizar la reserva.',
    ],
  },

  page: {
    heroTitle: 'Reservas online',
    heroSubtitle:
      'Reserve en Booking.com con disponibilidad al instante, o escríbanos por WhatsApp para packs, eventos y estancias a medida.',
    heroEyebrow: 'Booking.com · WhatsApp · Teléfono',
  },
} as const;

export type BookingSearchParams = {
  checkIn: string;
  checkOut: string;
  adults: number;
};

export function buildBookingComUrl({ checkIn, checkOut, adults }: BookingSearchParams): string {
  const base = booking.bookingCom.propertyUrl;
  const url = new URL(base);

  if (checkIn) url.searchParams.set('checkin', checkIn);
  if (checkOut) url.searchParams.set('checkout', checkOut);
  if (adults > 0) {
    url.searchParams.set('group_adults', String(adults));
    const rooms = Math.min(
      booking.accommodation.roomCount,
      Math.ceil(adults / booking.accommodation.maxAdultsPerRoom),
    );
    url.searchParams.set('no_rooms', String(rooms));
  }

  return url.toString();
}

export function buildWhatsAppUrl({ checkIn, checkOut, adults }: Partial<BookingSearchParams>): string {
  const lines = [
    booking.whatsapp.defaultMessage,
    checkIn && checkOut ? `Entrada: ${checkIn}` : '',
    checkIn && checkOut ? `Salida: ${checkOut}` : '',
    adults ? `Adultos: ${adults}` : '',
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${booking.whatsapp.phone}?text=${text}`;
}

export function isWidgetConfigured(): boolean {
  return booking.provider === 'iframe' || booking.provider === 'script';
}
