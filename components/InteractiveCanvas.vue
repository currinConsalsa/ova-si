<script setup>
// Misión de composición con lógica de paisaje: el Sol se mueve en el cielo; montaña, árbol y casa caminan sobre el suelo.
// Se aplican la ley de tercios, el equilibrio y el orden. Termina con nota 0-5.
import { Check, Circle } from 'lucide-vue-next'
const { set } = useGrades()
const W = 600, H = 400, HOR = 267 // el horizonte vive en la línea de tercio inferior
const gold = [[200, 133], [400, 133]]
const thirds = [200, 400]
const init = () => [
  { id: 'sol', n: 'Sol', x: 110, y: 60, w: 3, hw: 38, hh: 38, free: true },
  { id: 'montana', n: 'Montaña', x: 300, y: 240, w: 5, hw: 70, hh: 45 },
  { id: 'arbol', n: 'Árbol', x: 500, y: 250, w: 2, hw: 26, hh: 33 },
  { id: 'casa', n: 'Casa', x: 150, y: 254, w: 2, hw: 32, hh: 34 }
]
const items = reactive(init())
const st = reactive({ snap: true, hint: false, sent: null })
const svg = ref(null)
let drag = null, off = [0, 0]
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const nearG = it => gold.map(q => [Math.hypot(it.x - q[0], it.y - q[1]), q]).sort((a, b) => a[0] - b[0])[0]
const nearT = it => thirds.map(t => [Math.abs(it.x - t), t]).sort((a, b) => a[0] - b[0])[0]
const place = (it, x, y) => {
  it.x = clamp(x, it.hw, W - it.hw)
  if (it.free) it.y = clamp(y, 50, HOR - it.hh - 12) // el Sol nunca baja del horizonte
}
const pos = e => { const r = svg.value.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height] }
const down = (e, it) => { drag = it; st.sent = null; const p = pos(e); off = [it.x - p[0], it.y - p[1]]; e.currentTarget.setPointerCapture(e.pointerId) }
const move = e => { if (!drag) return; const p = pos(e); place(drag, p[0] + off[0], p[1] + off[1]) }
const up = () => {
  if (drag && st.snap) {
    if (drag.free) { const [d, q] = nearG(drag); if (d < 40) { drag.x = q[0]; drag.y = q[1] } }
    else { const [d, t] = nearT(drag); if (d < 28) drag.x = t }
  }
  drag = null
}
const nudge = (it, dx, dy) => { place(it, it.x + dx, it.y + dy); st.sent = null }
const reset = () => { items.splice(0, items.length, ...init()); st.sent = null }
const res = computed(() => {
  const [sol, mon] = [items[0], items[1]]
  const d = nearG(sol)[0], mt = nearT(mon)[0]
  const Wt = items.reduce((a, i) => a + i.w, 0)
  const cx = items.reduce((a, i) => a + i.w * i.x, 0) / Wt
  const bal = Math.abs(cx - W / 2)
  let bad = 0
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    const a = items[i], b = items[j]
    if (Math.abs(a.x - b.x) < a.hw + b.hw + 4 && Math.abs(a.y - b.y) < a.hh + b.hh) bad++
  }
  const m = [
    { t: 'El Sol en un punto de oro (círculos amarillos del cielo)', s: Math.max(0, 100 - d * 1.25), ok: d <= 28 },
    { t: 'La Montaña sobre una línea de tercio (vertical)', s: Math.max(0, 100 - mt * 1.2), ok: mt <= 24 },
    { t: 'Equilibrio: el triángulo magenta cerca del eje central', s: Math.max(0, 100 - bal * 1.2), ok: bal <= 30 },
    { t: 'Orden: ningún elemento tapa a otro', s: 100 - bad / 6 * 100, ok: bad === 0 }
  ]
  return { m, cx, bal, nota: +(m.reduce((a, x) => a + x.s, 0) / 400 * 5).toFixed(1), g: nearG(sol)[1], t: nearT(mon)[1], hits: m.filter(x => x.ok).length }
})
const send = () => { st.sent = res.value.nota; set('tercios', res.value.nota) }
</script>
<template>
  <section class="card mission">
    <h3>Misión: componer con la regla de tercios</h3>
    <p class="mut">Arma el paisaje. El <b>Sol</b> se mueve por el cielo; la <b>Montaña, el Árbol y la Casa</b> caminan de lado sobre el suelo. Arrastra, o selecciona con Tab y mueve con las flechas.</p>
    <div class="mgrid">
      <svg ref="svg" :viewBox="`0 0 ${W} ${H}`" class="scene" role="group" aria-label="Paisaje para componer" @pointermove="move" @pointerup="up" @pointercancel="up">
        <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1d3a" /><stop offset="1" stop-color="#4a6fa5" /></linearGradient></defs>
        <rect :width="W" :height="H" fill="url(#sky)" />
        <rect :y="HOR" :width="W" :height="H - HOR" fill="#1f4d36" />
        <rect :y="HOR" :width="W" height="4" fill="#2f7a53" />
        <g stroke="#fff" stroke-opacity=".35" stroke-dasharray="6 6"><line x1="200" y1="0" x2="200" :y2="H" /><line x1="400" y1="0" x2="400" :y2="H" /><line x1="0" y1="133" :x2="W" y2="133" /></g>
        <line :x1="W / 2" y1="0" :x2="W / 2" :y2="H" stroke="#ec4899" stroke-opacity=".35" stroke-dasharray="2 6" />
        <text x="10" y="22" fill="#fff" fill-opacity=".7" font-size="12">CIELO · el Sol se mueve libre</text>
        <text x="10" :y="H - 10" fill="#fff" fill-opacity=".7" font-size="12">SUELO · solo de izquierda a derecha</text>
        <g v-for="(q, i) in gold" :key="i"><circle :cx="q[0]" :cy="q[1]" r="18" fill="none" stroke="#eab308" stroke-width="3" /><text :x="q[0]" :y="q[1] + 5" text-anchor="middle" fill="#eab308" font-size="14" font-weight="700">{{ i + 1 }}</text></g>
        <g v-if="st.hint" stroke="#eab308" stroke-width="3" stroke-dasharray="8 6"><line :x1="items[0].x" :y1="items[0].y" :x2="res.g[0]" :y2="res.g[1]" /><line :x1="items[1].x" y1="150" :x2="res.t" y2="150" /></g>
        <g v-for="it in items" :key="it.id" class="drag" :transform="`translate(${it.x} ${it.y})`" tabindex="0" role="button" :aria-label="`${it.n}: ${it.free ? 'arrastra o usa las 4 flechas' : 'arrastra o usa las flechas izquierda y derecha'}`" @pointerdown="down($event, it)" @keydown.left.prevent="nudge(it, -10, 0)" @keydown.right.prevent="nudge(it, 10, 0)" @keydown.up.prevent="nudge(it, 0, -10)" @keydown.down.prevent="nudge(it, 0, 10)">
          <rect class="ring" :x="-it.hw - 4" :y="-it.hh - 4" :width="it.hw * 2 + 8" :height="it.hh * 2 + 8" rx="10" />
          <rect :x="-it.hw" :y="-it.hh" :width="it.hw * 2" :height="it.hh * 2" fill="transparent" />
          <template v-if="it.id === 'sol'"><g stroke="#eab308" stroke-width="4" stroke-linecap="round"><line v-for="a in 8" :key="a" :x1="Math.cos(a * 0.785) * 28" :y1="Math.sin(a * 0.785) * 28" :x2="Math.cos(a * 0.785) * 38" :y2="Math.sin(a * 0.785) * 38" /></g><circle r="22" fill="#fde047" /></template>
          <template v-else-if="it.id === 'montana'"><polygon points="-70,45 0,-45 70,45" fill="#475569" /><polygon points="-17,-12 0,-45 17,-12 9,-6 0,-14 -9,-6" fill="#f8fafc" /></template>
          <template v-else-if="it.id === 'arbol'"><rect x="-5" y="8" width="10" height="25" fill="#92400e" /><circle cy="-4" r="26" fill="#22c55e" /></template>
          <template v-else><rect x="-26" y="-4" width="52" height="38" fill="#f472b6" /><polygon points="-32,-4 0,-34 32,-4" fill="#be185d" /><rect x="-6" y="12" width="12" height="22" fill="#0f172a" /></template>
          <text :y="it.hh + 16" text-anchor="middle" fill="#fff" font-size="13" font-weight="600" paint-order="stroke" stroke="#0f172a" stroke-width="3">{{ it.n }}</text>
        </g>
        <g><polygon :points="`${res.cx - 9},${H - 4} ${res.cx + 9},${H - 4} ${res.cx},${H - 22}`" fill="#ec4899" stroke="#fff" stroke-width="2" /><text :x="clamp(res.cx, 60, W - 60)" :y="H - 28" text-anchor="middle" fill="#fff" font-size="12" paint-order="stroke" stroke="#0f172a" stroke-width="3">centro de peso</text></g>
      </svg>
      <div class="mpanel">
        <h4>Tus 4 misiones <span class="chip">{{ res.hits }} / 4</span></h4>
        <ol class="miss2">
          <li v-for="(m, i) in res.m" :key="m.t" :class="{ ok: m.ok }">
            <span class="mk"><Check v-if="m.ok" :size="16" /><Circle v-else :size="16" /></span>
            <div><b>{{ i + 1 }}. {{ m.ok ? 'Logrado' : 'Pendiente' }}</b><br><span>{{ m.t }}</span><span class="tm"><i :style="{ width: m.s + '%' }" /></span></div>
          </li>
        </ol>
        <p class="nota">Nota actual: <b>{{ res.nota }} / 5</b></p>
        <div class="row">
          <button class="opt" style="width:auto;margin:0" :class="{ on: st.snap }" :aria-pressed="st.snap" @click="st.snap = !st.snap">Imán</button>
          <button class="opt" style="width:auto;margin:0" :class="{ on: st.hint }" :aria-pressed="st.hint" @click="st.hint = !st.hint">Pista</button>
          <button class="opt" style="width:auto;margin:0" @click="reset">Reiniciar</button>
        </div>
        <button class="btn" @click="send">Calificar mi composición</button>
        <p v-if="st.sent !== null" aria-live="polite"><b>Nota obtenida: {{ st.sent }} / 5.</b> Guardada en tu boletín. {{ st.sent >= 4 ? '¡Composición de artista!' : 'Ajusta los elementos y vuelve a calificar: se guarda tu mejor nota.' }}</p>
      </div>
    </div>
  </section>
</template>
