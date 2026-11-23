<script setup>
// Mandala de calma: dibuja con simetría radial. Tiene un modo automático para quien prefiere no dibujar.
import { Download, Eraser, Wand2 } from 'lucide-vue-next'
const cv = ref(null)
const S = 520
const cfg = reactive({ n: 8, mirror: true, size: 3, pal: 0 })
const pals = [['Océano', [185, 205, 225, 245]], ['Bosque', [90, 120, 150, 175]], ['Atardecer', [12, 335, 28, 290]], ['Lavanda', [265, 285, 310, 240]]]
let ctx, prev = null, len = 0, raf = 0
const col = () => `hsl(${pals[cfg.pal][1][Math.floor(len / 70) % 4]} 70% 66%)`
const seg = (a, b) => {
  ctx.strokeStyle = col(); ctx.lineWidth = cfg.size; ctx.lineCap = 'round'
  for (let i = 0; i < cfg.n; i++) {
    const t = i * 2 * Math.PI / cfg.n
    for (const f of cfg.mirror ? [1, -1] : [1]) {
      ctx.save(); ctx.translate(S / 2, S / 2); ctx.rotate(t); ctx.scale(f, 1)
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore()
    }
  }
}
const pt = e => { const r = cv.value.getBoundingClientRect(); return [(e.clientX - r.left) * S / r.width - S / 2, (e.clientY - r.top) * S / r.height - S / 2] }
const down = e => { cv.value.setPointerCapture(e.pointerId); prev = pt(e); seg(prev, [prev[0] + .1, prev[1]]) }
const move = e => { if (!prev) return; const q = pt(e); len += Math.hypot(q[0] - prev[0], q[1] - prev[1]); seg(prev, q); prev = q }
const up = () => (prev = null)
const clear = () => {
  cancelAnimationFrame(raf)
  ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, S, S)
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1
  for (const r of [60, 120, 180, 240]) { ctx.beginPath(); ctx.arc(S / 2, S / 2, r, 0, 7); ctx.stroke() }
  len = 0
}
const save = () => { const a = document.createElement('a'); a.download = 'mi-mandala-prisma.png'; a.href = cv.value.toDataURL('image/png'); a.click() }
const auto = () => {
  cancelAnimationFrame(raf)
  const k = 3 + Math.floor(Math.random() * 4), ph = Math.random() * 6
  let th = 0, last = null
  const step = () => {
    const batch = document.documentElement.classList.contains('calm') ? 4000 : 14
    for (let j = 0; j < batch && th < Math.PI * 12; j++, th += .02) {
      const r = 200 * Math.cos(k * th / 2 + ph) * (.55 + .45 * Math.sin(th / 3))
      const q = [r * Math.cos(th), r * Math.sin(th)]
      if (last) { len += 3; seg(last, q) }
      last = q
    }
    if (th < Math.PI * 12) raf = requestAnimationFrame(step)
  }
  step()
}
onMounted(() => { ctx = cv.value.getContext('2d'); clear() })
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>
<template>
  <section class="card">
    <h3>Mandala de calma</h3>
    <p class="mut">Dibuja con el dedo o el mouse: cada trazo se repite alrededor del centro. Dibujar despacio ayuda a soltar la tensión. Si prefieres no dibujar, pulsa «Mandala automático».</p>
    <div class="mand">
      <canvas ref="cv" :width="S" :height="S" role="img" aria-label="Lienzo circular para dibujar un mandala con simetría" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up" />
      <div class="mand-c">
        <b class="mut">Paleta</b>
        <div class="row"><button v-for="(q, i) in pals" :key="q[0]" class="opt" style="width:auto;margin:0" :class="{ on: cfg.pal === i }" :aria-pressed="cfg.pal === i" @click="cfg.pal = i"><span class="dot" :style="{ background: `hsl(${q[1][0]} 70% 66%)` }" /> {{ q[0] }}</button></div>
        <label class="mut" for="m-n">Simetría: {{ cfg.n }} ejes</label>
        <input id="m-n" v-model.number="cfg.n" type="range" min="4" max="16" step="2">
        <label class="mut" for="m-s">Grosor: {{ cfg.size }}</label>
        <input id="m-s" v-model.number="cfg.size" type="range" min="1" max="8">
        <button class="opt" :class="{ on: cfg.mirror }" :aria-pressed="cfg.mirror" @click="cfg.mirror = !cfg.mirror">Espejo {{ cfg.mirror ? 'activado' : 'desactivado' }}</button>
        <div class="row">
          <button class="btn" style="margin:0" @click="auto"><Wand2 :size="16" /> Mandala automático</button>
          <button class="btn ghost" style="margin:0" @click="clear"><Eraser :size="16" /> Limpiar</button>
          <button class="btn ghost" style="margin:0" @click="save"><Download :size="16" /> Guardar</button>
        </div>
      </div>
    </div>
  </section>
</template>
