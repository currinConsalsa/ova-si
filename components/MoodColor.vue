<script setup>
// Mi color de hoy + diario de los últimos 7 días (se guarda solo en este navegador)
const pick = useState('ova-mood', () => null)
const log = ref({})
const today = dayKey()
const week = computed(() => Array.from({ length: 7 }, (_, n) => { const d = new Date(); d.setDate(d.getDate() - (6 - n)); const k = dayKey(d); return { k, l: d.toLocaleDateString('es', { weekday: 'short' }).slice(0, 3), i: log.value[k] } }))
onMounted(() => { try { log.value = JSON.parse(localStorage.getItem('ova-moods') || '{}') } catch {} ; pick.value = log.value[today] ?? null })
const choose = i => { pick.value = i; log.value = { ...log.value, [today]: i }; localStorage.setItem('ova-moods', JSON.stringify(log.value)) }
</script>
<template>
  <section class="card">
    <h3>Mi color de hoy</h3>
    <p class="mut">¿Cómo te sientes? Elige el color que mejor lo describa y el rincón se tiñe con él. Nadie más verá tu respuesta.</p>
    <div class="moods">
      <button v-for="(m, i) in MOODS" :key="m[0]" class="mood" :class="{ on: pick === i }" :style="{ '--mc': m[1] }" :aria-pressed="pick === i" @click="choose(i)"><i /><b>{{ m[0] }}</b><small>{{ m[2] }}</small></button>
    </div>
    <div v-if="pick !== null" class="row" style="margin-top:1rem;flex-wrap:nowrap" aria-live="polite">
      <Panzon :name="MOODS[pick][4]" :size="110" />
      <p><b>{{ MOODS[pick][0] }}: {{ MOODS[pick][2] }}.</b> {{ MOODS[pick][3] }}</p>
    </div>
    <h4 style="margin:1.25rem 0 .4rem">Tu semana en colores</h4>
    <ol class="week">
      <li v-for="d in week" :key="d.k"><i :style="{ background: d.i !== undefined ? MOODS[d.i][1] : 'transparent' }" :aria-label="d.i !== undefined ? MOODS[d.i][0] : 'sin registro'" /><small>{{ d.l }}</small></li>
    </ol>
  </section>
</template>
