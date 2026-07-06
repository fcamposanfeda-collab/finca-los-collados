/**
 * Catálogo de imágenes del sitio.
 * Origen principal: web actual loscolladosdesanmiguel.com (WordPress).
 * Sustituir por fotos propias de alta resolución cuando estén disponibles.
 */
export const images = {
  hero: {
    home: '/images/hero-finca.jpg',
    laFinca: '/images/finca-paisaje.jpg',
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
    piscina: '/images/piscina-jardines.jpg',
  },

  empresas: {
    teambuilding: '/images/empresa-teambuilding.jpg',
    rodajes: '/images/rodaje-finca.jpg',
  },

  venue: {
    espacios: '/images/evento-jardines.jpg',
    completa: '/images/bungalow-detalle.jpg',
  },

  experiencias: {
    montiel: '/images/campo-montiel.png',
    mancha: '/images/rutas-villamanrique.png',
    gastronomia: '/images/gastronomia.jpg',
    deporte: '/images/golf.jpg',
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
    '/la-finca': '/images/finca-paisaje.jpg',
    '/la-calerilla': '/images/calerilla-hero.jpg',
    '/alojamiento': '/images/bungalow-interior.jpg',
    '/gastronomia': '/images/gastronomia.jpg',
    '/experiencias': '/images/bicicleta.jpg',
    '/empresas': '/images/empresa-teambuilding.jpg',
    '/eventos': '/images/evento-celebracion.jpg',
    '/packs': '/images/evento-jardines.jpg',
    '/entorno': '/images/campo-montiel.png',
  },

  pillars: {
    turismo: '/images/bungalow-interior.jpg',
    empresas: '/images/empresa-teambuilding.jpg',
    eventos: '/images/evento-celebracion.jpg',
    petFriendly: '/images/pet-friendly.png',
  },

  videos: {
    bungalowInterior: '/videos/IMG_0728.mp4',
    bungalowAmenities: '/videos/IMG_0736.mp4',
    bungalowClosing: '/videos/IMG_0723.mp4',
    empresasShowcase: '/videos/IMG_0717.mp4',
    fincaShowcase: '/videos/IMG_0658.mp4',
  },

  og: '/images/hero-finca.jpg',
} as const;

export type ImagePath = (typeof images)[keyof typeof images] extends string
  ? (typeof images)[keyof typeof images]
  : string;
