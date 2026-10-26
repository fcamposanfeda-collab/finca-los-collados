# Traducciones a revisar

Lista para revisión humana antes de publicar EN/FR. No publicar en producción hasta OK.

## Pendiente de texto original (no inventar)

- **Legales** (`aviso-legal`, `politica-de-privacidad`, `politica-de-cookies`, `politica-de-reservas`).
  - El español sigue siendo el placeholder de WordPress.
  - EN/FR traducen solo ese placeholder y añaden un aviso: la versión española prevalece.
  - Cuando lleguen los textos, sustituir el contenido real en `src/i18n/messages/es/legal.json` y traducir EN/FR. No hay texto legal definitivo aún.

## Términos de glosario (dejar sin traducir)

- Finca Los Collados de San Miguel, Los Collados
- La Calerilla
- Azurea / Azurea Catering
- Villamanrique, Campos de Montiel, Villanueva de los Infantes, Torre de Juan Abad, Montizón, Ciudad Real
- La Mancha (no «the Manche» / no «la Manche»)
- Castilla-La Mancha → EN igual; FR **Castille-La Manche**

## Caza (La Calerilla)

- ES: «caza en mano», «ojeo», «coto», «perdiz roja»
- EN: *walked-up shooting*, *driven shooting* (ojeo), *estate/ground*, *red-legged partridge*
- FR: *chasse devant soi*, *ojeo* (se deja el término cuando aporta), *coto*, *perdrix rouge*
- EN: *walked-up shooting* para caza en mano; *driven shooting* para ojeo.

## Gastronomía

- Nombres de platos se mantienen cuando son propios: *migas*, *pisto*, *caldereta*, *pan de calatrava*, *escabeche*, *ajillo*, *torrija*.
- Cita del Quijote: el texto original queda en español; solo se traduce la atribución (Don Quixote / Don Quichotte).

## Tono

- ES: tratamiento de usted («le», «su»).
- EN: British English (*organise* / *colour* donde aplique; *enquiry*).
- FR: vouvoiement y espacios estrechos ante `; : ? !` y comillas « ».

## Imágenes

- `images.entorno` y teasers/pillars van por **id estable**, no por el título visible.
- Alts de galería y platos viven en `messages/{locale}/images.json`.

## Fuera de alcance (a propósito)

- Sin date picker propio
- Sin redirección automática por idioma del navegador o IP
- Sin banner de cookies nuevo
- Sin JSON-LD extra por idioma más allá de `inLanguage` / `url`
- Booking.com: `lang=` está cableado; la ficha remota devolvió 403 al comprobarla por HTTP, así que conviene abrir a mano `/en/book-online` y `/fr/reserver-en-ligne` y confirmar el idioma de Booking.

## QA Fase 6 (19/10/2026)

- `npm run check:i18n`: 22 namespaces × 3 locales, claves alineadas.
- Build: 54 páginas (ES + EN + FR, incluidas `/en/request-sent` y `/fr/demande-envoyee`).
- `html lang`: `es` / `en-GB` / `fr`. Canonical y hreflang (x-default → ES) en HTML y sitemap.
- Booking.com: URL neutra + `lang=en-gb` / `lang=fr`. WhatsApp y mailto con asunto/mensaje del idioma de la página.
- Formulario: `value` estables (`general`, `alojamiento`…), campo oculto `idioma`, sin nota de Web3Forms en el build de producción. Fechas nativas.
- Fotos de entorno: ids estables; las imágenes siguen resolviendo en `/en/surroundings`.
- Cabecera FR: cabe en una línea a 1024px y 1440px (nowrap, sin overflow). En móvil, menú hamburguesa. Botones hero «Réserver» / «Découvrir le domaine» sin partirse.
- Booking.com no se abrió en vivo (la ficha puede devolver 403 por automatización); conviene comprobar a mano el idioma de la ficha.
