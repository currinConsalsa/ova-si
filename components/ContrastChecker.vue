<script setup>
// Verificador de contraste de texto (WCAG)
const fg = ref('#e2e8f0'), bg = ref('#0f172a')
const r = computed(() => contrast(fg.value, bg.value))
const checks = computed(() => [['Texto normal (AA, mínimo 4.5)', r.value >= 4.5], ['Texto grande (AA, mínimo 3)', r.value >= 3], ['Texto normal mejorado (AAA, mínimo 7)', r.value >= 7]])
</script>
<template>
  <section class="card">
    <h3>Verificador de contraste</h3>
    <div class="row">
      <label>Color del texto <input v-model="fg" type="color"></label>
      <label>Color del fondo <input v-model="bg" type="color"></label>
    </div>
    <div class="sw" style="height:auto;padding:1rem;margin:1rem 0;display:grid;place-items:center" :style="{ background: bg, color: fg }"><b style="font-size:1.4rem">Así se lee tu texto</b></div>
    <p><b>Contraste: {{ r.toFixed(2) }} : 1</b></p>
    <ul><li v-for="c in checks" :key="c[0]">{{ c[1] ? 'Cumple' : 'No cumple' }}: {{ c[0] }}</li></ul>
  </section>
</template>
