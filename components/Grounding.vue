<script setup>
// Técnica 5-4-3-2-1: anclarse al presente usando los sentidos
import { Eye, Hand, Ear, Flower2, Coffee, ArrowRight, RotateCcw } from 'lucide-vue-next'
const steps = [
  { n: 5, i: Eye, t: 'Mira', q: 'Nombra 5 cosas que ves. Fíjate en su color.', ph: 'Ej.: una pared verde menta' },
  { n: 4, i: Hand, t: 'Toca', q: 'Nombra 4 cosas que puedes tocar.', ph: 'Ej.: la tela de mi camiseta' },
  { n: 3, i: Ear, t: 'Escucha', q: 'Nombra 3 sonidos a tu alrededor.', ph: 'Ej.: un ventilador' },
  { n: 2, i: Flower2, t: 'Huele', q: 'Nombra 2 olores (o 2 que te gustan).', ph: 'Ej.: café' },
  { n: 1, i: Coffee, t: 'Saborea', q: 'Nombra 1 sabor que tengas o recuerdes.', ph: 'Ej.: mango biche' }
]
const ans = reactive(steps.map(s => Array(s.n).fill('')))
const cur = ref(0)
const done = computed(() => cur.value >= steps.length)
const filled = computed(() => ans[cur.value]?.filter(x => x.trim()).length || 0)
const reset = () => { ans.forEach(a => a.fill('')); cur.value = 0 }
</script>
<template>
  <section class="card">
    <h3>5-4-3-2-1: vuelve al presente</h3>
    <p class="mut">Cuando la cabeza va muy rápido, los sentidos te devuelven al aquí y ahora. Responde con calma, sin prisa.</p>
    <ol class="gsteps" aria-label="Progreso">
      <li v-for="(s, i) in steps" :key="s.t" :class="{ on: i === cur, ok: i < cur }"><component :is="s.i" :size="18" /><b>{{ s.n }}</b></li>
    </ol>
    <div v-if="!done" class="gbox" aria-live="polite">
      <h4>{{ steps[cur].t }}: {{ steps[cur].n }}</h4>
      <p>{{ steps[cur].q }}</p>
      <input v-for="(_, j) in ans[cur]" :key="cur + '-' + j" v-model="ans[cur][j]" class="inp" type="text" :placeholder="steps[cur].ph" :aria-label="`${steps[cur].t} ${j + 1} de ${steps[cur].n}`">
      <div class="row"><button class="btn" :disabled="!filled" @click="cur++">{{ cur === steps.length - 1 ? 'Terminar' : 'Siguiente' }} <ArrowRight :size="16" /></button><span class="mut">{{ filled }} de {{ steps[cur].n }}</span></div>
    </div>
    <div v-else class="row" style="flex-wrap:nowrap" aria-live="polite">
      <Panzon name="dormido" :size="120" />
      <div><h4>Lo lograste</h4><p>Usaste tus cinco sentidos para volver al presente. Puedes repetir este ejercicio cuando lo necesites: en clase, antes de una prueba o al terminar el día.</p><button class="btn ghost" @click="reset"><RotateCcw :size="16" /> Repetir</button></div>
    </div>
  </section>
</template>
