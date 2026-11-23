<script setup>
import { Menu, Check } from 'lucide-vue-next'
const route = useRoute()
const { done, load, toggle, pct, keys } = useOva()
const { load: loadGrades } = useGrades()
const open = ref(false)
const a11y = reactive({ big: false, hc: false, calm: false })
const opts = [['big', 'Texto grande'], ['hc', 'Alto contraste'], ['calm', 'Sin animaciones']]
const cur = computed(() => modules.find(m => m.to === route.path) || modules[0])
const isDone = computed(() => done.value.includes(route.path))
onMounted(() => {
  load(); loadGrades()
  try { Object.assign(a11y, JSON.parse(localStorage.getItem('ova-a11y') || '{}')) } catch {}
})
watch(a11y, () => {
  for (const k in a11y) document.documentElement.classList.toggle(k, a11y[k])
  localStorage.setItem('ova-a11y', JSON.stringify(a11y))
}, { deep: true })
watch(() => route.path, () => (open.value = false))
</script>

<template>
  <div class="shell" :style="{ '--ac': cur.c }">
    <div class="frame" aria-hidden="true"><i class="t" /><i class="b" /><i class="l" /><i class="r" /><i class="c tl" /><i class="c tr" /><i class="c bl" /><i class="c br" /></div>
    <a class="skip" href="#main">Saltar al contenido</a>
    <div class="bar" role="progressbar" aria-label="Progreso del OVA" :aria-valuenow="pct" aria-valuemin="0" aria-valuemax="100"><i :style="{ width: pct + '%' }" /></div>
    <header class="top">
      <button class="ico" aria-label="Abrir menú" @click="open = !open"><Menu :size="22" /></button>
      <span class="iso" />
      <b class="brand">Prisma</b>
      <span class="mut">Universidad de Córdoba · LIMAV</span>
      <span class="pct">{{ pct }}% completado</span>
    </header>
    <aside :class="{ open }">
      <template v-for="(m, i) in modules" :key="m.to">
        <small v-if="m.g && modules[i - 1].g !== m.g" class="grp">{{ m.g }}</small>
        <NuxtLink :to="m.to">
          <span>{{ m.t }}</span>
          <Check v-if="done.includes(m.to)" :size="16" style="margin-left:auto" />
        </NuxtLink>
      </template>
      <div class="mascot">
        <b class="mut">Accesibilidad</b>
        <button v-for="o in opts" :key="o[0]" class="opt" style="margin:0" :class="{ on: a11y[o[0]] }" :aria-pressed="a11y[o[0]]" @click="a11y[o[0]] = !a11y[o[0]]">{{ o[1] }}</button>
        <Panzon name="nube" :size="90" bob />
      </div>
    </aside>
    <main id="main">
      <span v-for="c in ['tl', 'tr', 'bl', 'br']" :key="c" class="paw" :class="c" aria-hidden="true" />
      <slot />
      <NextUp />
      <button v-if="keys.includes(route.path)" class="btn" :class="{ ghost: isDone }" @click="toggle(route.path)">
        <Check :size="16" /> {{ isDone ? 'Completado' : 'Marcar como completado' }}
      </button>
    </main>
  </div>
</template>
