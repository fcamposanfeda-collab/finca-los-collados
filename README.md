# Los Collados de San Miguel

Sitio web de **Finca Los Collados de San Miguel** — turismo rural en Villamanrique, Ciudad Real.

Migración desde [loscolladosdesanmiguel.com](https://loscolladosdesanmiguel.com/) (WordPress + Elementor) a **Astro** estático.

## Requisitos

- Node.js >= 22.12.0

## Comandos

| Comando               | Acción                                                          |
| --------------------- | --------------------------------------------------------------- |
| `npm install`         | Instalar dependencias                                           |
| `npm run dev`         | Servidor local en `http://localhost:4321`                       |
| `npm run build`       | Optimiza medios y genera el sitio estático en `./dist/`         |
| `npm run preview`     | Previsualizar el build                                          |
| `npm run check:i18n`  | Comprueba que las claves i18n coinciden en ES, EN y FR          |
| `npm run optimize:media` | Regenera variantes de imagen y vídeo en `public/*/opt/`      |

## Estructura

```
src/
├── components/
│   ├── layout/     # Header, Footer
│   └── sections/   # Secciones de la home
├── data/           # Contenido y configuración
├── layouts/        # BaseLayout
├── pages/          # Rutas
└── styles/         # CSS global y tokens
```

## Publicación (gratis con GitHub Pages)

Cada push a `main` publica la web automáticamente.

1. En el repo: **Settings → Pages → Source: GitHub Actions**.
2. Dominio: `loscolladosdesanmiguel.com` (archivo `public/CNAME`).
3. DNS en Hostinger: registros **A** de `@` a las IPs de GitHub Pages y **CNAME** de `www` → `fcamposanfeda-collab.github.io`. No borrar MX/TXT del correo.

## Estado

Sitio estático Astro 6 en producción (GitHub Pages desde `main`): español sin prefijo, inglés en `/en/` y francés en `/fr/`.
