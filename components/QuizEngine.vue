<script setup>
// <QuizEngine /> · quiz con temporizador, retroalimentación y puntaje persistente
const Q = [
  { q: '¿Cuáles son los colores primarios en el modelo RYB?', o: ['Rojo, amarillo y azul', 'Verde, naranja y violeta', 'Cian, magenta y amarillo'], a: 0, w: 'En RYB (pintura tradicional) los primarios son rojo, amarillo y azul.' },
  { q: '¿Cuál es el complementario del azul en el círculo RYB?', o: ['Verde', 'Naranja', 'Violeta'], a: 1, w: 'Los complementarios se oponen en el círculo: azul frente a naranja.' },
  { q: '¿Cuál de estos grupos son colores cálidos?', o: ['Azul, verde y violeta', 'Rojo, naranja y amarillo', 'Gris, blanco y negro'], a: 1, w: 'Rojo, naranja y amarillo evocan calor y energía.' },
  { q: 'La ley de los tercios divide la imagen en…', o: ['4 partes', '9 partes con 4 puntos de oro', '3 franjas verticales'], a: 1, w: 'Dos líneas verticales y dos horizontales crean 9 zonas y 4 puntos de interés.' },
  { q: 'La mezcla aditiva (RGB) trabaja con…', o: ['Pigmentos', 'Luz', 'Tinta'], a: 1, w: 'En la mezcla aditiva se suman luces; R+G+B produce blanco.' },
  { q: 'Una tríada armónica usa colores separados por…', o: ['30°', '180°', '120°'], a: 2, w: 'Tres colores equidistantes (120°) forman una tríada.' }
]
const T = 20
const { set } = useGrades()
const st = reactive({ i: 0, sel: null, pts: 0, t: T, over: false, best: 0, ok: 0 })
let timer
const start = () => { clearInterval(timer); timer = setInterval(() => { if (--st.t <= 0) pick(-1) }, 1000) }
const pick = k => {
  if (st.sel !== null) return
  st.sel = k; clearInterval(timer)
  if (k === Q[st.i].a) { st.pts += 100 + st.t * 5; st.ok++ }
}
const next = () => {
  if (st.i + 1 >= Q.length) {
    st.over = true; st.best = Math.max(st.best, st.pts); set('quiz', st.ok / Q.length * 5)
    localStorage.setItem('ova-best', st.best); return
  }
  st.i++; st.sel = null; st.t = T; start()
}
const reset = () => { Object.assign(st, { i: 0, sel: null, pts: 0, t: T, over: false, ok: 0 }); start() }
onMounted(() => { st.best = +localStorage.getItem('ova-best') || 0; start() })
onBeforeUnmount(() => clearInterval(timer))
const cls = k => st.sel === null ? '' : k === Q[st.i].a ? 'ok' : k === st.sel ? 'no' : ''
</script>

<template>
  <section class="card">
    <h3>Quiz Master Croma</h3>
    <template v-if="!st.over">
      <p class="mut">Pregunta {{ st.i + 1 }} de {{ Q.length }} · Puntos: {{ st.pts }} · Mejor: {{ st.best }}</p>
      <div class="tm" aria-hidden="true"><i :style="{ width: st.t / T * 100 + '%' }" /></div>
      <p><b>{{ Q[st.i].q }}</b> ({{ st.t }} s)</p>
      <button v-for="(o, k) in Q[st.i].o" :key="o" class="opt" :class="cls(k)" :disabled="st.sel !== null" @click="pick(k)">{{ o }}</button>
      <template v-if="st.sel !== null">
        <p><b>{{ st.sel === Q[st.i].a ? '¡Correcto!' : st.sel === -1 ? 'Se acabó el tiempo.' : 'Casi.' }}</b> {{ Q[st.i].w }}</p>
        <Panzon :name="st.sel === Q[st.i].a ? 'bostezo' : 'dormido'" :size="90" /><br><button class="btn" @click="next">{{ st.i + 1 >= Q.length ? 'Ver resultado' : 'Siguiente' }}</button>
      </template>
    </template>
    <template v-else>
      <p><b>Nota obtenida: {{ (st.ok / Q.length * 5).toFixed(1) }} / 5</b> · Aciertos: {{ st.ok }} de {{ Q.length }} · Puntos: {{ st.pts }} · Mejor marca: {{ st.best }}.</p>
      <button class="btn" @click="reset">Intentar de nuevo</button>
    </template>
  </section>
</template>
