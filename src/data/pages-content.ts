export type ContentBlock = {
  title: string;
  paragraphs: string[];
};

export type FeatureCard = {
  title: string;
  description: string;
};

export type PackCard = {
  slug: string;
  title: string;
  description: string;
  highlights: string[];
};

export const laFincaContent = {
  hero: {
    eyebrow: 'Campos de Montiel · Ciudad Real',
    title: 'La Finca',
    subtitle:
      'Más de 2.500 años de historia en un enclave rural único de Castilla-La Mancha, entre Villamanrique y el corazón manchego.',
  },
  blocks: [
    {
      title: 'Un crisol de culturas',
      paragraphs: [
        'Ubicada en la provincia de Ciudad Real, próxima al municipio de Villamanrique y situada en la comarca de Campos de Montiel, comarca natural e histórica de La Mancha.',
        'Un enclave único, cuya historia se remonta a más de 2.500 años a. C., en el que poder admirar sus ruinas prehistóricas, así como los numerosos vestigios de pueblos entre los que destacan los íberos, los romanos, los visigodos o los árabes.',
      ],
    },
    {
      title: 'Espacios y servicios',
      paragraphs: [
        'La Finca cuenta con alojamiento para un máximo de 16 adultos (8 bungalows), servicio de restauración, piscina al aire libre, salón biblioteca, chimenea, porche exterior y cocinas camperas.',
        'Un entorno privado y versátil: ideal para escapadas en pareja, estancias familiares, retiros de empresa, rodajes y pequeños eventos al aire libre.',
      ],
    },
  ] satisfies ContentBlock[],
  features: [
    { title: '8 bungalows', description: 'Estancias independientes con máximo confort y privacidad.' },
    { title: 'Piscina y jardines', description: 'Espacios exteriores para descansar y disfrutar del entorno.' },
    { title: 'Salón biblioteca', description: 'Zona acogedora con chimenea para reuniones íntimas o relax.' },
    { title: 'Pet friendly', description: 'Su mascota es bienvenida. Consulte condiciones al reservar.' },
    { title: 'La Calerilla', description: 'Coto de caza de perdiz roja en mano. Temporada de octubre a febrero.' },
  ] satisfies FeatureCard[],
  cta: {
    title: 'Descubra La Mancha desde Los Collados',
    text: 'Reserve su estancia o solicite información sobre disponibilidad y actividades.',
  },
} as const;

export const laCalerillaContent = {
  hero: {
    eyebrow: 'Caza · Campos de Montiel',
    title: 'La Calerilla',
    subtitle:
      'Zona cinegética de Los Collados de San Miguel: tradición de la perdiz roja en mano, en pleno corazón de La Mancha.',
  },
  intro:
    'La Calerilla es uno de los cotos de caza de la finca, junto a La Porrosa, en un entorno natural de Campos de Montiel donde la perdiz roja (Alectoris rufa) encuentra el hábitat ideal entre monte bajo, olivares y campos de cereal.',
  blocks: [
    {
      title: 'Tradición cinegética en La Mancha',
      paragraphs: [
        'Desde octubre hasta febrero disfrutamos de jornadas de caza en unos parajes perfectos para mantener la tradición de la perdiz en sus distintas modalidades, con especial dedicación a la caza en mano.',
        'Nuestras fincas La Calerilla y La Porrosa ofrecen el escenario idóneo para quienes buscan autenticidad, respeto por el entorno y la calidad de piezas que sorprenden por la majestuosidad y verticalidad de su vuelo.',
      ],
    },
    {
      title: 'Caza en mano y modalidades',
      paragraphs: [
        'La caza en mano permite recorrer el terreno con calma, acompañado de perros de muestra, en un ritmo propio del campo manchego. Una forma de entender la caza ligada al paisaje, a la compañía y al conocimiento del terreno.',
        'Si desea reservar un día de caza, le recomendamos contactar con la mayor antelación posible: las fechas de temporada son muy solicitadas. Podemos combinar la jornada con alojamiento en bungalows y con nuestra gastronomía tradicional.',
      ],
    },
    {
      title: 'Gastronomía, confort y naturaleza',
      paragraphs: [
        'Tras la jornada en el campo, la finca acoge al cazador con el confort de sus instalaciones: restauración con platos como la ensalada de perdiz en escabeche, migas manchegas y producto de la tierra.',
        'El entorno es rico en fauna y flora autóctona. Quien visita La Calerilla no solo vive la caza: descubre un paisaje vivo en el que conviven turismo rural, el mundo agrícola y la cultura cinegética de Castilla-La Mancha.',
      ],
    },
  ] satisfies ContentBlock[],
  features: [
    {
      title: 'Perdiz roja',
      description: 'Especie estrella de La Calerilla, con piezas de gran calidad y vuelo vertical.',
    },
    {
      title: 'Caza en mano',
      description: 'Modalidad tradicional al ritmo del campo, con respeto por el terreno y la fauna.',
    },
    {
      title: 'Temporada oct.–feb.',
      description: 'Jornadas de octubre a febrero. Reserve con antelación por alta demanda.',
    },
    {
      title: 'Alojamiento y mesa',
      description: 'Combine la cacería con bungalows, restauración manchega y entorno privado.',
    },
  ] satisfies FeatureCard[],
  season: {
    title: 'Información de temporada',
    items: [
      'Temporada habitual: de octubre a febrero',
      'Reserva de días de caza: contacte lo antes posible',
      'Posibilidad de combinar con alojamiento y restauración en la finca',
      'Gestión a través de Alectoris Ibérica SL',
    ],
  },
  cta: {
    title: 'Reserve su jornada de caza',
    text: 'Solicite disponibilidad para La Calerilla o consulte fechas, modalidades y combinación con alojamiento.',
    buttonLabel: 'Solicitar información',
  },
} as const;

export const alojamientoContent = {
  hero: {
    eyebrow: '8 bungalows · hasta 16 adultos',
    title: 'Alojamiento rural',
    subtitle:
      'Bungalows diseñados para el descanso y la privacidad en plena naturaleza manchega. Pet friendly.',
  },
  intro:
    'Bungalows especialmente diseñados con el fin de aportar mayor privacidad, asegurando su descanso y relajación. Disponemos de un total de 8 estancias, en las que destaca el especial cuidado por los detalles.',
  capacity: {
    title: 'Capacidad',
    items: [
      'Hasta 16 adultos en alojamiento (8 bungalows)',
      'Posibilidad de niños según configuración de la reserva',
      'Mascotas bienvenidas (pet friendly)',
      'Ideal para grupos pequeños, familias y empresas',
    ],
  },
  amenities: [
    'Cama de matrimonio (extragrande)',
    'Carta de almohadas (bajo disponibilidad)',
    'Smart TV',
    'Escritorio',
    'Wi-Fi gratuito',
    'Minibar',
    'Ducha efecto lluvia',
    'Amenities',
    'Aire acondicionado / Calefacción',
    'Porche exterior',
    'Teléfono',
    'Servicio de restauración (consulte referencias)',
  ],
  cta: {
    title: 'Reserve su bungalow',
    text: 'Compruebe disponibilidad y elija las fechas de su escapada rural en Campos de Montiel.',
  },
} as const;

export const gastronomiaContent = {
  hero: {
    eyebrow: 'Sabores de La Mancha',
    title: 'Gastronomía',
    subtitle:
      'Restauración basada en la tradición y los productos de nuestra tierra. Una experiencia sensorial en entorno rural.',
  },
  lead: 'Apostamos por una restauración basada en la tradición y en los productos de nuestra tierra.',
  subtitle: 'Una experiencia sensorial única',
  description:
    'Degustar platos típicamente manchegos que conservan en su esencia el paso de los siglos y el sabor de la historia.',
  dishes:
    'Ensalada de perdiz en escabeche, migas, pisto, sopa de ajo, caldereta de cordero, conejo al ajillo, pan de calatrava...',
  quote:
    '«Qué de migas, qué de natas, qué de guirnaldas y qué de zarandajas pastoriles, que, puesto que no me granjeen fama de discreto, no dejarán de granjearme la de ingenioso!» (Don Quijote, Cap. LXVII. Parte II)',
  features: [
    { title: 'Producto local', description: 'Ingredientes de la tierra manchega y recetas de tradición.' },
    { title: 'Menús a medida', description: 'Opciones para grupos, eventos y packs gastronómicos.' },
    { title: 'Cocinas camperas', description: 'Espacios exteriores para disfrutar de la experiencia al aire libre.' },
  ] satisfies FeatureCard[],
  cta: {
    title: 'Saboree La Mancha en Los Collados',
    text: 'Incluya la experiencia gastronómica en su reserva o consulte menús para grupos y eventos.',
  },
} as const;

export const experienciasContent = {
  hero: {
    eyebrow: 'Rutas y actividades',
    title: 'Experiencias',
    subtitle:
      'Rutas a medida, naturaleza, deporte y cultura manchega. Diseñamos su plan según tiempo, grupo y preferencias.',
  },
  intro:
    'La riqueza cultural de la zona es consabida pero difícilmente se ha recopilado de forma que el visitante pueda exprimir al máximo cada uno de los rincones que esta maravillosa tierra ofrece.',
  detail:
    'Ponemos a su disposición la confección de una ruta a medida. Solo debe indicar sus preferencias, de qué tiempo dispone y cuántas personas participarán. Nuestro equipo le sugerirá su «ruta a medida».',
  note: 'Recomendamos incluir las actividades al efectuar la reserva, para evitar problemas de disponibilidad a su llegada.',
  cards: [
    { title: 'Campo de Montiel', description: 'Rutas a pie por el entorno natural de La Mancha.' },
    { title: 'La Mancha auténtica', description: 'Pueblos, paisajes y patrimonio de la comarca.' },
    { title: 'Experiencia gastronómica', description: 'Sabores manchegos en un entorno único.' },
    { title: 'Deporte y aventura', description: 'Golf, bicicleta, caballo, globo y más en los alrededores.' },
  ] satisfies FeatureCard[],
  activities: [
    'Paseo a caballo',
    'Rutas en bicicleta',
    'Aventura off-road',
    'Globo aerostático',
    'Golf',
    'Piscina y biblioteca',
  ],
  cta: {
    title: 'Diseñe su ruta a medida',
    text: 'Cuéntenos qué busca y le propondremos una experiencia adaptada a su grupo.',
  },
} as const;

export const empresasContent = {
  hero: {
    eyebrow: 'PYME · equipos · producción',
    title: 'Empresas y equipos',
    subtitle:
      'Teambuilding, retiros, rodajes, shootings y grabación de contenido en un entorno rural privado y versátil.',
  },
  intro:
    'Los Collados es el escenario ideal para empresas pequeñas y medianas que buscan un espacio diferente: lejos del ruido urbano, con privacidad, naturaleza y servicios para trabajar, crear y conectar en equipo.',
  blocks: [
    {
      title: 'Teambuilding y retiros',
      paragraphs: [
        'Espacios interiores y exteriores para dinámicas de grupo, reuniones informales y jornadas de integración.',
        'Capacidad para alojar hasta 16 adultos y organizar actividades complementarias en la finca y su entorno.',
      ],
    },
    {
      title: 'Rodajes, shootings y contenido',
      paragraphs: [
        'Entorno cinematográfico de La Mancha: llanuras, olivos, arquitectura rural y luz natural.',
        'Ideal para grabaciones, sesiones fotográficas, podcasts y producción audiovisual de marcas que buscan autenticidad.',
      ],
    },
  ] satisfies ContentBlock[],
  features: [
    { title: 'Privacidad', description: 'Finca aislada, perfecta para sesiones sin interrupciones.' },
    { title: 'Versatilidad', description: 'Interiores acogedores y amplios exteriores para cualquier formato.' },
    { title: 'Alojamiento incluido', description: 'Su equipo puede pernoctar en los bungalows tras la jornada.' },
    { title: 'Gastronomía', description: 'Menús para grupos y pausas catering durante la producción.' },
  ] satisfies FeatureCard[],
  cta: {
    title: 'Solicite un presupuesto a medida',
    text: 'Explíquenos su proyecto (equipo, fechas, tipo de actividad) y le enviaremos una propuesta personalizada.',
    buttonLabel: 'Contactar',
    buttonHref: '/contacto',
  },
} as const;

export const eventosContent = {
  hero: {
    eyebrow: 'Celebraciones íntimas',
    title: 'Eventos',
    subtitle:
      'Pequeños eventos en un entorno rural exclusivo. Sin bodas ni grandes banquetes: sí celebraciones con encanto y medida.',
  },
  intro:
    'Organizamos eventos pequeños y personalizados en Los Collados: cumpleaños, aniversarios, reuniones familiares, presentaciones o encuentros privados en un marco natural único.',
  capacity: {
    title: 'Capacidades',
    items: [
      'Alojamiento: hasta 16 adultos (+ niños según reserva)',
      'Evento al aire libre: hasta 50 personas',
      'Evento en interior: hasta 30 personas',
    ],
  },
  blocks: [
    {
      title: 'Qué ofrecemos',
      paragraphs: [
        'Espacios exteriores con porche, jardines y piscina para celebraciones al aire libre.',
        'Salón biblioteca y zonas interiores para encuentros más íntimos.',
        'Servicio de restauración y menús adaptados al tipo de evento.',
      ],
    },
    {
      title: 'Qué no hacemos',
      paragraphs: [
        'No celebramos bodas ni grandes banquetes nupciales.',
        'Nuestro enfoque son eventos pequeños y personalizados, con atención al detalle.',
      ],
    },
  ] satisfies ContentBlock[],
  cta: {
    title: 'Planifique su evento',
    text: 'Cuéntenos fechas, número de invitados y tipo de celebración. Le asesoraremos sin compromiso.',
    buttonLabel: 'Solicitar información',
    buttonHref: '/contacto',
  },
} as const;

export const packsContent = {
  hero: {
    eyebrow: 'Escapadas a medida',
    title: 'Packs y experiencias',
    subtitle:
      'Combinaciones pensadas para parejas, familias y grupos: romance, naturaleza, gastronomía y rutas por La Mancha.',
  },
  intro:
      'Descubra nuestras propuestas combinadas de alojamiento, gastronomía y actividades. Cada pack se puede adaptar a fechas, grupo y preferencias.',
  packs: [
    {
      slug: 'romantico',
      title: 'Pack romántico',
      description: 'Escapada en pareja con detalle, cena manchega y entorno privado para desconectar.',
      highlights: ['Alojamiento en bungalow', 'Cena tradicional', 'Ambiente íntimo y silencioso'],
    },
    {
      slug: 'familiar',
      title: 'Pack familiar',
      description: 'Estancia para familias con actividades en la finca y rutas sencillas por el entorno.',
      highlights: ['Pet friendly', 'Piscina y exteriores', 'Actividades para todas las edades'],
    },
    {
      slug: 'gastronomia',
      title: 'Pack gastronómico',
      description: 'Sabores auténticos de La Mancha: migas, guisos, producto local y experiencia sensorial.',
      highlights: ['Menú manchego', 'Producto de proximidad', 'Maridaje opcional'],
    },
    {
      slug: 'rutas',
      title: 'Pack rutas y naturaleza',
      description: 'Alojamiento + ruta a medida por Campos de Montiel y alrededores culturales.',
      highlights: ['Ruta personalizada', 'Naturaleza y patrimonio', 'Asesoramiento del equipo'],
    },
  ] satisfies PackCard[],
  cta: {
    title: '¿Le interesa algún pack?',
    text: 'Indíquelo en su reserva o contacte con nosotros para personalizar la experiencia.',
  },
} as const;

export const entornoContent = {
  hero: {
    eyebrow: 'Castilla-La Mancha',
    title: 'Entorno y territorio',
    subtitle:
      'Campos de Montiel, Villamanrique, patrimonio íbero y la Mancha más auténtica a pocos kilómetros de Torre de Juan Abad y Villanueva de los Infantes.',
  },
  intro:
    'Los Collados se sitúa en uno de los paisajes más representativos de La Mancha: llanuras, dehesas, pueblos con historia y un patrimonio cultural que se remonta a la antigüedad.',
  places: [
    {
      title: 'Campos de Montiel',
      description:
        'Comarca natural e histórica, escenario de leyenda y naturaleza. Ideal para rutas a pie, observación de aves y turismo rural.',
    },
    {
      title: 'Villamanrique',
      description:
        'Municipio más cercano a la finca. Punto de partida para descubrir la vida rural manchega y la gastronomía local.',
    },
    {
      title: 'Torre de Juan Abad y alrededores',
      description:
        'A pocos kilómetros, en la misma comarca. Referencia cultural y gastronómica de Castilla-La Mancha.',
    },
    {
      title: 'Villanueva de los Infantes',
      description:
        'Uno de los pueblos más emblemáticos de La Mancha, ligado a la literatura cervantina y al turismo cultural.',
    },
    {
      title: 'Patrimonio íbero y ruinas',
      description:
        'Vestigios de más de 2.500 años de historia en la zona: íberos, romanos, visigodos y árabes.',
    },
    {
      title: 'Lagunas y naturaleza',
      description:
        'La región ofrece espacios naturales, rutas ornitológicas y paisajes únicos para desconectar.',
    },
  ] satisfies FeatureCard[],
  cta: {
    title: 'Explore La Mancha desde Los Collados',
    text: 'Reserve su estancia y le ayudamos a diseñar rutas por el territorio.',
  },
} as const;

export const contactoContent = {
  hero: {
    eyebrow: 'Estamos aquí para ayudarle',
    title: 'Contacto',
    subtitle:
      'Reservas, packs, eventos, empresas o consultas generales. Responderemos lo antes posible.',
  },
} as const;

export const homeTeasers = [
  {
    title: 'La Finca',
    description: 'Historia, naturaleza y servicios en Campos de Montiel.',
    href: '/la-finca',
  },
  {
    title: 'La Calerilla',
    description: 'Caza de perdiz roja en mano en Campos de Montiel.',
    href: '/la-calerilla',
  },
  {
    title: 'Alojamiento',
    description: '8 bungalows, hasta 16 adultos. Pet friendly.',
    href: '/alojamiento',
  },
  {
    title: 'Gastronomía',
    description: 'Tradición manchega y producto de la tierra.',
    href: '/gastronomia',
  },
  {
    title: 'Experiencias',
    description: 'Rutas a medida, deporte y cultura local.',
    href: '/experiencias',
  },
  {
    title: 'Empresas',
    description: 'Teambuilding, rodajes y contenido para PYME.',
    href: '/empresas',
  },
  {
    title: 'Eventos',
    description: 'Celebraciones pequeñas hasta 50 personas al aire libre.',
    href: '/eventos',
  },
  {
    title: 'Packs',
    description: 'Romántico, familiar, gastronomía y rutas.',
    href: '/packs',
  },
  {
    title: 'Entorno',
    description: 'La Mancha, Villamanrique y patrimonio cercano.',
    href: '/entorno',
  },
] as const;

export const homePillars = [
  {
    title: 'Turismo rural',
    description: 'Escapadas auténticas en bungalows con encanto manchego.',
  },
  {
    title: 'Empresas',
    description: 'Teambuilding, rodajes y producción en entorno privado.',
  },
  {
    title: 'Eventos pequeños',
    description: 'Celebraciones íntimas al aire libre o en interior.',
  },
  {
    title: 'Pet friendly',
    description: 'Su mascota es bienvenida en la finca.',
  },
] as const;
