<script setup>
// <InteractiveCanvas /> · arrastra elementos sobre la rejilla de tercios
const items = reactive([
  { id: 'Sol', x: 75, y: 25, w: 3, c: '#eab308', s: 46 },
  { id: 'Montaña', x: 30, y: 70, w: 5, c: '#06b6d4', s: 78 },
  { id: 'Árbol', x: 55, y: 55, w: 2, c: '#22c55e', s: 38 },
  { id: 'Casa', x: 15, y: 30, w: 2, c: '#ec4899', s: 38 }
])
const board = ref(null)
let drag = null
const down = (e, it) => { drag = it; e.currentTarget.setPointerCapture(e.pointerId) }
const move = e => {
  if (!drag) return
  const r = board.value.getBoundingClientRect()
  drag.x = Math.min(100, Math.max(0, (e.clientX - r.left) / r.width * 100))
  drag.y = Math.min(100, Math.max(0, (e.clientY - r.top) / r.height * 100))
}
const pts = [[33.3, 33.3], [66.7, 33.3], [33.3, 66.7], [66.7, 66.7]]
const res = computed(() => {
  const main = items.reduce((a, b) => (b.w > a.w ? b : a))
  const d = Math.min(...pts.map(([px, py]) => Math.hypot(main.x - px, main.y - py)))
  const W = items.reduce((a, i) => a + i.w, 0)
  const cx = items.reduce((a, i) => a + i.w * i.x, 0) / W
  const cy = items.reduce((a, i) => a + i.w * i.y, 0) / W
  const focal = Math.max(0, Math.round(100 - d * 4))
  const bal = Math.max(0, Math.round(100 - Math.hypot(cx - 50, cy - 50) * 4))
  return { main: main.id, focal, bal, total: Math.round((focal + bal) / 2), cx, cy }
})
</script>

<template>
  <section class="card">
    <h3>Desafío: lienzo de tercios</h3>
    <p class="mut">Arrastra los elementos. Pon el más pesado ({{ res.main }}) en un punto de oro (círculos amarillos) y equilibra el resto: el punto magenta es el centro de peso.</p>
    <div ref="board" class="board" @pointermove="move" @pointerup="drag = null" @pointercancel="drag = null">
      <i class="g v" style="left:33.3%" /><i class="g v" style="left:66.7%" />
      <i class="g h" style="top:33.3%" /><i class="g h" style="top:66.7%" />
      <i v-for="p in pts" :key="p.join()" class="pt" :style="{ left: p[0] + '%', top: p[1] + '%' }" />
      <div v-for="it in items" :key="it.id" class="it" role="button" :aria-label="'Mover ' + it.id"
        :style="{ left: it.x + '%', top: it.y + '%', width: it.s + 'px', height: it.s + 'px', background: it.c }"
        @pointerdown="down($event, it)">{{ it.id }}</div>
      <i class="cm" :style="{ left: res.cx + '%', top: res.cy + '%' }" />
    </div>
    <p><b>Punto focal: {{ res.focal }}%</b> · <b>Equilibrio: {{ res.bal }}%</b> · <b>Total: {{ res.total }}%</b><br>
      {{ res.total >= 80 ? '¡Composición equilibrada!' : res.total >= 50 ? 'Buen intento: acerca el elemento principal a un punto de oro.' : 'Mueve los elementos hasta que el punto magenta quede cerca del centro.' }}</p>
  </section>
</template>
