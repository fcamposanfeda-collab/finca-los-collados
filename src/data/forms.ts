import { contact } from './contact';
import { defaultLocale, localeMeta, localizePath, msg, type Locale } from '../i18n';

const env = import.meta.env;

export const forms = {
  web3formsAccessKey: env.PUBLIC_WEB3FORMS_ACCESS_KEY ?? '',
  recipientEmail: contact.email,
  endpoint: 'https://api.web3forms.com/submit',
} as const;

export const inquirySubjectIds = [
  'general',
  'alojamiento',
  'finca-espacios',
  'finca-completa',
  'finca-fin-semana',
  'sesiones-fotograficas',
  'evento',
  'empresa',
  'pack',
  'caza',
] as const;

export type InquirySubjectId = (typeof inquirySubjectIds)[number];

export function isEmailFormConfigured(): boolean {
  return Boolean(forms.web3formsAccessKey);
}

export function subjectLabel(id: string, locale: Locale = defaultLocale): string {
  const subjects = (msg(locale).forms as { subjects: Record<string, string> }).subjects;
  return subjects[id] ?? id;
}

export function spanishSubjectLabel(id: string): string {
  return subjectLabel(id, 'es');
}

export function inquiryOptions(locale: Locale) {
  const subjects = (msg(locale).forms as { subjects: Record<string, string> }).subjects;
  return inquirySubjectIds.map((value) => ({
    value,
    label: subjects[value],
  }));
}

export function buildMailtoUrl(
  fields: {
    name: string;
    email: string;
    subjectId: string;
    message: string;
    phone?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  },
  locale: Locale = defaultLocale,
): string {
  const labels = (msg('es').forms as { emailLabels: Record<string, string> }).emailLabels;
  const language = localeMeta[locale].languageField;

  const body = [
    `${labels.name}: ${fields.name}`,
    `${labels.email}: ${fields.email}`,
    fields.phone ? `${labels.phone}: ${fields.phone}` : '',
    fields.checkIn ? `${labels.checkIn}: ${fields.checkIn}` : '',
    fields.checkOut ? `${labels.checkOut}: ${fields.checkOut}` : '',
    fields.guests ? `${labels.guests}: ${fields.guests}` : '',
    `${labels.language}: ${language}`,
    '',
    fields.message,
  ]
    .filter((line, index, arr) => line !== '' || arr[index - 1] === '')
    .join('\n');

  const params = new URLSearchParams({
    subject: spanishSubjectLabel(fields.subjectId),
    body,
  });

  return `mailto:${forms.recipientEmail}?${params.toString()}`;
}

export function mailtoInquiryHref(locale: Locale): string {
  const subject = encodeURIComponent((msg(locale).common as { mailtoSubject: string }).mailtoSubject);
  return `mailto:${contact.email}?subject=${subject}`;
}

const subjectAliases: Record<string, InquirySubjectId> = {
  general: 'general',
  alojamiento: 'alojamiento',
  bungalows: 'alojamiento',
  accommodation: 'alojamiento',
  hebergement: 'alojamiento',
  'finca-espacios': 'finca-espacios',
  'finca-completa': 'finca-completa',
  finca: 'finca-completa',
  'finca-fin-semana': 'finca-fin-semana',
  'sesiones-fotograficas': 'sesiones-fotograficas',
  rodaje: 'sesiones-fotograficas',
  rodajes: 'sesiones-fotograficas',
  shooting: 'sesiones-fotograficas',
  shootings: 'sesiones-fotograficas',
  evento: 'evento',
  eventos: 'evento',
  events: 'evento',
  evenements: 'evento',
  empresa: 'empresa',
  empresas: 'empresa',
  corporate: 'empresa',
  teambuilding: 'empresa',
  pack: 'pack',
  packs: 'pack',
  packages: 'pack',
  formules: 'pack',
  caza: 'caza',
  chasse: 'caza',
  shootingday: 'caza',
};

export function resolveInquirySubject(value: string | null | undefined): InquirySubjectId | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  return subjectAliases[normalized];
}

export function contactFormUrl(locale: Locale, motivo?: string): string {
  const resolved = resolveInquirySubject(motivo);
  if (resolved === 'caza') {
    return `${localizePath('la-calerilla', locale)}#solicitud-caza`;
  }
  const path = localizePath('contacto', locale);
  if (!resolved) return path;
  return `${path}?motivo=${encodeURIComponent(resolved)}`;
}
