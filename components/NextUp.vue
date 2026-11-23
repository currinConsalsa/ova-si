<script setup>
// Navegación anterior / siguiente al final de cada página
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
const route = useRoute()
const i = computed(() => modules.findIndex(m => m.to === route.path))
const prev = computed(() => (i.value > 0 ? modules[i.value - 1] : null))
const next = computed(() => (i.value >= 0 && i.value < modules.length - 1 ? modules[i.value + 1] : null))
</script>
<template>
  <nav v-if="i > 0" class="nextup" aria-label="Navegación entre páginas">
    <NuxtLink v-if="prev" :to="prev.to" class="nx" :style="{ '--tc': prev.c }"><ArrowLeft :size="18" /><span><small>Anterior</small><b>{{ prev.t }}</b></span></NuxtLink><span v-else />
    <NuxtLink v-if="next" :to="next.to" class="nx r" :style="{ '--tc': next.c }"><span><small>Siguiente</small><b>{{ next.t }}</b></span><ArrowRight :size="18" /></NuxtLink>
  </nav>
</template>
