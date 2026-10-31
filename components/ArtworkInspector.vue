<script setup>
// <ArtworkInspector /> · cambia la paleta en tiempo real y observa la emoción
const presets = [
  { n: 'Van Gogh · Noche estrellada', t: 'Fría', e: 'Inquietud y asombro: azules profundos que vibran junto a un amarillo intenso.', c: ['#1d3a6b', '#f2c744', '#2b4f7a', '#5f8fbf', '#12294a'] },
  { n: 'Monet · Impresión, sol naciente', t: 'Cálida', e: 'Calma difusa: naranjas suaves sobre grises azulados; la luz se disuelve.', c: ['#f3b98f', '#e8591a', '#8fa7b8', '#5f7f94', '#3f566a'] },
  { n: 'Kandinsky · Composición', t: 'Cálida', e: 'Energía y ritmo: colores primarios puros en contraste fuerte.', c: ['#f4e9c9', '#d7261e', '#2a4fb0', '#f2c400', '#1a1a1a'] },
  { n: 'Atardecer cálido', t: 'Cálida', e: 'Alegría y cercanía: la escena se siente acogedora.', c: ['#fdba74', '#fde047', '#c2410c', '#fb923c', '#7c2d12'] },
  { n: 'Glaciar frío', t: 'Fría', e: 'Serenidad y distancia: la escena se siente tranquila y silenciosa.', c: ['#bae6fd', '#f8fafc', '#0e7490', '#38bdf8', '#164e63'] }
]
const parts = ['Cielo', 'Sol', 'Colinas', 'Agua', 'Suelo']
const st = reactive({ i: 0, zoom: 1 })
const p = computed(() => presets[st.i])
</script>

<template>
  <section class="card">
    <h3>Inspector de obras y psicología del color</h3>
    <div class="row">
      <button v-for="(x, i) in presets" :key="x.n" class="opt" style="width:auto" :class="{ on: st.i === i }" @click="st.i = i">{{ x.n }}</button>
    </div>
    <div class="art" style="margin:1rem 0">
      <svg viewBox="0 0 400 240" :style="{ transform: `scale(${st.zoom})` }" role="img" :aria-label="'Ilustración con paleta ' + p.n">
        <rect width="400" height="240" :fill="p.c[0]" />
        <circle cx="290" cy="70" r="30" :fill="p.c[1]" />
        <path d="M0 170 L90 80 L170 150 L250 95 L400 175 V240 H0Z" :fill="p.c[2]" />
        <rect y="165" width="400" height="45" :fill="p.c[3]" />
        <rect y="205" width="400" height="35" :fill="p.c[4]" />
      </svg>
    </div>
    <label>Zoom {{ st.zoom.toFixed(1) }}×<input v-model.number="st.zoom" type="range" min="1" max="2.5" step="0.1"></label>
    <div class="grid" style="margin:1rem 0">
      <div v-for="(c, k) in p.c" :key="k"><div class="sw" style="height:48px" :style="{ background: c }" /><div class="hx">{{ parts[k] }} {{ c }}</div></div>
    </div>
    <p><b>Temperatura {{ p.t }}.</b> {{ p.e }}</p>
  </section>
</template>
