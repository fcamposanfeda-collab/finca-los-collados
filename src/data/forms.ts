import { contact } from './contact';

const env = import.meta.env;

export const forms = {
  web3formsAccessKey: env.PUBLIC_WEB3FORMS_ACCESS_KEY ?? '',
  recipientEmail: contact.email,
  /** Gratuito hasta 250 envíos/mes: https://web3forms.com */
  endpoint: 'https://api.web3forms.com/submit',
} as const;

export function isEmailFormConfigured(): boolean {
  return Boolean(forms.web3formsAccessKey);
}

export function buildMailtoUrl(fields: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}): string {
  const body = [
    `Nombre: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.phone ? `Teléfono: ${fields.phone}` : '',
    fields.checkIn ? `Entrada: ${fields.checkIn}` : '',
    fields.checkOut ? `Salida: ${fields.checkOut}` : '',
    fields.guests ? `Invitados/adultos: ${fields.guests}` : '',
    '',
    fields.message,
  ]
    .filter(Boolean)
    .join('\n');

  const params = new URLSearchParams({
    subject: fields.subject,
    body,
  });

  return `mailto:${forms.recipientEmail}?${params.toString()}`;
}
