import { contact } from './contact';
import { site } from './site';
import { booking } from './booking';

/**
 * NAP canónico — usar exactamente este nombre y dirección en pie, contacto,
 * aviso legal, JSON-LD, Google Business Profile y directorios.
 */
export const business = {
  name: 'Finca Los Collados de San Miguel',
  streetAddress: 'Unnamed Road',
  postalCode: '13343',
  addressLocality: 'Villamanrique',
  addressRegion: 'Cdad. Real',
  addressCountry: 'ES',
  telephone: contact.phone,
  telephoneAlt: contact.phoneAlt,
  telephoneDisplay: '+34 608 543 681',
  telephoneAltDisplay: '+34 660 441 734',
  email: contact.email,
  numberOfRooms: 8,
  maxAdults: 16,
  petsAllowed: true,
  huntingOrganizer: 'Alectoris Ibérica SL',
  logoPath: '/images/logo-finca-los-collados.png',
  geo: {
    latitude: 38.521513,
    longitude: -3.057985,
  },
  checkinTime: null as string | null,
  checkoutTime: null as string | null,
  priceRange: null as string | null,
  tourismRegistry: null as string | null,
  bookingRating: {
    value: '9.7',
    count: '105',
    date: '2026-10-19',
    source: 'Booking.com vía ViaMichelin',
  },
  sameAs: [contact.facebook, contact.instagram, booking.bookingCom.propertyUrl, contact.mapsUrl],
} as const;

export const todosDato = [
  'TODO_DATO: hora de check-in y check-out',
  'TODO_DATO: priceRange (p. ej. €€) o tarifa orientativa de bungalow',
  'TODO_DATO: resumen de la política de cancelación (la de Booking.com o la propia)',
  'TODO_DATO: número de inscripción en el Registro de Turismo de Castilla-La Mancha, si es obligatorio mostrarlo',
  'TODO_DATO: suplemento o condiciones de mascotas (si existe)',
  'TODO_DATO: número de puestos / tiradores por jornada en La Calerilla',
  'TODO_DATO: si se admiten perros de caza en el coto y en los bungalows',
] as const;

export function formattedAddress(includeCountry = false): string {
  const line = contact.address;
  return includeCountry ? `${line}, ${business.addressCountry}` : line;
}

export function canonicalSiteUrl(): string {
  return site.url;
}
