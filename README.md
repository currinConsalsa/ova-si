# Prisma: universo del color y la composición (OVA)

OVA hecho con **Nuxt 3 + Vue 3 (Composition API) + JavaScript**. Tema central: **ova y los componentes ** reutilizables (`props`, `v-model`, `ref`/`reactive`, `computed`, eventos).

## Ejecutar
```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # sitio estático en .output/public
```

## Estructura
| Carpeta | Contenido |
|---|---|
| `layouts/default.vue` | Barra de progreso, sidebar, avance en localStorage |
| `pages/` | Inicio, Módulos 1-3, Evaluación, Recursos |
| `components/` | `ColorMixer`, `InteractiveCanvas`, `ArtworkInspector`, `QuizEngine`, `SelfRubric` |
| `composables/useOva.js` | Estado de progreso y lista de módulos |
| `utils/color.js` | Conversión HSL→HEX y similitud de color |

## Subir a GitHub
```bash
git init && git add . && git commit -m "OVA Prisma: Nuxt 3 + Vue 3"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/prisma-ova.git
git push -u origin main
```
Pendiente: nada jijiji todo bien en`public/` y en `layouts/default.vue`.
