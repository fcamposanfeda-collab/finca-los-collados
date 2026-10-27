import { business } from './business';
import { contact } from './contact';
import { site } from './site';
import { booking } from './booking';
import {
  hunting,
  huntingModalityOffers,
  huntingOffersByPage,
  isHuntingChild,
  isHuntingPage,
  visibleFaqItems,
} from './hunting';
import { images } from './images';
import { getHuntingHeroLoop, getHuntingJornada } from './media';
import { absoluteUrl, localeMeta, msg, pagePathname, type Locale, type PageKey } from '../i18n';
import { withBase } from '../utils/paths';

type JsonLd = Record<string, unknown>;

const lodgingId = `${site.url}/#lodging`;
const orgId = `${site.url}/#organization`;
const organizerId = `${site.url}/#organizer`;
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

/** Organizador de las jornadas de caza. Enlazado por @id; no duplica el LodgingBusiness. */
export function organizerJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizerId,
    name: business.huntingOrganizer,
    url: site.url,
    email: business.email,
    telephone: business.telephone,
    address: postalAddress(),
  };
}

export function breadcrumbJsonLd(locale: Locale, pageKey: PageKey, pageUrl: string): JsonLd | null {
  if (pageKey === 'home') return null;
  const nav = msg(locale).nav as Record<string, string>;
  const homeLabel = (msg(locale).conversion as { breadcrumbHome: string }).breadcrumbHome;
  const cazaLabel = nav.caza ?? nav['la-calerilla'] ?? pageKey;
  const items: JsonLd[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: homeLabel,
      item: absoluteUrl(pagePathname('home', locale)),
    },
  ];
  if (isHuntingChild(pageKey)) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: cazaLabel,
      item: absoluteUrl(pagePathname('la-calerilla', locale)),
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: nav[pageKey] ?? pageKey,
      item: pageUrl,
    });
  } else {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: pageKey === 'la-calerilla' ? cazaLabel : (nav[pageKey] ?? pageKey),
      item: pageUrl,
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function faqJsonLd(locale: Locale, pageKey: PageKey): JsonLd | null {
  const faq = msg(locale).faq as Record<string, unknown>;
  const items = visibleFaqItems(
    Array.isArray(faq[pageKey]) ? (faq[pageKey] as { q: string; a: string }[]) : [],
  );
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
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
  'caza-ojeo-perdiz': { type: 'Service', nameKey: 'caza-ojeo-perdiz' },
  'caza-en-mano': { type: 'Service', nameKey: 'caza-en-mano' },
  'caza-estancia': { type: 'Service', nameKey: 'caza-estancia' },
  'caza-como-llegar': { type: 'Service', nameKey: 'caza-como-llegar' },
  eventos: { type: 'Service', nameKey: 'eventos' },
  empresas: { type: 'Service', nameKey: 'empresas' },
  packs: { type: 'Offer', nameKey: 'packs' },
  'la-finca': { type: 'Service', nameKey: 'la-finca' },
};

function huntingOfferCatalog(locale: Locale, pageKey: PageKey): JsonLd | null {
  const ids = huntingOffersByPage[pageKey];
  if (!ids || ids.length === 0) return null;
  const modalities = (msg(locale)['la-calerilla'] as {
    modalitiesTitle?: string;
    modalities: { title: string; text: string }[];
  }).modalities;
  const catalogName =
    (msg(locale)['la-calerilla'] as { modalitiesTitle?: string }).modalitiesTitle ?? 'La Calerilla';

  const offers = ids.flatMap((id) => {
    const spec = huntingModalityOffers.find((item) => item.id === id);
    if (!spec) return [];
    const copy = modalities[huntingModalityOffers.indexOf(spec)];
    if (!copy) return [];
    const offer: JsonLd = {
      '@type': 'Offer',
      name: copy.title,
      description: copy.text,
      url: absoluteUrl(pagePathname(spec.pageKey, locale)),
      itemOffered: {
        '@type': 'Service',
        name: copy.title,
        provider: { '@id': organizerId },
      },
    };
    if (spec.season === 'general') {
      offer.availabilityStarts = hunting.general.start;
      offer.availabilityEnds = hunting.general.end;
    }
    return [offer];
  });

  if (offers.length === 0) return null;
  return {
    '@type': 'OfferCatalog',
    name: catalogName,
    itemListElement: offers,
  };
}

export function serviceJsonLd(locale: Locale, pageKey: PageKey, pageUrl: string): JsonLd | null {
  const spec = servicePages[pageKey];
  if (!spec) return null;
  const nav = msg(locale).nav as Record<string, string>;
  const seo = msg(locale).seo as Record<string, { description: string; serviceType?: string }>;
  const huntingPage = isHuntingPage(pageKey);
  const data: JsonLd = {
    '@context': 'https://schema.org',
    '@type': spec.type,
    name: nav[spec.nameKey] ?? spec.nameKey,
    description: seo[pageKey]?.description,
    url: pageUrl,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Villamanrique, Ciudad Real, Castilla-La Mancha, ES',
    },
    provider: { '@id': huntingPage ? organizerId : lodgingId },
  };
  if (huntingPage) {
    data['@id'] = `${pageUrl}#service`;
    if (seo[pageKey]?.serviceType) data.serviceType = seo[pageKey].serviceType;
    data.image = absoluteAsset(images.hero.laCalerilla);
    const catalog = huntingOfferCatalog(locale, pageKey);
    if (catalog) data.hasOfferCatalog = catalog;
  }
  return data;
}

export function touristTripJsonLd(locale: Locale, pageKey: PageKey, pageUrl: string): JsonLd | null {
  if (pageKey !== 'caza-estancia') return null;
  const page = msg(locale)['caza-estancia'] as { hero?: { title: string } };
  const hub = msg(locale)['la-calerilla'] as {
    experience?: { title: string; steps: string[] };
  };
  const seo = msg(locale).seo as Record<string, { description: string }>;
  const steps = hub.experience?.steps ?? [];
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${pageUrl}#trip`,
    name: page.hero?.title ?? hub.experience?.title,
    description: seo[pageKey]?.description,
    url: pageUrl,
    provider: { '@id': organizerId },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: steps.length,
      itemListElement: steps.map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
      })),
    },
  };
}

export function huntingVideoJsonLd(locale: Locale, pageKey: PageKey): JsonLd[] {
  const credit = (msg(locale).conversion as { videoCredit: string }).videoCredit;
  const items: JsonLd[] = [];

  if (pageKey === 'la-calerilla') {
    const loopCopy = (msg(locale)['la-calerilla'] as {
      jornada?: { loopName: string; loopDescription: string };
    }).jornada;
    const loop = getHuntingHeroLoop();
    if (loopCopy && loop.desktop) {
      items.push({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: loopCopy.loopName,
        description: loopCopy.loopDescription,
        thumbnailUrl: absoluteAsset(images.hero.laCalerillaLoop),
        uploadDate: hunting.videoPublished,
        duration: hunting.loopDuration,
        contentUrl: absoluteAsset(loop.desktop),
        inLanguage: localeMeta[locale].bcp47,
        creditText: credit,
      });
    }
  }

  if (pageKey === 'caza-ojeo-perdiz') {
    const longCopy = (msg(locale)['caza-ojeo-perdiz'] as {
      jornada?: { videoName: string; videoDescription: string };
    }).jornada;
    const longform = getHuntingJornada();
    if (longCopy && longform.src) {
      items.push({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: longCopy.videoName,
        description: longCopy.videoDescription,
        thumbnailUrl: absoluteAsset(images.laCalerilla.jornadaPoster),
        uploadDate: hunting.videoPublished,
        duration: hunting.jornadaDuration,
        contentUrl: absoluteAsset(longform.src),
        inLanguage: localeMeta[locale].bcp47,
        creditText: credit,
      });
    }
  }

  return items;
}

export function jsonLdGraph(locale: Locale, pageKey: PageKey, pageUrl: string, isHome: boolean) {
  const graph: JsonLd[] = [lodgingBusinessJsonLd(locale, isHome ? site.url : pageUrl)];
  if (isHome) {
    graph.push(websiteJsonLd(locale), organizationJsonLd());
  }
  if (isHuntingPage(pageKey)) {
    graph.push(organizerJsonLd());
  }
  const crumbs = breadcrumbJsonLd(locale, pageKey, pageUrl);
  if (crumbs) graph.push(crumbs);
  const faq = faqJsonLd(locale, pageKey);
  if (faq) graph.push(faq);
  const service = serviceJsonLd(locale, pageKey, pageUrl);
  if (service) graph.push(service);
  const trip = touristTripJsonLd(locale, pageKey, pageUrl);
  if (trip) graph.push(trip);
  graph.push(...huntingVideoJsonLd(locale, pageKey));
  return graph;
}
