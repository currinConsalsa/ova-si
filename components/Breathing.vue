<script setup>
// Respiración guiada con 3 ritmos, anillo de progreso y conteo de ciclos. El texto guía por si prefieres no mirar el movimiento.
import { Play, Square } from 'lucide-vue-next'
const pats = [
  { n: 'Caja 4·4·4·4', d: 'Equilibra la mente antes de una prueba.', ph: [['Inhala', 4, 1], ['Sostén', 4, 1], ['Exhala', 4, 0], ['Pausa', 4, 0]] },
  { n: 'Suave 4·6', d: 'Exhalar más largo relaja el cuerpo.', ph: [['Inhala', 4, 1], ['Exhala', 6, 0]] },
  { n: '4·7·8', d: 'Para bajar el ritmo antes de dormir.', ph: [['Inhala', 4, 1], ['Sostén', 7, 1], ['Exhala', 8, 0]] }
]
const GOAL = 5, C = 2 * Math.PI * 96
const sel = ref(0), on = ref(false), pi = ref(0), left = ref(0), cycles = ref(0), fin = ref(false)
let t
const pat = computed(() => pats[sel.value])
const ph = computed(() => pat.value.ph[pi.value])
const scale = computed(() => (!on.value ? .7 : ph.value[2] ? 1.18 : .7))
const stop = () => { clearInterval(t); on.value = false }
const begin = () => {
  stop(); cycles.value = 0; fin.value = false; pi.value = 0; left.value = pat.value.ph[0][1]; on.value = true
  t = setInterval(() => {
    if (--left.value > 0) return
    if (pi.value + 1 >= pat.value.ph.length) { cycles.value++; if (cycles.value >= GOAL) { stop(); fin.value = true; return } pi.value = 0 } else pi.value++
    left.value = pat.value.ph[pi.value][1]
  }, 1000)
}
const choose = i => { sel.value = i; stop(); fin.value = false; cycles.value = 0 }
onBeforeUnmount(stop)
onDeactivated(stop)
</script>
<template>
  <section class="card">
    <h3>Respira con Panzón</h3>
    <p class="mut">Elige un ritmo, pulsa empezar y completa {{ GOAL }} ciclos. Inhala por la nariz, exhala despacio por la boca.</p>
    <div class="row" role="group" aria-label="Ritmo de respiración">
      <button v-for="(q, i) in pats" :key="q.n" class="opt" style="width:auto;margin:0" :class="{ on: sel === i }" :aria-pressed="sel === i" @click="choose(i)">{{ q.n }}</button>
    </div>
    <p class="mut">{{ pat.d }}</p>
    <div class="breath">
      <svg viewBox="0 0 220 220" aria-hidden="true">
        <circle cx="110" cy="110" r="96" fill="none" stroke="var(--line)" stroke-width="6" />
        <circle cx="110" cy="110" r="96" fill="none" stroke="var(--ac)" stroke-width="6" stroke-linecap="round" :stroke-dasharray="C" :stroke-dashoffset="on ? C * (1 - left / ph[1]) : C" transform="rotate(-90 110 110)" style="transition:stroke-dashoffset 1s linear" />
      </svg>
      <div class="orb" :style="{ transform: `scale(${scale})`, transitionDuration: (on ? ph[1] : 1) + 's' }" />
      <div class="orb-t" aria-live="polite"><b>{{ fin ? '¡Muy bien!' : !on ? 'Listo' : ph[0] }}</b><span v-if="on">{{ left }}</span></div>
    </div>
    <div class="dots" :aria-label="`${cycles} de ${GOAL} ciclos`"><i v-for="n in GOAL" :key="n" :class="{ on: n <= cycles }" /></div>
    <div v-if="fin" class="row" style="justify-content:center"><Panzon name="dormido" :size="90" /><p>Completaste {{ GOAL }} ciclos. Nota cómo se siente tu cuerpo ahora.</p></div>
    <div style="text-align:center"><button class="btn" @click="on ? stop() : begin()"><component :is="on ? Square : Play" :size="16" /> {{ on ? 'Detener' : fin ? 'Repetir' : 'Empezar' }}</button></div>
  </section>
</template>
