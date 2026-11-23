<script setup>
// Tablero interactivo: mosaico de tarjetas que llevan a cada contenido, con progreso real
import { Palette, LayoutGrid, Landmark, Brush, Eye, Flower2, ClipboardCheck, BookOpen, Award, Check, ArrowRight } from 'lucide-vue-next'
const { done } = useOva()
const { g } = useGrades()
const icons = { '/modulo-1': Palette, '/modulo-2': LayoutGrid, '/modulo-3': Landmark, '/laboratorio': Brush, '/accesibilidad': Eye, '/calma': Flower2, '/evaluacion': ClipboardCheck, '/recursos': BookOpen, '/creditos': Award }
const tags = { '/modulo-1': ['Círculo cromático', 'Armonías', 'Duelo de armonías'], '/modulo-2': ['Peso visual', 'Tercios', 'Misión de composición'], '/modulo-3': ['Van Gogh', 'Monet', 'Kandinsky'], '/laboratorio': ['Editar foto', 'Valor', 'Lápices'], '/accesibilidad': ['Daltonismo', 'Contraste'], '/calma': ['Mandala', 'Respiración', '5-4-3-2-1'], '/evaluacion': ['Quiz', 'Rúbrica', 'Boletín'], '/recursos': ['Museos', 'Paletas'], '/creditos': ['Equipo', 'Tecnologías'] }
const tiles = modules.filter(m => m.to !== '/')
const hover = ref(null)
const grp = m => m.g || 'Más'
</script>
<template>
  <div class="bento">
    <NuxtLink v-for="(m, i) in tiles" :key="m.to" :to="m.to" class="tile" :class="['t' + i, { fin: done.includes(m.to) }]" :style="{ '--tc': m.c, '--i': i }" @mouseenter="hover = m.to" @mouseleave="hover = null" @focus="hover = m.to" @blur="hover = null">
      <span class="t-ico"><component :is="icons[m.to]" :size="24" /></span>
      <small class="t-g">{{ grp(m) }}</small>
      <h3>{{ m.t.replace(/^Módulo \d: /, '') }}</h3>
      <p>{{ m.d }}</p>
      <span class="t-tags"><i v-for="x in tags[m.to]" :key="x">{{ x }}</i></span>
      <span class="t-go"><template v-if="done.includes(m.to)"><Check :size="16" /> Completado</template><template v-else>Entrar <ArrowRight :size="16" /></template></span>
      <span v-if="i < 3" class="t-viz" aria-hidden="true">
        <svg v-if="i === 0" viewBox="0 0 100 100"><g v-for="(c, k) in WHEEL" :key="k"><path :d="`M50 50 L${50 + 48 * Math.cos((k * 30 - 90) * Math.PI / 180)} ${50 + 48 * Math.sin((k * 30 - 90) * Math.PI / 180)} A48 48 0 0 1 ${50 + 48 * Math.cos(((k + 1) * 30 - 90) * Math.PI / 180)} ${50 + 48 * Math.sin(((k + 1) * 30 - 90) * Math.PI / 180)}Z`" :fill="c[1]" /></g><circle cx="50" cy="50" r="20" fill="var(--panel)" /></svg>
        <svg v-else-if="i === 1" viewBox="0 0 100 100"><rect x="4" y="12" width="92" height="76" rx="6" fill="none" stroke="var(--tc)" stroke-width="2" /><path d="M34 12V88M66 12V88M4 38V38M4 38H96M4 62H96" stroke="var(--tc)" stroke-width="1.5" stroke-dasharray="4 4" /><circle cx="66" cy="38" r="9" fill="var(--tc)" /></svg>
        <svg v-else viewBox="0 0 100 100"><circle cx="30" cy="40" r="22" fill="#2a52be" /><circle cx="60" cy="36" r="18" fill="#f5c518" /><circle cx="48" cy="66" r="20" fill="#d7263d" /><circle cx="76" cy="66" r="12" fill="#1d6b52" /></svg>
      </span>
    </NuxtLink>
  </div>
</template>
