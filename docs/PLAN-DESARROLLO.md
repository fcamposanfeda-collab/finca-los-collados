# Plan de desarrollo — Finca Los Collados de San Miguel

> **Documento de referencia** para la migración del sitio a Astro.  
> **Origen analizado:** [https://loscolladosdesanmiguel.com/](https://loscolladosdesanmiguel.com/)  
> **Fecha del análisis:** 23/06/2026  
> **Estado del proyecto:** Astro 6.4.7 instalado, estructura base y home con secciones creadas.

---

## 1. Objetivo

Recrear el sitio de **Finca Los Collados de San Miguel** (turismo rural en Campos de Montiel, Ciudad Real) usando **Astro** como framework estático, con mejor rendimiento que el actual WordPress + Elementor.

**Alcance inicial:** réplica visual y funcional de la web pública actual.  
**Fuera de alcance (fase 1):** panel WordPress, motor de reservas propio, blog dinámico con backend.

---

## 2. Análisis del sitio original

### 2.1 Plataforma detectada

| Aspecto        | Valor                          |
| -------------- | ------------------------------ |
| CMS            | WordPress                      |
| Constructor    | Elementor + Elementor Pro      |
| Tema           | Hello Elementor                |
| Formulario     | Contact Form 7 + MetForm       |
| Cookies        | Cookie Notice                  |
| WhatsApp       | Plugin WP WhatsApp             |
| Idiomas        | Selector EN (pendiente revisar) |

### 2.2 Mapa del sitio

La web actual es principalmente **una sola página** con secciones ancladas:

```
/                           → Inicio (secciones)
  #lafinca                  → La Finca
  #alojamiento              → El Alojamiento
  #gastronomia              → Gastronomía
  #experiencias             → Experiencias / Rutas
  #contacto                 → Formulario de contacto
  #noticias                 → Blog preview
/reservas-online            → Motor de reservas externo
/noticias/[slug]            → Entradas del blog (WordPress)
/politica-de-privacidad     → Legal
/aviso-legal                → Legal
/politica-de-cookies        → Legal
/politica-de-reservas       → Legal
```

**Navegación principal:** La Finca · Alojamiento · Gastronomía · Experiencias · Contacto · Noticias · **Reservas**

### 2.3 Datos de contacto

| Campo     | Valor                                                                 |
| --------- | --------------------------------------------------------------------- |
| Dirección | Ctra de Montizón Km 1,5 Camino de los Collados Km 4,4, 13343 Villamanrique, Ciudad Real |
| Email     | info@loscolladosdesanmiguel.com                                       |
| Email alt | acasado.anfeda@gmail.com                                              |
| Teléfono  | 608 543 681                                                           |
| Teléfono  | 660 441 734                                                           |
| Facebook  | Sí                                                                    |
| Instagram | Sí                                                                    |

### 2.4 Contenido principal

- **La Finca:** enclave histórico (+2.500 años), 8 bungalows (máx. 16 personas), restauración, piscina, biblioteca, chimenea.
- **Alojamiento:** bungalows con terraza, WiFi, Smart TV, minibar, ducha efecto lluvia, etc.
- **Gastronomía:** cocina manchega tradicional (migas, pisto, caldereta, etc.).
- **Experiencias:** rutas a medida, caballo, bicicleta, quad, golf, globo aerostático.
- **Blog:** noticias sobre fauna, eventos rurales, temporada, exposición cinegética.

### 2.5 Identidad visual (propuesta para Astro)

| Token              | Valor propuesto |
| ------------------ | --------------- |
| Color primario     | `#4a6741` (verde oliva) |
| Color secundario   | `#6b4c35` (marrón tierra) |
| Color acento       | `#c9a96e` (dorado cálido) |
| Fondo              | `#faf8f5` (crema) |
| Tipografía titular | Playfair Display |
| Tipografía cuerpo  | Source Sans 3 |

> Pendiente extraer colores exactos del logo y fotografías oficiales del cliente.

---

## 3. Arquitectura en Astro

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── LaFinca.astro
│   │   ├── Alojamiento.astro
│   │   ├── Gastronomia.astro
│   │   ├── Experiencias.astro
│   │   ├── Contacto.astro
│   │   └── Noticias.astro
│   └── LegalPage.astro
├── data/
│   ├── site.ts
│   ├── contact.ts
│   ├── navigation.ts
│   ├── pages-meta.ts
│   └── home-content.ts
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── reservas-online.astro
│   ├── noticias/[slug].astro
│   └── [páginas legales]
└── styles/
    ├── tokens.css
    ├── typography.css
    └── global.css
```

---

## 4. Fases de implementación

### Fase 0 — Bootstrap ✅
- [x] Proyecto Astro + sitemap
- [x] Estructura de carpetas
- [x] Layout base (header, footer, SEO)
- [x] Home con secciones y contenido migrado (texto)
- [x] Páginas legales (placeholder)
- [x] Este documento de plan

### Fase 1 — Diseño y assets
- [ ] Descargar logo, fotos y tipografías oficiales
- [ ] Ajustar paleta de colores al branding real
- [ ] Hero con carrusel de imágenes (como la web actual)
- [ ] Galerías de alojamiento y finca

### Fase 2 — Funcionalidad
- [ ] Integrar formulario de contacto (Hostinger / Formspree / similar)
- [ ] Enlazar motor de reservas online
- [ ] Banner de cookies (RGPD)
- [ ] Botón WhatsApp flotante (si se mantiene)

### Fase 3 — Blog
- [ ] Migrar entradas de WordPress a Markdown (`src/content/`)
- [ ] Listado y plantilla de artículo

### Fase 4 — SEO y despliegue
- [ ] Schema.org (LocalBusiness / LodgingBusiness)
- [ ] Sitemap y robots.txt
- [ ] Build y despliegue en Hostinger
- [ ] Redirecciones 301 desde URLs antiguas

### Fase 5 — Extras (opcional)
- [ ] Versión en inglés
- [ ] Lighthouse > 90 en todas las métricas

---

## 5. Cómo arrancar

```bash
cd d:\DESARROLLO\Los-Collados-San-Miguel
npm install
npm run dev
```

Abrir [http://localhost:4321](http://localhost:4321).

---

## 6. Relación con Madrid Calidad

Este proyecto es **totalmente independiente** de `Madrid-calidad`. Comparten el mismo stack (Astro 6 + TypeScript + CSS modular) pero no comparten código, repositorio ni despliegue. Cada uno vive en su propia carpeta dentro de `DESARROLLO`.
