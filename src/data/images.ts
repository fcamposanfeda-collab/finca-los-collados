/**
 * Catálogo de imágenes del sitio.
 * Origen principal: web actual loscolladosdesanmiguel.com (WordPress).
 * Sustituir por fotos propias de alta resolución cuando estén disponibles.
 */
import { withBase } from '../utils/paths';

const imagesRaw = {
  brand: {
    logo: '/images/logo-finca-los-collados.png',
    header: '/images/logo-cabecera.png',
    emblem: '/images/logo-emblem.png',
  },

  hero: {
    home: '/images/hero-entrada-atardecer.png',
    laFinca: '/images/hero-casa-panorama.png',
    laCalerilla: '/images/calerilla-hero.jpg',
    alojamiento: '/images/bungalow-interior.jpg',
    gastronomia: '/images/gastronomia.jpg',
    experiencias: '/images/campo-montiel.png',
    empresas: '/images/empresa-teambuilding.jpg',
    eventos: '/images/evento-celebracion.jpg',
    packs: '/images/evento-jardines.jpg',
    entorno: '/images/entorno-hero.jpg',
    contacto: '/images/porche-exterior.jpg',
    reservas: '/images/bungalow-detalle.jpg',
  },

  laCalerilla: {
    hero: '/images/calerilla-hero.jpg',
    campo: '/images/calerilla-temporada.jpg',
    perdiz: '/images/calerilla-perdiz.png',
    gastronomia: '/images/gastronomia.jpg',
  },

  laFinca: {
    culturas: '/images/finca-paisaje.jpg',
    espacios: '/images/evento-jardines.jpg',
    bungalows: '/images/bungalow-interior.jpg',
    piscina: '/images/evento-jardines.jpg',
    gallery: [
      { src: '/images/evento-jardines.jpg', alt: 'Jardines y exteriores de la finca' },
      { src: '/images/porche-exterior.jpg', alt: 'Porche exterior de Los Collados' },
      { src: '/images/salon-biblioteca.jpg', alt: 'Salón biblioteca con chimenea' },
      { src: '/images/hero-finca.jpg', alt: 'Entrada principal de la finca' },
      { src: '/images/finca-paisaje.jpg', alt: 'Paisaje y entorno de Campos de Montiel' },
      { src: '/images/IMG_0031.JPG', alt: 'Vista de la finca y sus edificaciones' },
      { src: '/images/IMG_0035.JPG', alt: 'Salón con vistas al olivar' },
    ],
  },

  empresas: {
    teambuilding: '/images/empresa-teambuilding.jpg',
    rodajes: '/images/rodaje-finca.jpg',
  },

  venue: {
    espacios: '/images/evento-jardines.jpg',
    completa: '/images/bungalow-detalle.jpg',
    finSemana: '/images/venue-fin-semana-porche.png',
    sesiones: '/images/empresas-rodaje-sesion.png',
  },

  eventos: {
    exterior: '/images/eventos-exterior-atardecer.png',
    // azureacatering.com — galería Azurea Catering
    azurea: '/images/azurea-catering-1.jpg',
    celebracion: '/images/azurea-catering-2.jpg',
  },

  experiencias: {
    montiel: '/images/campo-montiel.png',
    mancha: '/images/villanueva-infantes.jpg',
    gastronomia: '/images/gastronomia.jpg',
    deporte: '/images/bicicleta.jpg',
  },

  entorno: {
    'Campos de Montiel': '/images/campo-montiel.png',
    // CC BY-SA 4.0 — 19Tarrestnom65 / Wikimedia Commons (Iglesia de San Andrés, Villamanrique)
    Villamanrique: '/images/villamanrique-iglesia.jpg',
    'Torre de Juan Abad y alrededores': '/images/torre-juan-abad.jpg',
    'Villanueva de los Infantes': '/images/villanueva-infantes.jpg',
    // CC BY 2.0 — Miguel Angel Masegosa Martínez / Wikimedia Commons (Castillo de Montizón, Villamanrique)
    'Patrimonio íbero y ruinas': '/images/castillo-montizon.jpg',
    'Lagunas y naturaleza': '/images/lagunas-ruidera2.jpg',
  },

  packs: {
    romantico: '/images/salon-biblioteca.jpg',
    // PD — NPS / Wikimedia Commons (familia en ruta por pradera abierta)
    familiar: '/images/pack-familiar.jpg',
    gastronomia: '/images/gastronomia.jpg',
    rutas: '/images/castillo-montizon.jpg',
    caza: '/images/calerilla-hero.jpg',
    quijote: '/images/villanueva-infantes.jpg',
    celebracion: '/images/evento-celebracion.jpg',
    retiro: '/images/evento-jardines.jpg',
  },

  teasers: {
    '/la-finca': '/images/bungalow-interior.jpg',
    '/la-calerilla': '/images/calerilla-hero.jpg',
    '/alojamiento': '/images/finca-bungalow-exterior.png',
    '/gastronomia': '/images/gastronomia-tabla-quesos.png',
    '/experiencias': '/images/bicicleta.jpg',
    '/empresas': '/images/empresas-teambuilding-campo.png',
    '/eventos': '/images/eventos-celebracion-campo.png',
    '/packs': '/images/evento-jardines.jpg',
    '/entorno': '/images/campo-montiel.png',
  },

  pillars: {
    turismo: '/images/bungalow-exterior.png',
    empresas: '/images/empresas-rodaje.png',
    eventos: '/images/evento-terraza-atardecer.png',
    petFriendly: '/images/pet-friendly.jpg',
  },

  gastronomiaMoments: {
    mesaDetalle: '/images/gastronomia-mesa-detalle.png',
    postre: '/images/gastronomia-postre.png',
    platos: [
      { src: '/images/gastronomia-plato-01.webp', alt: 'Alcachofas con jamón y queso gratinado' },
      { src: '/images/gastronomia-plato-02.webp', alt: 'Carne estofada con puré de patata' },
      { src: '/images/gastronomia-plato-03.webp', alt: 'Pimientos del piquillo rellenos' },
      { src: '/images/gastronomia-plato-04.webp', alt: 'Ensalada con confit y queso de cabra' },
      { src: '/images/gastronomia-plato-05.webp', alt: 'Torrija con helado y sello de la finca', objectPosition: 'center 55%' },
      { src: '/images/gastronomia-plato-06.webp', alt: 'Flan casero con nata montada' },
      { src: '/images/gastronomia-plato-07.webp', alt: 'Ensalada de tomate, mango y codorniz' },
      { src: '/images/gastronomia-plato-08.webp', alt: 'Revuelto de espárragos trigueros' },
      { src: '/images/gastronomia-plato-09.webp', alt: 'Postre de hojaldre con sello de la finca', objectPosition: '62% 40%' },
      { src: '/images/gastronomia-plato-10.webp', alt: 'Postre de autor con crema y aceite aromatizado' },
    ],
  },

  videos: {
    bungalowInterior: '/videos/IMG_0728.mp4',
    bungalowAmenities: '/videos/IMG_0736.mp4',
    bungalowClosing: '/videos/WhatsApp Video 2026-07-08 at 11.36.47.mp4',
    empresasShowcase: '/videos/IMG_0717.mp4',
    fincaShowcase: '/videos/IMG_0658.mp4',
    laFincaCulturas: '/videos/la-finca-culturas.mp4',
    gastronomiaMomentos: '/videos/WhatsApp Video 2026-07-07 at 13.35.28.mp4',
  },

  og: '/images/hero-finca.jpg',
} as const;

function withBaseDeep<T>(value: T): T {
  if (typeof value === 'string') {
    return withBase(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => withBaseDeep(item)) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, withBaseDeep(nested)]),
    ) as T;
  }
  return value;
}

export const images = withBaseDeep(imagesRaw);

export type ImagePath = string;
