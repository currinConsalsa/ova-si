<script setup>
// <ColorMixer v-model="color" /> · mezcla HSL + armonías + reto de paletas clásicas
const m = defineModel({ default: () => ({ h: 200, s: 70, l: 50 }) })
const ch = k => computed({ get: () => m.value[k], set: v => (m.value = { ...m.value, [k]: v }) })
const h = ch('h'), s = ch('s'), l = ch('l')
const targets = [
  { n: 'Van Gogh · cielo nocturno', hex: '#1d3a6b' },
  { n: 'Monet · sol naciente', hex: '#e8591a' },
  { n: 'Kandinsky · amarillo', hex: '#f2c400' },
  { n: 'Monet · agua', hex: '#5f7f94' }
]
const ti = ref(0)
const hex = computed(() => hsl2hex(h.value, s.value, l.value))
const score = computed(() => similarity(hex.value, targets[ti.value].hex))
const modes = { Análogos: [-30, 0, 30], Complementario: [0, 180], 'Compl. dividido': [0, 150, 210], Tríada: [0, 120, 240] }
const mode = ref('Tríada')
const harmony = computed(() => modes[mode.value].map(o => hsl2hex((h.value + o + 360) % 360, s.value, l.value)))
</script>

<template>
  <section class="card">
    <h3>Mezclador alquímico</h3>
    <p class="mut">Mueve los deslizadores hasta igualar el color de la obra. Cuando llegues al 90 %, ¡lo lograste!</p>
    <div class="row">
      <button v-for="(t, i) in targets" :key="t.n" class="opt" style="width:auto" :class="{ on: ti === i }" @click="ti = i">{{ t.n }}</button>
    </div>
    <div class="grid" style="margin:1rem 0">
      <div><div class="sw" :style="{ background: targets[ti].hex }" /><div class="hx">Objetivo {{ targets[ti].hex }}</div></div>
      <div><div class="sw" :style="{ background: hex }" /><div class="hx">Tu mezcla {{ hex }} · RGB {{ rgb(hex).join(', ') }}</div></div>
    </div>
    <label>Tono (H) {{ h }}°<input v-model.number="h" type="range" min="0" max="360"></label>
    <label>Saturación (S) {{ s }}%<input v-model.number="s" type="range" min="0" max="100"></label>
    <label>Luminosidad (L) {{ l }}%<input v-model.number="l" type="range" min="0" max="100"></label>
    <p><b>Similitud: {{ score }}%</b> {{ score >= 90 ? '¡Paleta reconstruida!' : score >= 60 ? 'Vas cerca.' : 'Sigue probando.' }}</p>
    <h3>Armonías de tu color</h3>
    <div class="row">
      <button v-for="(_, k) in modes" :key="k" class="opt" style="width:auto" :class="{ on: mode === k }" @click="mode = k">{{ k }}</button>
    </div>
    <div class="grid" style="margin-top:.75rem">
      <div v-for="c in harmony" :key="c"><div class="sw" :style="{ background: c }" /><div class="hx">{{ c }}</div></div>
    </div>
  </section>
</template>
