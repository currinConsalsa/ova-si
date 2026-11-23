<script setup>
// Rúbrica de autoevaluación con envío y nota (0-5)
const { set } = useGrades()
const crit = ['Armonía cromática', 'Uso de la regla de tercios', 'Limpieza visual']
const lv = ['Por mejorar', 'En desarrollo', 'Logrado', 'Muy bien', 'Sobresaliente']
const v = reactive({})
const sent = ref(null)
onMounted(() => { try { Object.assign(v, JSON.parse(localStorage.getItem('ova-rub') || '{}')) } catch {} })
watch(v, () => localStorage.setItem('ova-rub', JSON.stringify(v)), { deep: true })
const full = computed(() => crit.every(c => v[c]))
const avg = computed(() => (full.value ? +(crit.reduce((a, c) => a + v[c], 0) / crit.length).toFixed(1) : null))
const send = () => { sent.value = avg.value; set('rubrica', avg.value) }
</script>
<template>
  <section class="card">
    <h3>Rúbrica de autoevaluación</h3>
    <p class="mut">Mira tu propio proyecto gráfico y califica cada criterio con honestidad (1 a 5).</p>
    <div v-for="c in crit" :key="c">
      <b>{{ c }}</b>
      <div class="row">
        <button v-for="(n, k) in lv" :key="n" class="opt" style="width:auto" :class="{ on: v[c] === k + 1 }" :aria-pressed="v[c] === k + 1" @click="v[c] = k + 1; sent = null">{{ k + 1 }} · {{ n }}</button>
      </div>
    </div>
    <button class="btn" :disabled="!full" @click="send">Enviar autoevaluación</button>
    <span v-if="!full" class="mut"> Responde los 3 criterios para enviar.</span>
    <p v-if="sent !== null" aria-live="polite"><b>Nota obtenida: {{ sent }} / 5.</b> {{ sent >= 4 ? '¡Muy buen trabajo!' : 'Repasa los módulos y ajusta tu proyecto.' }}</p>
  </section>
</template>
