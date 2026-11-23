<script setup>
// Círculo cromático RYB de 12 colores
const C = WHEEL
const sel = ref(4)
const p = (a, q) => `${(160 + q * Math.cos(a)).toFixed(1)} ${(160 + q * Math.sin(a)).toFixed(1)}`
const arc = i => {
  const a0 = (i * 30 - 105) * Math.PI / 180, a1 = ((i + 1) * 30 - 105) * Math.PI / 180
  return `M${p(a0, 150)}A150 150 0 0 1 ${p(a1, 150)}L${p(a1, 62)}A62 62 0 0 0 ${p(a0, 62)}Z`
}
const comp = computed(() => (sel.value + 6) % 12)
const ana = computed(() => [(sel.value + 11) % 12, (sel.value + 1) % 12])
const role = i => (i === sel.value ? 'sel' : i === comp.value ? 'comp' : ana.value.includes(i) ? 'ana' : '')
</script>
<template>
  <section class="card">
    <h3>Círculo cromático interactivo</h3>
    <p class="mut">Toca un color (o usa Tab y Enter). Se marcan su complementario (borde amarillo) y sus análogos (borde cian).</p>
    <div class="wheelbox">
      <svg viewBox="0 0 320 320" class="wheel" role="group" aria-label="Círculo cromático de 12 colores">
        <path v-for="(c, i) in C" :key="c[0]" :d="arc(i)" :fill="c[1]" :class="['w', role(i)]" tabindex="0" role="button" :aria-label="`${c[0]}, ${c[2]}, ${c[3]}`" @click="sel = i" @keydown.enter.prevent="sel = i" @keydown.space.prevent="sel = i" />
        <circle cx="160" cy="160" r="52" :fill="C[sel][1]" />
      </svg>
      <div aria-live="polite">
        <h3>{{ C[sel][0] }}</h3>
        <p>{{ C[sel][2] }} · color {{ C[sel][3] }}</p>
        <p>Complementario: <b>{{ C[comp][0] }}</b> <span class="dot" :style="{ background: C[comp][1] }" /></p>
        <p>Análogos: <b>{{ C[ana[0]][0] }}</b> y <b>{{ C[ana[1]][0] }}</b></p>
      </div>
    </div>
  </section>
</template>
