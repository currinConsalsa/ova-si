<script setup>
// Simulador de visión del color (filtros SVG feColorMatrix)
const M = {
  Normal: null,
  Protanopia: '0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0',
  Deuteranopia: '0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0',
  Tritanopia: '0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0',
  Acromatopsia: '0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0.299 0.587 0.114 0 0 0 0 0 1 0'
}
const info = {
  Normal: 'Visión típica del color.',
  Protanopia: 'Los rojos se ven apagados y se confunden con verdes y marrones.',
  Deuteranopia: 'Los verdes y rojos se parecen mucho; es la forma más común.',
  Tritanopia: 'Se confunden azules con verdes y amarillos con violetas. Es poco frecuente.',
  Acromatopsia: 'Solo se perciben grises: lo único que queda es el valor (claro/oscuro).'
}
const k = ref('Normal')
const cols = [['Rojo', '#ef4444'], ['Verde', '#22c55e'], ['Azul', '#3b82f6'], ['Amarillo', '#eab308'], ['Magenta', '#ec4899']]
</script>
<template>
  <section class="card">
    <h3>Simulador de visión del color</h3>
    <svg width="0" height="0" aria-hidden="true" style="position:absolute">
      <template v-for="(v, n) in M" :key="n"><filter v-if="v" :id="'f-' + n" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" :values="v" /></filter></template>
    </svg>
    <div class="row"><button v-for="(_, n) in M" :key="n" class="opt" style="width:auto" :class="{ on: k === n }" :aria-pressed="k === n" @click="k = n">{{ n }}</button></div>
    <div class="grid" :style="{ filter: M[k] ? `url(#f-${k})` : 'none', margin: '1rem 0', alignItems: 'center' }">
      <img src="/img/panzon-gris.webp" :alt="panAlt.gris" style="width:100%;max-width:200px;border-radius:12px;margin:auto">
      <div><div v-for="c in cols" :key="c[0]" class="sw" style="height:32px;margin:.3rem 0" :style="{ background: c[1] }" role="img" :aria-label="c[0]" /></div>
    </div>
    <p aria-live="polite"><b>{{ k }}.</b> {{ info[k] }}</p>
    <p class="mut">Por eso un buen diseño nunca usa solo el color para dar información: suma texto, formas o iconos.</p>
  </section>
</template>
