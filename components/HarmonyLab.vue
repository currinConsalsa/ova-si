<script setup>
// Laboratorio de armonías: elige un matiz y un tipo de armonía y mira la paleta resultante
const hue = ref(30)
const kind = ref('comp')
const KINDS = {
  comp: ['Complementaria', [0, 180], 'Dos colores opuestos: máximo contraste y vibración.'],
  ana: ['Análoga', [-30, 0, 30], 'Vecinos del círculo: suave, natural y relajada.'],
  tri: ['Tríada', [0, 120, 240], 'Tres colores a 120°: vivos y equilibrados.'],
  split: ['Complementaria dividida', [0, 150, 210], 'Un color y los dos vecinos de su opuesto: contraste con menos tensión.'],
  tet: ['Tetrada', [0, 90, 180, 270], 'Cuatro colores: rica, pero pide un color dominante.']
}
const cols = computed(() => KINDS[kind.value][1].map(o => ({ h: (hue.value + o + 360) % 360, hex: hsl2hex((hue.value + o + 360) % 360, 72, 52) })))
const dot = h => { const a = (h - 90) * Math.PI / 180; return [(100 + 74 * Math.cos(a)).toFixed(1), (100 + 74 * Math.sin(a)).toFixed(1)] }
</script>
<template>
  <div class="hl">
    <div class="row" role="group" aria-label="Tipo de armonía">
      <button v-for="(k, id) in KINDS" :key="id" class="opt" style="width:auto;margin:0" :class="{ on: kind === id }" :aria-pressed="kind === id" @click="kind = id">{{ k[0] }}</button>
    </div>
    <label class="mut" for="hl-h" style="display:block;margin-top:.8rem">Matiz base: {{ hue }}°</label>
    <input id="hl-h" v-model.number="hue" type="range" min="0" max="359" aria-describedby="hl-d">
    <div class="hl-grid">
      <svg viewBox="0 0 200 200" class="hl-ring" role="img" :aria-label="`Ruedecilla con los ${cols.length} colores de la armonía`">
        <circle cx="100" cy="100" r="74" fill="none" stroke="url(#hlg)" stroke-width="16" opacity=".85" />
        <defs><linearGradient id="hlg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ef4444" /><stop offset=".25" stop-color="#eab308" /><stop offset=".5" stop-color="#22c55e" /><stop offset=".75" stop-color="#3b82f6" /><stop offset="1" stop-color="#ec4899" /></linearGradient></defs>
        <polygon v-if="cols.length > 2" :points="cols.map(c => dot(c.h).join(',')).join(' ')" fill="#ffffff14" stroke="#fff" stroke-width="1.5" />
        <line v-if="cols.length === 2" :x1="dot(cols[0].h)[0]" :y1="dot(cols[0].h)[1]" :x2="dot(cols[1].h)[0]" :y2="dot(cols[1].h)[1]" stroke="#fff" stroke-width="1.5" />
        <circle v-for="c in cols" :key="c.h" :cx="dot(c.h)[0]" :cy="dot(c.h)[1]" r="13" :fill="c.hex" stroke="#fff" stroke-width="3" />
      </svg>
      <div>
        <div class="hl-sw"><span v-for="c in cols" :key="c.h" :style="{ background: c.hex }"><small>{{ c.hex }}</small></span></div>
        <p id="hl-d" aria-live="polite"><b>{{ KINDS[kind][0] }}.</b> {{ KINDS[kind][2] }}</p>
        <div class="hl-mini" aria-hidden="true">
          <div :style="{ background: cols[0].hex }"><b :style="{ color: cols[cols.length - 1].hex }">Aa</b></div>
          <div :style="{ background: hsl2hex(hue, 40, 14) }"><b :style="{ color: cols[cols.length - 1].hex }">Aa</b></div>
        </div>
        <p class="mut">Ejemplo de uso: fondo + texto con colores de la armonía.</p>
      </div>
    </div>
  </div>
</template>
