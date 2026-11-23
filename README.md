# Prisma: universo del color y la composición (OVA)

OVA de artística hecho con **Nuxt 3 + Vue 3 (Composition API) + JavaScript**. Tema central: **componentes** reutilizables (`props`, `v-model`, `ref`/`reactive`, `computed`, eventos).

## Ejecutar
```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # sitio estático en .output/public
```

## Páginas
Tablero de inicio · Contenido (Módulos 1-3 con temas desplegables) · Actividad (Taller, Color para todos, Rincón de calma con 4 estaciones) · Evaluación (con boletín de notas) · Recursos · Créditos

## Componentes
`ColorMixer`, `InteractiveCanvas`, `ArtworkInspector`, `QuizEngine`, `SelfRubric`, `ImageLab`, `SketchPad`, `VisionSim`, `ContrastChecker`, `MoodColor`, `Breathing`, `ColorWheel`, `GradeBoard`, `PageHead`, `Panzon`, `ArtSupplies`, y nuevos: `OvaBoard` (tablero de inicio), `LearnTabs`, `Diagram`, `Palette`, `HarmonyLab`, `HarmonyGame` (Duelo de armonías), `Mandala`, `Grounding`, `NextUp`.

## Accesibilidad
Enlace para saltar al contenido, texto grande, alto contraste, opción sin animaciones, respeto a `prefers-reduced-motion`, ningún destello y textos alternativos en todas las imágenes.

## Actualizar el repositorio
```bash
git add .
git commit -m "OVA Prisma: nuevas páginas, lápices y Panzón"
git push
```
