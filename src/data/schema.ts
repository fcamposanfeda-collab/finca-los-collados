import { business } from './business';
import { contact } from './contact';
import { site } from './site';
import { booking } from './booking';
import { hunting } from './hunting';
import { images } from './images';
import { getHuntingHeroLoop, getHuntingJornada } from './media';
import { absoluteUrl, localeMeta, msg, pagePathname, type Locale, type PageKey } from '../i18n';
import { withBase } from '../utils/paths';

type JsonLd = Record<string, unknown>;

const lodgingId = `${site.url}/#lodging`;
const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

function absoluteAsset(path: string): string {
  if (path.startsWith('http')) return path;
  return new URL(withBase(path), `${site.url}/`).href;
}

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: business.streetAddress,
    addressLocality: business.addressLocality,
    addressRegion: business.addressRegion,
    postalCode: business.postalCode,
    addressCountry: business.addressCountry,
  };
}

export function lodgingBusinessJsonLd(locale: Locale, pageUrl: string): JsonLd {
  const tagline = (msg(locale).common as { tagline: string }).tagline;
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': lodgingId,
    name: business.name,
    url: site.url,
    description: tagline,
    inLanguage: localeMeta[locale].bcp47,
    image: [
      absoluteAsset(images.hero.home),
      absoluteAsset(images.hero.alojamiento),
      absoluteAsset(images.og),
    ],
    logo: absoluteAsset(business.logoPath),
    email: business.email,
    telephone: business.telephone,
    address: postalAddress(),
    hasMap: contact.mapsUrl,
    petsAllowed: business.petsAllowed,
    numberOfRooms: business.numberOfRooms,
    sameAs: [...business.sameAs],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Swimming pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Breakfast', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pets allowed', value: true },
    ],
    containsPlace: {
      '@type': 'Accommodation',
      name: 'Bungalows',
      numberOfRooms: business.numberOfRooms,
      occupancy: {
        '@type': 'QuantitativeValue',
        maxValue: business.maxAdults,
      },
    },
  };

  data.geo = {
    '@type': 'GeoCoordinates',
    latitude: business.geo.latitude,
    longitude: business.geo.longitude,
  };
  if (business.checkinTime) data.checkinTime = business.checkinTime;
  if (business.checkoutTime) data.checkoutTime = business.checkoutTime;
  if (business.priceRange) data.priceRange = business.priceRange;

  if (pageUrl !== site.url) {
    data.url = pageUrl;
  }

  return data;
}

export function websiteJsonLd(locale: Locale): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: business.name,
    url: site.url,
    inLanguage: localeMeta[locale].bcp47,
    publisher: { '@id': orgId },
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: business.name,
    url: site.url,
    logo: absoluteAsset(business.logoPath),
    email: business.email,
    telephone: business.telephone,
    address: postalAddress(),
    sameAs: [contact.facebook, contact.instagram, booking.bookingCom.propertyUrl],
  };
}

export function breadcrumbJsonLd(locale: Locale, pageKey: PageKey, pageUrl: string): JsonLd | null {
  if (pageKey === 'home') return null;
  const nav = msg(locale).nav as Record<string, string>;
  const homeLabel = (msg(locale).conversion as { breadcrumbHome: string }).breadcrumbHome;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: absoluteUrl(pagePathname('home', locale)),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: nav[pageKey] ?? pageKey,
        item: pageUrl,
      },
    ],
  };
}

export function faqJsonLd(locale: Locale, pageKey: PageKey): JsonLd | null {
  const faq = msg(locale).faq as Record<string, unknown>;
  const items = faq[pageKey];
  if (!Array.isArray(items) || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (items as { q: string; a: string }[]).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

const servicePages: Partial<Record<PageKey, { type: string; nameKey: string }>> = {
  'la-calerilla': { type: 'Service', nameKey: 'la-calerilla' },
  eventos: { type: 'Service', nameKey: 'eventos' },
  empresas: { type: 'Service', nameKey: 'empresas' },
  packs: { type: 'Offer', nameKey: 'packs' },
  'la-finca': { type: 'Service', nameKey: 'la-finca' },
};

export function serviceJsonLd(locale: Locale, pageKey: PageKey, pageUrl: string): JsonLd | null {
  const spec = servicePages[pageKey];
  if (!spec) return null;
  const nav = msg(locale).nav as Record<string, string>;
  const seo = msg(locale).seo as Record<string, { description: string }>;
  return {
    '@context': 'https://schema.org',
    '@type': spec.type,
    name: nav[spec.nameKey] ?? spec.nameKey,
    description: seo[pageKey]?.description,
    url: pageUrl,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Villamanrique, Ciudad Real, Castilla-La Mancha, ES',
    },
    provider: { '@id': lodgingId },
  };
}

export function huntingVideoJsonLd(locale: Locale, pageKey: PageKey): JsonLd[] {
  if (pageKey !== 'la-calerilla') return [];
  const jornada = (msg(locale)['la-calerilla'] as {
    jornada?: {
      loopName: string;
      loopDescription: string;
      videoName: string;
      videoDescription: string;
    };
  }).jornada;
  if (!jornada) return [];

  const items: JsonLd[] = [];
  const loop = getHuntingHeroLoop();
  const longform = getHuntingJornada();
  const credit = (msg(locale).conversion as { videoCredit: string }).videoCredit;

  if (loop.desktop) {
    items.push({
      '@type': 'VideoObject',
      name: jornada.loopName,
      description: jornada.loopDescription,
      thumbnailUrl: absoluteAsset(images.hero.laCalerillaLoop),
      uploadDate: hunting.videoPublished,
      duration: hunting.loopDuration,
      contentUrl: absoluteAsset(loop.desktop),
      inLanguage: localeMeta[locale].bcp47,
      creditText: credit,
    });
  }

  if (longform.src) {
    items.push({
      '@type': 'VideoObject',
      name: jornada.videoName,
      description: jornada.videoDescription,
      thumbnailUrl: absoluteAsset(images.laCalerilla.jornadaPoster),
      uploadDate: hunting.videoPublished,
      duration: hunting.jornadaDuration,
      contentUrl: absoluteAsset(longform.src),
      inLanguage: localeMeta[locale].bcp47,
      creditText: credit,
    });
  }

  return items;
}

export function jsonLdGraph(locale: Locale, pageKey: PageKey, pageUrl: string, isHome: boolean) {
  const graph: JsonLd[] = [lodgingBusinessJsonLd(locale, isHome ? site.url : pageUrl)];
  if (isHome) {
    graph.push(websiteJsonLd(locale), organizationJsonLd());
  }
  const crumbs = breadcrumbJsonLd(locale, pageKey, pageUrl);
  if (crumbs) graph.push(crumbs);
  const faq = faqJsonLd(locale, pageKey);
  if (faq) graph.push(faq);
  const service = serviceJsonLd(locale, pageKey, pageUrl);
  if (service) graph.push(service);
  graph.push(...huntingVideoJsonLd(locale, pageKey));
  return graph;
}
