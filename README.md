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

## Próximos pasos

Ver `docs/PLAN-DESARROLLO.md` para el plan completo de migración.
