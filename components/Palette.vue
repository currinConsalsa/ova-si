<script setup>
defineProps({ colors: { type: Array, required: true }, label: String })
</script>
<template>
  <div class="pal" role="img" :aria-label="`Paleta ${label || ''}: ${colors.join(', ')}`">
    <span v-for="c in colors" :key="c" :style="{ background: c }"><small>{{ c }}</small></span>
  </div>
</template>
