import { buildWhatsAppUrl } from './booking';
import { contact } from './contact';

export type VenuePackageId = 'finca-espacios' | 'finca-completa';

export type VenuePackage = {
  id: VenuePackageId;
  title: string;
  subtitle: string;
  description: string;
  includes: string[];
  capacity: string[];
  pricing: {
    from: number;
    unit: string;
    weekday?: string;
    weekend?: string;
    halfDay?: string;
  };
  idealFor: string[];
  inquirySubject: string;
};

/**
 * Precios orientativos (2026) calibrados frente a fincas rurales comparables
 * (Castilla-La Mancha / interior, no lujo urbano). Referencias: alquiler día
 * desde ~750 € en fincas similares (Venuu, fincas evento 20–50 pax).
 * Ajustar con el cliente antes de publicar tarifas definitivas.
 */
export const venuePackages: VenuePackage[] = [
  {
    id: 'finca-espacios',
    title: 'Finca completa — solo espacios',
    subtitle: 'Uso exclusivo sin alojamiento en bungalows',
    description:
      'Reserva la finca entera para su evento, jornada de empresa o rodaje: jardines, porche, piscina (según temporada), salón biblioteca, cocinas camperas y zonas exteriores. Ideal cuando sus invitados no pernoctan en Los Collados.',
    includes: [
      'Uso exclusivo de espacios interiores y exteriores',
      'Hasta 50 personas en exterior / 30 en interior',
      'Privacidad total de la finca durante la jornada',
      'Apoyo del equipo para logística básica',
    ],
    capacity: [
      'Evento exterior: hasta 50 personas',
      'Evento interior: hasta 30 personas',
      'Sin pernocta en bungalows',
    ],
    pricing: {
      from: 590,
      unit: '€ / jornada completa (L–J)',
      halfDay: 'Medio día (4 h) desde 390 €',
      weekday: 'Jornada completa L–J desde 590 €',
      weekend: 'Jornada completa viernes–domingo desde 790 €',
    },
    idealFor: [
      'Team building de un día',
      'Rodajes y shootings',
      'Presentaciones al aire libre',
      'Celebraciones sin pernocta',
    ],
    inquirySubject: 'Presupuesto: finca completa solo espacios',
  },
  {
    id: 'finca-completa',
    title: 'Finca completa — con alojamiento',
    subtitle: 'Uso exclusivo + 8 bungalows (16 adultos)',
    description:
      'La finca íntegramente reservada para su grupo: evento o retiro con pernocta en los 8 bungalows. Perfecto para retiros de empresa, celebraciones familiares con invitados que duermen en la finca o producciones de varios días.',
    includes: [
      '8 bungalows (hasta 16 adultos + niños según reserva)',
      'Uso exclusivo de toda la finca y espacios de evento',
      'Hasta 50 personas en exterior / 30 en interior para el evento',
      'Pet friendly bajo consulta',
    ],
    capacity: [
      'Alojamiento: hasta 16 adultos',
      'Evento exterior: hasta 50 personas',
      'Evento interior: hasta 30 personas',
    ],
    pricing: {
      from: 1490,
      unit: '€ / noche (L–J)',
      weekday: '1 noche entre semana desde 1.490 €',
      weekend: '1 noche en fin de semana desde 1.890 €',
      halfDay: 'Fin de semana 2 noches (vie–dom) desde 2.790 €',
    },
    idealFor: [
      'Retiros y convenciones pequeñas',
      'Eventos familiares con pernocta',
      'Rodajes de varios días',
      'Incentivos de empresa',
    ],
    inquirySubject: 'Presupuesto: finca completa con alojamiento',
  },
];

export const venuePricingNote =
  'Precios orientativos para 2026, sin IVA. Gastronomía, montaje, personal extra y temporada alta (Semana Santa, verano, puentes) pueden variar. Presupuesto cerrado tras consulta de fechas e invitados.';

export function getVenuePackage(id: VenuePackageId): VenuePackage | undefined {
  return venuePackages.find((pkg) => pkg.id === id);
}

export function buildVenueWhatsAppUrl(packageId: VenuePackageId): string {
  const pkg = getVenuePackage(packageId);
  if (!pkg) return buildWhatsAppUrl({});

  const message = [
    `Hola, me interesa solicitar presupuesto para: ${pkg.title}.`,
    `Referencia orientativa: desde ${pkg.pricing.from} ${pkg.pricing.unit}.`,
    'Fechas previstas:',
    'Número de invitados:',
  ].join('\n');

  const phone = contact.phone.replace('+', '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const inquirySubjects = [
  { value: 'general', label: 'Consulta general' },
  { value: 'alojamiento', label: 'Alojamiento / bungalows' },
  { value: 'finca-espacios', label: 'Finca completa — solo espacios' },
  { value: 'finca-completa', label: 'Finca completa — con alojamiento' },
  { value: 'evento', label: 'Evento privado' },
  { value: 'empresa', label: 'Empresa / teambuilding / rodaje' },
  { value: 'pack', label: 'Pack romántico, familiar o gastronómico' },
  { value: 'caza', label: 'Caza en La Calerilla' },
] as const;
