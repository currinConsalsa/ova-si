<script setup>
import { Menu, Check } from 'lucide-vue-next'
const route = useRoute()
const { done, load, toggle, pct, keys } = useOva()
const open = ref(false)
const cur = computed(() => modules.find(m => m.to === route.path) || modules[0])
const isDone = computed(() => done.value.includes(route.path))
onMounted(load)
watch(() => route.path, () => (open.value = false))
</script>

<template>
  <div class="shell" :style="{ '--ac': cur.c }">
    <div class="bar" role="progressbar" :aria-valuenow="pct" aria-valuemin="0" aria-valuemax="100"><i :style="{ width: pct + '%' }" /></div>
    <header class="top">
      <button class="ico" aria-label="Abrir menú" @click="open = !open"><Menu :size="22" /></button>
      <span class="iso" />
      <b class="brand">Prisma</b>
      <span class="mut">Universidad de Córdoba · LIMAV</span>
      <span class="pct">{{ pct }}% completado</span>
    </header>
    <aside :class="{ open }">
      <NuxtLink v-for="m in modules" :key="m.to" :to="m.to">
        <span>{{ m.t }}</span>
        <Check v-if="done.includes(m.to)" :size="16" style="margin-left:auto" />
      </NuxtLink>
    </aside>
    <main>
      <slot />
      <button v-if="keys.includes(route.path)" class="btn" :class="{ ghost: isDone }" @click="toggle(route.path)">
        <Check :size="16" /> {{ isDone ? 'Completado' : 'Marcar como completado' }}
      </button>
    </main>
  </div>
</template>
