<script setup>
// Lienzo HTML5 Canvas para dibujar con lápices de colores
const pens = [['Rojo', '#ef4444'], ['Naranja', '#f97316'], ['Amarillo', '#eab308'], ['Verde', '#22c55e'], ['Cian', '#06b6d4'], ['Azul', '#3b82f6'], ['Violeta', '#8b5cf6'], ['Magenta', '#ec4899'], ['Negro', '#0f172a']]
const cv = ref(null)
const st = reactive({ c: '#06b6d4', w: 6 })
let ctx, down = false
const clear = () => { ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, 720, 480) }
onMounted(() => { ctx = cv.value.getContext('2d'); clear() })
const pos = e => { const r = cv.value.getBoundingClientRect(); return [(e.clientX - r.left) * 720 / r.width, (e.clientY - r.top) * 480 / r.height] }
const draw = e => {
  if (!down) return
  ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = st.c; ctx.lineWidth = st.w
  ctx.lineTo(...pos(e)); ctx.stroke()
}
const start = e => { down = true; cv.value.setPointerCapture(e.pointerId); ctx.beginPath(); ctx.moveTo(...pos(e)); draw(e) }
const save = () => { const a = document.createElement('a'); a.href = cv.value.toDataURL('image/png'); a.download = 'mi-dibujo-prisma.png'; a.click() }
</script>
<template>
  <section class="card">
    <h3>Cuaderno de dibujo</h3>
    <p class="mut">Elige un lápiz y dibuja con el mouse o el dedo. Prueba una armonía del Módulo 1: tres lápices en tríada.</p>
    <div class="row"><button v-for="p in pens" :key="p[0]" class="opt" style="width:auto" :class="{ on: st.c === p[1] }" :aria-pressed="st.c === p[1]" @click="st.c = p[1]"><span class="dot" :style="{ background: p[1] }" /> {{ p[0] }}</button></div>
    <label>Grosor {{ st.w }} px<input v-model.number="st.w" type="range" min="2" max="24"></label>
    <canvas ref="cv" class="pad" width="720" height="480" role="img" aria-label="Lienzo de dibujo libre" @pointerdown="start" @pointermove="draw" @pointerup="down = false" @pointercancel="down = false" />
    <div class="row"><button class="btn" @click="save">Guardar dibujo (PNG)</button><button class="btn ghost" @click="clear">Borrar todo</button></div>
  </section>
</template>
