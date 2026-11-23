<script setup>
useHead({ title: 'Créditos · Prisma' })
const { avg } = useGrades()
const cards = [
  ['Institución', 'Universidad de Córdoba · LIMAV'],
  ['Asignatura', 'Artística: teoría del color y composición visual'],
  ['Tecnologías', 'Nuxt 3 para la estructura, Vue 3 para los componentes y JavaScript para la lógica'],
  ['Imágenes', 'Fotografías de Panzón, perro con lentes, huellas y marco de lápices aportados por el equipo del OVA']
]
</script>
<template>
  <div>
    <PageHead kicker="Créditos" title="¡Gracias y sigan esforzándose!" />
    <section class="thanks">
      <Panzon name="perro" :size="300" framed cap="Cada trazo cuenta" />
      <div>
        <p class="big">Llegaste al final de Prisma. Aprendiste a mezclar colores, a componer una imagen y a pensar en cómo ven los demás. Sigue practicando: cada dibujo te acerca a ser mejor artista.</p>
        <div class="card"><b>Tu nota final: {{ avg === null ? 'aún sin notas' : avg.toFixed(1) + ' / 5' }}</b><br><NuxtLink to="/evaluacion">Ver mi boletín</NuxtLink></div>
      </div>
    </section>
    <div class="grid"><div v-for="c in cards" :key="c[0]" class="card"><h3>{{ c[0] }}</h3><p class="mut">{{ c[1] }}</p></div></div>
  </div>
</template>
