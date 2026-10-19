import { buildWhatsAppUrl } from './booking';
import { contact } from './contact';
import { defaultLocale, msg, type Locale } from '../i18n';

export type VenuePackageId =
  | 'finca-espacios'
  | 'finca-completa'
  | 'finca-fin-semana'
  | 'sesiones-fotograficas';

export const venuePackageIds: VenuePackageId[] = [
  'finca-espacios',
  'finca-completa',
  'finca-fin-semana',
  'sesiones-fotograficas',
];

export type VenuePackageCopy = {
  title: string;
  subtitle: string;
  description: string;
  includes: string[];
  capacity: string[];
  pricing: {
    unit?: string;
    priceNote?: string;
    weekday?: string;
    weekend?: string;
    halfDay?: string;
  };
  idealFor: string[];
  inquirySubject: string;
};

export type VenuePackage = VenuePackageCopy & { id: VenuePackageId };

export function getVenuePackages(locale: Locale = defaultLocale): VenuePackage[] {
  const packages = (msg(locale).venue as { packages: Record<VenuePackageId, VenuePackageCopy> }).packages;
  return venuePackageIds.map((id) => ({ id, ...packages[id] }));
}

export function getVenuePackage(id: VenuePackageId, locale: Locale = defaultLocale): VenuePackage | undefined {
  return getVenuePackages(locale).find((pkg) => pkg.id === id);
}

export function venuePricingNote(locale: Locale = defaultLocale): string {
  return (msg(locale).venue as { pricingNote: string }).pricingNote;
}

export function buildVenueWhatsAppUrl(packageId: VenuePackageId, locale: Locale = defaultLocale): string {
  const pkg = getVenuePackage(packageId, locale);
  if (!pkg) return buildWhatsAppUrl({}, locale);

  const copy = msg(locale).venue as {
    whatsapp: { intro: string; price: string; dates: string; guests: string };
  };

  const message = [
    copy.whatsapp.intro.replace('{title}', pkg.title),
    copy.whatsapp.price,
    copy.whatsapp.dates,
    copy.whatsapp.guests,
  ].join('\n');

  const phone = contact.phone.replace('+', '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
