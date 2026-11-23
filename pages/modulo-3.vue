<script setup>
useHead({ title: 'Módulo 3 · Prisma' })
const items = [
  { id: 'vg', t: 'Van Gogh', p: ['Vincent van Gogh (1853-1890) pintó «La noche estrellada» en 1889. Enfrentó azules profundos con amarillos brillantes: casi complementarios, por eso la luz de las estrellas vibra.', 'Su pincelada gruesa y en remolino hace que el color también tenga movimiento.'], tip: 'Complementarios juntos = energía y vibración.' },
  { id: 'mo', t: 'Monet', p: ['Claude Monet (1840-1926) dio nombre al impresionismo con «Impresión, sol naciente» (1872). No pintaba cosas, pintaba la luz sobre ellas.', 'Usa colores análogos y toques sueltos: azules, verdes y rosas suaves que se mezclan en el ojo del espectador.'], tip: 'Análogos = armonía suave y atmósfera.' },
  { id: 'ka', t: 'Kandinsky', p: ['Wassily Kandinsky (1866-1944) fue uno de los pioneros de la pintura abstracta. Creía que cada color suena como un instrumento: el amarillo como una trompeta, el azul como un violonchelo.', 'Sus composiciones usan formas simples y colores primarios para provocar emociones sin representar nada concreto.'], tip: 'El color puede expresar una emoción por sí solo.' },
  { id: 'emo', t: 'Color y emoción', p: ['La misma escena cambia de ánimo si cambias su paleta. Cálida: alegre, intensa. Fría: serena o melancólica. Oscura: misteriosa. Clara: ligera.', 'En el inspector de abajo puedes probar esto con paletas de los tres artistas.'], tip: 'Antes de pintar, decide qué emoción quieres y elige el color después.' }
]
const pal = { vg: ['#0b1d5e', '#2a52be', '#f5c518', '#f2e8a0', '#1d6b52'], mo: ['#a8c5da', '#f4b183', '#e8d5b7', '#9bb7a0', '#d98c8c'], ka: ['#d7263d', '#f7d117', '#2563eb', '#111827', '#f8fafc'], emo: ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#8b5cf6'] }
</script>

<template>
  <div>
    <PageHead kicker="Contenido · Módulo 3" title="Galería virtual y laboratorio" />
    <p>Los grandes artistas usan el color para provocar emociones. Conoce a tres de ellos, mira sus paletas y después cambia el clima emocional de una escena en el laboratorio.</p>
    <LearnTabs :items="items" label="Artistas y emoción">
      <template #vg><Palette :colors="pal.vg" label="vg" /><p class="mut" style="margin-top:.6rem">Paleta de referencia (aproximada).</p></template>
      <template #mo><Palette :colors="pal.mo" label="mo" /><p class="mut" style="margin-top:.6rem">Paleta de referencia (aproximada).</p></template>
      <template #ka><Palette :colors="pal.ka" label="ka" /><p class="mut" style="margin-top:.6rem">Paleta de referencia (aproximada).</p></template>
      <template #emo><Palette :colors="pal.emo" label="emo" /><p class="mut" style="margin-top:.6rem">Paleta de referencia (aproximada).</p></template>
    </LearnTabs>
    <h2>Laboratorio</h2>
    <ArtworkInspector />
  </div>
</template>
