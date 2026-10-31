<script setup>
// Rúbrica de autoevaluación visual (se guarda en localStorage)
const crit = ['Armonía cromática', 'Uso de la regla de tercios', 'Limpieza visual']
const lv = ['Por mejorar', 'En desarrollo', 'Logrado', 'Muy bien', 'Sobresaliente']
const v = reactive({})
onMounted(() => { try { Object.assign(v, JSON.parse(localStorage.getItem('ova-rub') || '{}')) } catch {} })
watch(v, () => localStorage.setItem('ova-rub', JSON.stringify(v)), { deep: true })
const avg = computed(() => {
  const a = crit.map(c => v[c]).filter(Boolean)
  return a.length ? (a.reduce((x, y) => x + y) / a.length).toFixed(1) : null
})
</script>

<template>
  <section class="card">
    <h3>Rúbrica de autoevaluación</h3>
    <p class="mut">Mira tu propio proyecto gráfico y califica cada criterio con honestidad.</p>
    <div v-for="c in crit" :key="c">
      <b>{{ c }}</b>
      <div class="row">
        <button v-for="(n, k) in lv" :key="n" class="opt" style="width:auto" :class="{ on: v[c] === k + 1 }" :aria-pressed="v[c] === k + 1" @click="v[c] = k + 1">{{ k + 1 }} · {{ n }}</button>
      </div>
    </div>
    <p v-if="avg"><b>Promedio: {{ avg }} / 5.</b> {{ avg >= 3.5 ? '¡Muy buen trabajo!' : 'Repasa los módulos y ajusta tu proyecto.' }}</p>
  </section>
</template>
