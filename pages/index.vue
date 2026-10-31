<script setup>
const tags = ['Teoría del Color', 'Círculo Cromático', 'Composición Visual', 'Vue3', 'Nuxt', 'Componentes Interactivos', 'Arte Digital', 'Módulo Educativo', 'HTML5 Canvas']
const goals = [
  'Clasificar los colores (primarios, secundarios, terciarios) y combinarlos en armonías: complementarios, análogos y tríadas.',
  'Experimentar con simulaciones: mezcla aditiva y sustractiva, y cómo el color cambia la emoción de una obra.',
  'Aplicar la regla de tercios, el peso visual y el contraste creando lienzos interactivos hechos con componentes Vue 3.'
]
</script>

<template>
  <div>
    <h1>Prisma: universo del color y la composición</h1>
    <p>Aprende jugando: mezcla colores con deslizadores, arrastra objetos para equilibrar una imagen y cambia la paleta de obras famosas para ver cómo cambia su emoción.</p>
    <NuxtLink class="btn" to="/modulo-1">Comenzar módulo 1</NuxtLink>
    <h2 style="margin-top:2rem">Lo que vas a aprender</h2>
    <ul><li v-for="g in goals" :key="g" style="max-width:68ch">{{ g }}</li></ul>
    <h2>Temas</h2>
    <div class="grid">
      <NuxtLink v-for="m in modules.slice(1, 4)" :key="m.to" :to="m.to" class="card" style="text-decoration:none;color:inherit">
        <h3 :style="{ color: m.c }">{{ m.t }}</h3><p class="mut">{{ m.d }}</p>
      </NuxtLink>
    </div>
    <div class="row chips"><span v-for="t in tags" :key="t">{{ t }}</span></div>
  </div>
</template>
