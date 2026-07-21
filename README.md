# Los Collados de San Miguel

Sitio web de **Finca Los Collados de San Miguel** — turismo rural en Villamanrique, Ciudad Real.

Migración desde [loscolladosdesanmiguel.com](https://loscolladosdesanmiguel.com/) (WordPress + Elementor) a **Astro** estático.

## Requisitos

- Node.js >= 22.12.0

## Comandos

| Comando           | Acción                                      |
| ----------------- | ------------------------------------------- |
| `npm install`     | Instalar dependencias                       |
| `npm run dev`     | Servidor local en `http://localhost:4321`   |
| `npm run build`   | Build de producción en `./dist/`            |
| `npm run preview` | Previsualizar el build                      |

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

## Próximos pasos

Ver `docs/PLAN-DESARROLLO.md` para el plan completo de migración.
