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

1. En el repo de GitHub: **Settings → Pages → Source: GitHub Actions**.
2. URL provisional: `https://fcamposanfeda-collab.github.io/finca-los-collados/`
3. Dominio propio: en el DNS del dominio (Hostinger u otro), apunta a GitHub Pages (registros A / CNAME). El archivo `public/CNAME` ya contiene `loscolladosdesanmiguel.com`.

**Nota:** el hosting es gratis; el **dominio** suele costar unos euros al año (renovar solo el dominio, no el plan de hosting).

## Próximos pasos

Ver `docs/PLAN-DESARROLLO.md` para el plan completo de migración.
