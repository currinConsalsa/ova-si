<script setup>
useHead({ title: 'Módulo 1 · Prisma' })
const col = ref({ h: 200, s: 70, l: 50 })
</script>

<template>
  <div>
    <h1>La naturaleza del color</h1>
    <p>El modelo <b>RYB</b> (rojo, amarillo, azul) es el de la pintura: mezclas pigmentos y el resultado se oscurece (sustractivo). El modelo <b>RGB</b> es el de las pantallas: mezclas luz y el resultado se aclara (aditivo).</p>
    <p>Las <b>armonías</b> son combinaciones que funcionan bien: análogos (vecinos), complementarios (opuestos), complementarios divididos y tríadas (120° entre sí). Los colores <b>cálidos</b> avanzan y energizan; los <b>fríos</b> se alejan y calman.</p>
    <ColorMixer v-model="col" />
  </div>
</template>
