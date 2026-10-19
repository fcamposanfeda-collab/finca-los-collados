import { contact } from './contact';
import { defaultLocale, localeMeta, msg, t, type Locale } from '../i18n';

const env = import.meta.env;

export type BookingProvider = 'iframe' | 'script' | 'redirect' | 'contact';

function resolveProvider(): BookingProvider {
  if (env.PUBLIC_BOOKING_IFRAME_URL) return 'iframe';
  if (env.PUBLIC_BOOKING_SCRIPT_URL) return 'script';
  if (env.PUBLIC_BOOKING_COM_URL) return 'redirect';
  return 'contact';
}

const DEFAULT_BOOKING_URL =
  'https://www.booking.com/hotel/es/finca-los-collados-de-san-miguel-villamanrique-ciudad-real.html';

export const booking = {
  provider: resolveProvider(),

  widget: {
    iframeUrl: env.PUBLIC_BOOKING_IFRAME_URL ?? '',
    scriptUrl: env.PUBLIC_BOOKING_SCRIPT_URL ?? '',
    iframeHeight: '900px',
  },

  bookingCom: {
    enabled: true,
    propertyUrl: env.PUBLIC_BOOKING_COM_URL ?? DEFAULT_BOOKING_URL,
  },

  accommodation: {
    roomCount: 8,
    maxAdults: 16,
    maxAdultsPerRoom: 2,
  },

  whatsapp: {
    enabled: true,
    phone: contact.phone.replace('+', ''),
  },
} as const;

export type BookingSearchParams = {
  checkIn: string;
  checkOut: string;
  adults: number;
};

function bookingComBaseUrl(): URL {
  const url = new URL(booking.bookingCom.propertyUrl);
  url.pathname = url.pathname.replace(/\.(es|en-gb|en|fr)\.html$/i, '.html');
  return url;
}

export function buildBookingComUrl(
  { checkIn, checkOut, adults }: BookingSearchParams,
  locale: Locale = defaultLocale,
): string {
  const url = bookingComBaseUrl();
  url.searchParams.set('lang', localeMeta[locale].bookingLang);

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

export function bookingComPropertyUrl(locale: Locale = defaultLocale): string {
  const url = bookingComBaseUrl();
  url.searchParams.set('lang', localeMeta[locale].bookingLang);
  return url.toString();
}

export function buildWhatsAppUrl(
  { checkIn, checkOut, adults }: Partial<BookingSearchParams>,
  locale: Locale = defaultLocale,
): string {
  const copy = msg(locale).booking as {
    whatsappDefault: string;
    whatsappCheckIn: string;
    whatsappCheckOut: string;
    whatsappAdults: string;
  };

  const lines = [
    copy.whatsappDefault,
    checkIn && checkOut ? t(locale, 'booking.whatsappCheckIn', { date: checkIn }) : '',
    checkIn && checkOut ? t(locale, 'booking.whatsappCheckOut', { date: checkOut }) : '',
    adults ? t(locale, 'booking.whatsappAdults', { count: adults }) : '',
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${booking.whatsapp.phone}?text=${text}`;
}

export function isWidgetConfigured(): boolean {
  return booking.provider === 'iframe' || booking.provider === 'script';
}
