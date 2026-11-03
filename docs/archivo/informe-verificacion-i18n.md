# Informe de verificación i18n (EN / FR)

Revisión independiente de Finca Los Collados de San Miguel. **No se ha corregido nada.** Este documento lista los fallos encontrados para que confirmes cuáles se corrigen.

- Rama: `feature/i18n-en-fr`
- Build: 54 páginas SSG (ES + EN + FR)
- `npm run check:i18n`: claves alineadas (22 namespaces × 3 locales)
- Fecha: 19/10/2026
- Vista previa: `http://localhost:4321/`

Leyenda de gravedad: **alta** = error de sentido, dato falso o bloqueo de publicación; **media** = desvío claro del original o del glosario; **baja** = estilo, tipografía o código legado que no sale en las rutas vivas.

---

## Resumen

| Gravedad | Fallos |
| --- | ---: |
| Alta | 4 |
| Media | 14 |
| Baja | 12 |
| **Total** | **30** |

**Los cinco más importantes**

1. **Alta.** EN/FR dicen «eight rooms» / «huit chambres» donde el español habla de **8 estancias / bungalows**.
2. **Alta.** En francés, «caza en mano» se ha traducido por **«chasse en battue à pied»**. *Battue* es ojeo, no caza en mano.
3. **Alta.** Las cuatro páginas legales siguen siendo **placeholder** en los tres idiomas (EN/FR enlazan a la URL española, también vacía).
4. **Media.** EN reduce «mascota» a **dog** en portada, finca y gastronomía.
5. **Media.** Queda español visible en EN/FR: **«ruta a medida»**.

---

## Lo que sí está bien (no son fallos)

- Ninguna clave falta, está vacía o sobra entre `es`, `en` y `fr`.
- El HTML servido ya lleva el texto traducido (SSG; no depende de JavaScript).
- `html lang`: `es` / `en-GB` / `fr`. Canonical autorreferente. `hreflang` es / en-GB / fr / x-default recíprocos, URLs absolutas. `og:locale` + `og:locale:alternate`.
- `robots.txt` apunta a `https://loscolladosdesanmiguel.com/sitemap-index.xml`. El sitemap incluye las 51 URLs de contenido (sin 404) con alternativas.
- Enlaces internos de EN/FR conservan el idioma. El selector lleva a la página equivalente (p. ej. `/fr/hebergement` → `/en/accommodation` y `/alojamiento`). Los únicos enlaces a ES en páginas EN/FR son el selector de idioma.
- Formularios: `idioma` oculto (`EN`/`FR`), etiquetas del correo a la finca en español, `value` estables del motivo. La nota de configuración de Web3Forms **no** aparece en el HTML de producción.
- WhatsApp y `mailto:` con mensaje/asunto del idioma de la página. `tel:+34608543681` y `tel:+34660441734`.
- Booking.com: URL neutra (sin `.es.html`) + `lang=en-gb` / `lang=fr`. **Abierto de verdad:**
  - FR → `…ciudad-real.fr.html`, interfaz en francés (bandera FR, «Séjours», «Date d’arrivée»).
  - EN → `…ciudad-real.en-gb.html`, interfaz en inglés («Stays», «Check-in date», «Search»).
- Sin banner de cookies en esta web (fuera de alcance, a propósito). 404 EN/FR traducidas; el `404.html` raíz redirige `/en/…` y `/fr/…` a `/en/404` y `/fr/404`.
- Vouvoiement francés. Inglés británico (`enquiry`, `Telephone`, sin *color/center/organize*). Nombres propios sin traducir. **La Mancha** se mantiene; **Castille-La Manche** solo aparece como nombre oficial de *Castilla-La Mancha* (CC.AA.), coherente con el glosario.
- Diseño FR (portada, Hébergement, Réserver en ligne) a **375 / 768 / 1280 px**: sin desbordamiento horizontal. Por debajo de 1024 px hay menú hamburguesa; a 1280 px caben Hébergement, Entreprises, Événements, Formules y Réservations en una línea. Botones `nowrap` («Réserver», «Découvrir le domaine», «Nous contacter») sin partirse.

---

## 1. Cobertura

### Claves

0 claves faltantes, vacías o extra. Las ~78 cadenas «idénticas al español» son IDs/slugs (`turismo`, `romantico`…), nombres propios, `Minibar`, `Shootings` (igual en ES), `emailLabels` en español **a propósito** (correo a la finca) y cejas como `Campos de Montiel · Ciudad Real`.

### Español hardcodeado en componentes vivos

Los únicos fallbacks en código usado son el menú (F-27). El resto de copy de las rutas vivas pasa por JSON.

### Español visible en EN/FR (recorrido del HTML)

Las agujas «cookies», «Política», «reservar», etc. en el HTML de FR son falsos positivos (`Politique de cookies` es francés correcto). Queda español real en F-05 y F-03.

---

## Hallazgos

### F-01 — Alta — «eight rooms» / «huit chambres» por 8 estancias

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/en/alojamiento.json`, `src/i18n/messages/fr/alojamiento.json` |
| **Ruta** | `/en/accommodation`, `/fr/hebergement` |
| **Texto actual** | EN: *We have eight rooms in all…* · FR: *Nous disposons de huit chambres au total…* |
| **ES** | *Disponemos de un total de 8 estancias…* (bungalows, no habitaciones de hotel) |
| **Propuesta** | EN: *eight lodgings / bungalows*. FR: *huit bungalows / huit logements*. |

El resto de la misma página sí dice 8 bungalows; el intro contradice el dato.

### F-02 — Alta — «battue à pied» no es caza en mano

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/fr/la-calerilla.json`, `fr/la-finca.json`, `fr/packs.json` |
| **Ruta** | `/fr/la-calerilla`, `/fr/le-domaine`, `/fr/formules` |
| **Texto actual** | *tradition de la perdrix rouge en battue à pied*; *Chasse en battue à pied et autres modalités*; *chasse en battue à pied dans notre coto* |
| **ES** | *caza en mano* (recorrer el terreno con perros de muestra; no ojeo) |
| **Propuesta** | *chasse à l’approche* / *chasse en marchant* / *chasse au chien d’arrêt*. Reservar *battue* para el ojeo. El EN *walked-up shooting* sí es correcto. |

El propio `docs/traducciones-a-revisar.md` pide revisar este término con cazadores. El cuerpo de la ficha (perros de muestra, ritmo lento) describe caza en mano; el título dice lo contrario.

### F-03 — Alta — Legales: placeholder en ES/EN/FR

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/{es,en,fr}/legal.json`, `src/components/LegalPage.astro` |
| **Ruta** | `/politica-de-privacidad`, `/aviso-legal`, `/politica-de-cookies`, `/politica-de-reservas` y equivalentes EN/FR |
| **Texto actual** | Aviso de migración + enlace a `loscolladosdesanmiguel.com/politica-de-…` (la página española, también placeholder) |
| **Propuesta** | Cuando existan los textos, rellenar ES y traducir EN/FR. No publicar en producción con este hueco. |

Ya estaba marcado como pendiente; sigue siendo bloqueante.

### F-04 — Alta — Meta home EN/FR añade «exclusive use / privatisation» que el ES no dice

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/en/seo.json` `home.description`, `fr/seo.json` `home.description` |
| **Ruta** | `/en/`, `/fr/` (`<title>` y meta description) |
| **Texto actual** | EN: *…pet-friendly bungalows, **exclusive use of the estate**, team building…* · FR: *…bungalows animaux acceptés, **privatisation du domaine**, team building…* |
| **ES** | *Bungalows pet friendly, teambuilding, rodajes, eventos pequeños y packs* (sin finca completa) |
| **Propuesta** | Alinear con el ES o, si se quiere mencionar la privatización, añadirla también al español. |

---

### F-05 — Media — «ruta a medida» sin traducir

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/en/experiencias.json` `detail`; `fr/experiencias.json` `detail` |
| **Ruta** | `/en/experiences`, `/fr/experiences` |
| **Texto actual** | EN: *your “ruta a medida”* · FR: *votre « ruta a medida »* |
| **Propuesta** | EN: *your tailor-made route*. FR: *votre itinéraire sur mesure*. (El resto de la frase ya está traducido.) |

### F-06 — Media — «mascota» → «dog»

| | |
| --- | --- |
| **Archivo** | `en/home.json` pillars; `en/la-finca.json` features; `en/gastronomia.json` moments; `en/alojamiento.json` capacity |
| **Ruta** | `/en/`, `/en/the-estate`, `/en/dining`, `/en/accommodation` |
| **Texto actual** | *Your dog is welcome*; *with your dog*; *Dogs welcome (pet-friendly)* |
| **ES** | *Su mascota es bienvenida* / *con su mascota* / *Mascotas bienvenidas* |
| **Propuesta** | *Your pet is welcome* / *Pets welcome*. El FR *Animaux acceptés* / *votre animal* / *votre compagnon* es aceptable. |

### F-07 — Media — «Menus to order» (calco)

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/en/gastronomia.json` `features[1].title` |
| **Ruta** | `/en/dining` |
| **Texto actual** | *Menus to order* |
| **ES** | *Menús a medida* |
| **Propuesta** | *Tailored menus* / *Menus to suit*. El FR *Menus sur mesure* es correcto. |

### F-08 — Media — «every corner is thought» (calco)

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/en/gastronomia.json` `moments.paragraphs[0]` |
| **Ruta** | `/en/dining` |
| **Texto actual** | *every corner is thought so that you feel welcome from the first minute* |
| **ES** | *cada rincón está pensado para que se sienta acogido desde el primer minuto* |
| **Propuesta** | *every corner is designed so that you feel welcome…* / *laid out with your welcome in mind*. |

### F-09 — Media — FR «comarque» no es francés

| | |
| --- | --- |
| **Archivo** | `fr/experiencias.json`, `fr/entorno.json`, `fr/la-finca.json` |
| **Ruta** | `/fr/experiences`, `/fr/alentours`, `/fr/le-domaine` |
| **Texto actual** | *patrimoine de la comarque*; *dans la même comarque*; *dans la comarque de Campos de Montiel* |
| **ES** | *comarca* |
| **Propuesta** | *région naturelle* / *comarque* solo si se marca como término español (*la comarque de Campos de Montiel*). El EN usa *region*, coherente. |

### F-10 — Media — FR «un enclave» (género y calco)

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/fr/la-finca.json` `hero.subtitle` |
| **Ruta** | `/fr/le-domaine` |
| **Texto actual** | *dans un enclave rural unique de Castille-La Manche* |
| **ES** | *en un enclave rural único de Castilla-La Mancha* |
| **Propuesta** | *dans une enclave rurale unique* o, más natural, *dans un site rural unique de Castille-La Manche*. |

### F-11 — Media — Home EN/FR omite «en mano» en el teaser de La Calerilla

| | |
| --- | --- |
| **Archivo** | `en/home.json` `teasers.items[1]`; `fr/home.json` `teasers.items[1]` |
| **Ruta** | `/en/`, `/fr/` |
| **Texto actual** | EN: *Red-legged partridge shooting…* · FR: *Chasse à la perdrix rouge…* |
| **ES** | *Caza de perdiz roja **en mano** en Campos de Montiel.* |
| **Propuesta** | EN: *walked-up red-legged partridge shooting*. FR: término que se elija en F-02. |

### F-12 — Media — Sitemap `loc` con barra final; canonical sin ella

| | |
| --- | --- |
| **Archivo** | `dist/sitemap-0.xml` vs `<link rel="canonical">` en cada HTML |
| **Ruta** | todas menos home y 404 |
| **Texto actual** | Sitemap: `https://loscolladosdesanmiguel.com/alojamiento/` · Canonical/hreflang: `…/alojamiento` |
| **Propuesta** | Unificar (preferible sin barra, como el canonical). Google puede tratarlas como URL distintas. |

`hreflang` usa `en-GB` (no `en`). Es coherente con `html lang="en-GB"` y el inglés británico del briefing original; no lo marco como fallo, solo constato la diferencia con el enunciado de esta revisión.

### F-13 — Media — FR «le goût du champ» (poco natural)

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/fr/gastronomia.json` `moments.paragraphs[0]` |
| **Ruta** | `/fr/gastronomie` |
| **Texto actual** | *où le silence a le goût du champ* |
| **ES** | *donde el silencio tiene sabor a campo* |
| **Propuesta** | *le goût de la campagne* / *un goût de terroir*. |

### F-14 — Media — EN «Walked-up shooting and other days»

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/en/la-calerilla.json` `blocks[1].title` |
| **Ruta** | `/en/la-calerilla` |
| **Texto actual** | *Walked-up shooting and other days* |
| **ES** | *Caza en mano y modalidades* |
| **Propuesta** | *Walked-up shooting and other forms of the day* / *…and other shooting days*. |

### F-15 — Media — Títulos ES demasiado largos (preexistentes, pero en cada URL)

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/es/seo.json` |
| **Ruta** | `/alojamiento` (106), `/eventos` (109), `/empresas` (83), `/la-finca` (80), y otras ≥70 |
| **Texto actual** | p. ej. *Alojamiento Rural Villamanrique, Ciudad Real \| 8 Bungalows Pet Friendly \| Finca Los Collados de San Miguel* |
| **Propuesta** | Acortar a ~50–60 caracteres si se quiere SEO de snippet. EN/FR ya están en longitud razonable. Las descriptions de `/aviso-legal` (48) y `/politica-de-cookies` (56) en ES son cortas. |

Esto no es un error de traducción; sí incumple «longitud razonable» en las URLs españolas.

### F-16 — Media — EN «gratin cheese» / FR «Poivrons del piquillo»

| | |
| --- | --- |
| **Archivo** | `en/images.json` `platos[0]`; `fr/images.json` `platos[2]` |
| **Ruta** | `/en/dining`, `/fr/gastronomie` (alts de la galería) |
| **Texto actual** | EN: *Artichokes with ham and gratin cheese* · FR: *Poivrons del piquillo farcis* |
| **ES** | *Alcachofas con jamón y queso gratinado* · *Pimientos del piquillo rellenos* |
| **Propuesta** | EN: *gratiné cheese* / *melted cheese*. FR: *Poivrons del piquillo farcis* → *Poivrons du piquillo farcis* o dejar el nombre del plato en español. |

### F-17 — Media — Home EN pierde «turismo rural» como primer pilar

| | |
| --- | --- |
| **Archivo** | `src/i18n/messages/en/home.json` `hero.subtitle` y `pillars.items[0]` |
| **Ruta** | `/en/` |
| **Texto actual** | *A countryside retreat **for** team building, film shoots and intimate celebrations…* / pilar *Rural getaway* |
| **ES** | *Turismo rural, teambuilding, rodajes y eventos pequeños…* / *Turismo rural* |
| **Propuesta** | Mantener el turismo rural como oferta propia, no solo como marco de las otras tres. El FR *Séjour à la campagne, team building, tournages…* está más cerca. |

### F-18 — Media — Glosario «rodajes» = film **and photo** shoots

En home EN/FR, pilares y teasers, *rodajes* queda en *film shoots* / *tournages* (sin fotografía). En `/en/corporate` y `/fr/entreprises` sí están *photo shoots* / *séances photo*. Propuesta: alinear la portada con el glosario, o aceptar el resumen si se confirma.

---

### F-19 — Baja — Fallback JS «Abrir menú» / «Cerrar menú»

| | |
| --- | --- |
| **Archivo** | `src/components/layout/Header.astro` (script) |
| **Ruta** | todas, si faltara `data-label-open` |
| **Texto actual** | `?? 'Abrir menú'` / `?? 'Cerrar menú'` |
| **Propuesta** | Fallbacks EN/FR o sin fallback (el HTML ya lleva `data-label-open` traducido: *Open menu* / *Ouvrir le menu*). En condiciones normales no se ve. |

### F-20 — Baja — Componentes y datos españoles no usados

`src/data/pages-content.ts`, `src/data/home-content.ts` y `src/components/sections/{LaFinca,Alojamiento,Gastronomia,Experiencias,Contacto}.astro` siguen en español (*Reservar*, *Enviar*…). **No se renderizan** en las rutas actuales. Propuesta: borrar o marcar como legado para que no se reutilicen por error.

### F-21 — Baja — `site.ts` aún en español

`site.lang = 'es'`, `copyright` y `tagline` en español. El pie vivo usa `common.copyright` / `common.tagline` traducidos. No sale en página, pero confunde.

### F-22 — Baja — FR: espacios normales ante `; : ? !` (no estrechos)

Hay espacio antes de `:` y `?` (*Prêt pour une escapade rurale ?*), que es correcto a ojo. Faltan espacios insécables estrechos (U+202F) de tipografía francesa editorial. Las comillas « » se usan bien salvo la cita del Quijote (original en español, a propósito).

### F-23 — Baja — «fiche officielle .» (espacio ante el punto)

| | |
| --- | --- |
| **Archivo** | `fr/booking.json` `alternatives.bookingText` + interpolación del enlace |
| **Ruta** | `/fr/reserver-en-ligne` |
| **Texto actual** | *sur notre fiche officielle .* |
| **Propuesta** | Evitar el espacio antes del punto (*fiche officielle.*). |

### F-24 — Baja — FR «à l’abri» por «en interior»

| | |
| --- | --- |
| **Archivo** | `fr/home.json` `pillars.items[2]` |
| **Ruta** | `/fr/` |
| **Texto actual** | *Célébrations intimistes en extérieur ou à l’abri.* |
| **ES** | *al aire libre o en interior* |
| **Propuesta** | *en extérieur ou en intérieur*. |

### F-25 — Baja — FR «Aventure off-road» (inglés)

| | |
| --- | --- |
| **Archivo** | `fr/experiencias.json` `activities[1]` |
| **Ruta** | `/fr/experiences` |
| **Texto actual** | *Aventure off-road* |
| **Propuesta** | *Aventure tout-terrain*. |

### F-26 — Baja — EN «camp kitchens» / FR «cuisines campagnardes»

| | |
| --- | --- |
| **Archivo** | `en/la-finca.json`, `fr/la-finca.json` |
| **Ruta** | `/en/the-estate`, `/fr/le-domaine` |
| **ES** | *cocinas camperas* |
| **Propuesta** | EN: *outdoor kitchens*. FR: *cuisines d’extérieur* / *cuisines camper*. |

### F-27 — Baja — Inconsistencia de mayúsculas EN *The Estate* vs *the estate*

Nav/título *The Estate*; enlaces internos *The estate*. Unificar.

### F-28 — Baja — FR capacidad omite «(pet friendly)»

ES: *Mascotas bienvenidas (pet friendly)*. FR: *Animaux acceptés*. Aceptable; si se quiere paridad, *Animaux acceptés (pet friendly)*.

### F-29 — Baja — Cita del Quijote: `o!` sin espacio francés

El texto original se deja en español (correcto). El auditor tipográfico marca `ingenioso!` porque en francés iría `ingenioso !`. No tocar el original.

### F-30 — Baja — JSON-LD de 404 raíz en español

El `404.html` de GitHub Pages es la página española (esperado) y redirige `/en/…` y `/fr/…`. El JSON-LD de esa pieza sigue en `es-ES`; las 404 localizadas `/en/404` y `/fr/404` sí llevan `inLanguage` propio.

---

## 2. Calidad del idioma (notas transversales)

- **Glosario.** *finca* → estate / domaine: bien. *rodajes*: ver F-18. La Mancha no se traduce a «la Manche». Nombres propios (Azurea, Villamanrique, La Calerilla, La Porrosa) intactos. *Castille-La Manche* = Castilla-La Mancha, no La Mancha cultural.
- **Tutoiement.** No hay *tu/toi*. Hay *vous*, *Indiquez*, *Choisissez*.
- **Tono de traducción automática.** Además de F-07, F-08, F-13: EN *the silence tastes of the fields* es literario pero forzado; FR *Chaque univers du domaine a sa page* (ES: *Cada área*) es más marketing de lo necesario; EN *A melting pot of cultures* por *Un crisol de culturas* es válido.
- **Caza EN.** *the guns* (cazadores) es argot británico cinegético: natural para ese público, opaco para el resto. No lo marco como fallo.

---

## 3. SEO (detalle)

| Comprobación | Resultado |
| --- | --- |
| `html lang` | Correcto (`es` / `en-GB` / `fr`) |
| Title y description propios por idioma | Sí. Home EN/FR **añaden** privatización (F-04). Títulos ES largos (F-15). |
| Canonical autorreferente | Sí, sin barra final |
| hreflang recíproco absoluto | Sí (`es`, `en-GB`, `fr`, `x-default` → ES) |
| og:locale / alternate | `es_ES` / `en_GB` / `fr_FR` |
| Sitemap tres idiomas + alternativas | Sí; 51 URLs; sin 404 |
| `loc` vs canonical | Desajuste de barra final (F-12) |
| robots.txt → sitemap | Sí (`sitemap-index.xml`) |
| HTML con texto traducido | Sí (SSG) |

---

## 4. Funcionamiento

| Comprobación | Resultado |
| --- | --- |
| Enlaces internos EN/FR | Conservan el idioma |
| Enlaces rotos 404 | No detectados en el crawl del `dist` |
| Selector de idioma | Página equivalente en las rutas comprobadas (`/fr/hebergement`, home, reservas, 404) |
| Booking.com + fechas/adultos | El buscador construye `checkin`, `checkout`, `group_adults`, `no_rooms` y `lang=` |
| Booking.com idioma real | Confirmado EN (en-gb) y FR (.fr.html) |
| WhatsApp | Mensaje prellenado en el idioma de la página |
| `tel:+34…` | `tel:+34608543681`, `tel:+34660441734` |
| Formulario `idioma` + etiquetas ES | `idioma=FR` visto en `/fr/reserver-en-ligne`; labels ES en el payload |
| Nota Web3Forms | Ausente en producción |
| Versión española | URLs españolas sin prefijo, iguales que antes. Copy movido a JSON; spot-check de home, alojamiento, SEO y nav coincide con el origen. Queda legado no usado (F-20). No se ha hecho un diff párrafo a párrafo contra producción publicada. |

---

## 5. Diseño FR (375 / 768 / 1280)

| Viewport | Portada | Alojamiento | Reservas | Contacto / cabecera / botones |
| --- | --- | --- | --- | --- |
| 375 px | Hero y botones caben; «Découvrir le domaine» en una línea (nowrap, 217 px). Menú hamburguesa: ES·EN·FR, ítems y CTA a ancho completo, sin overflow. | Intro largo se envuelve; sin desborde. | Campos apilados; botones nowrap. | Cabecera ~72 px, logo + hamburguesa. |
| 768 px | Sigue hamburguesa (el nav de escritorio empieza en 1024 px). Botones hero en fila. Sin overflow. | Igual. | Tres campos en grid ≥768. | Cabecera estable. |
| 1280 px | Nav de escritorio en una línea (medido: último CTA a x=1178 de 1280). Sin overflow. | Nav visible. | Layout de escritorio. | Sin botones partidos. |

No se han visto textos cortados ni menú que no quepa en FR a esos anchos.

---

## Criterio de corrección

Nada de lo anterior está aplicado. Cuando confirmes, lo razonable es atacar primero F-01, F-02, F-03 y F-05; después F-04, F-06 a F-12.

Si quieres un recorte: dime si F-03 (legales) se deja fuera hasta que existan los textos, y si F-02 debe ser revisión con vosotros / cazadores o un cambio directo a *chasse à l’approche*.
