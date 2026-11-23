<script setup>
// Duelo de armonías: juego por rondas con vidas, racha y multiplicador. Termina con nota 0-5.
import { Heart, Flame, Trophy, Play, RotateCcw } from 'lucide-vue-next'
const { set } = useGrades()
const TOTAL = 8
const K = {
  comp: { q: n => `Toca el color complementario de ${n}`, need: 1, off: [6], why: 'Los complementarios están frente a frente (180°) y se potencian entre sí.' },
  ana: { q: n => `Toca los 2 colores análogos de ${n}`, need: 2, off: [-1, 1], why: 'Los análogos son los vecinos inmediatos: forman una armonía suave.' },
  tri: { q: n => `Completa la tríada de ${n} (toca 2 colores)`, need: 2, off: [4, 8], why: 'La tríada reparte tres colores a 120° (cada 4 casillas del círculo).' },
  split: { q: n => `Toca los 2 complementarios divididos de ${n}`, need: 2, off: [5, 7], why: 'Son los dos vecinos del complementario: contraste con menos tensión.' }
}
const ORDER = ['comp', 'ana', 'comp', 'tri', 'split', 'ana', 'tri', 'split']
const st = reactive({ phase: 'intro', r: 0, base: 0, kind: 'comp', sel: [], res: null, lives: 3, streak: 0, pts: 0, ok: 0, best: 0, gain: 0, bases: [] })
const k = computed(() => K[st.kind])
const target = computed(() => k.value.off.map(o => (st.base + o + 12) % 12))
const mult = computed(() => Math.min(3, 1 + Math.floor(st.streak / 2)))
const nota = computed(() => +(st.ok / TOTAL * 5).toFixed(1))
const mood = computed(() => st.phase === 'end' ? (st.ok >= 6 ? 'perro' : 'dormido') : st.res === 'no' ? 'gris' : st.streak >= 2 ? 'perro' : 'bostezo')
const p = (a, q) => `${(160 + q * Math.cos(a)).toFixed(1)} ${(160 + q * Math.sin(a)).toFixed(1)}`
const arc = i => { const a0 = (i * 30 - 105) * Math.PI / 180, a1 = ((i + 1) * 30 - 105) * Math.PI / 180; return `M${p(a0, 150)}A150 150 0 0 1 ${p(a1, 150)}L${p(a1, 62)}A62 62 0 0 0 ${p(a0, 62)}Z` }
const setRound = () => { st.kind = ORDER[st.r]; st.base = st.bases[st.r]; st.sel = []; st.res = null }
const start = () => {
  const b = []; while (b.length < TOTAL) { const x = Math.floor(Math.random() * 12); if (x !== b[b.length - 1]) b.push(x) }
  Object.assign(st, { phase: 'play', r: 0, lives: 3, streak: 0, pts: 0, ok: 0, bases: b })
  setRound()
}
const pick = i => {
  if (st.res || i === st.base) return
  st.sel = st.sel.includes(i) ? st.sel.filter(x => x !== i) : [...st.sel, i]
  if (st.sel.length < k.value.need) return
  const good = st.sel.every(x => target.value.includes(x))
  st.res = good ? 'ok' : 'no'
  if (good) { st.gain = 100 * mult.value; st.pts += st.gain; st.ok++; st.streak++ } else { st.lives--; st.streak = 0 }
}
const next = () => {
  if (st.lives === 0 || st.r + 1 >= TOTAL) {
    st.phase = 'end'; st.best = Math.max(st.best, st.pts); set('armonia', nota.value)
    localStorage.setItem('ova-harmony-best', st.best); return
  }
  st.r++; setRound()
}
const cls = i => {
  if (i === st.base) return 'base'
  if (st.res) return target.value.includes(i) ? 'good' : st.sel.includes(i) ? 'bad' : 'dim'
  return st.sel.includes(i) ? 'sel' : ''
}
onMounted(() => { st.best = +localStorage.getItem('ova-harmony-best') || 0 })
</script>
<template>
  <section class="card game">
    <div class="game-h"><h3>Duelo de armonías</h3><span class="mut">Récord: {{ st.best }} pts</span></div>
    <div v-if="st.phase === 'intro'" class="game-intro">
      <Panzon name="bostezo" :size="110" />
      <div>
        <p>8 rondas, 3 vidas. Te digo un color y una armonía; tú tocas en el círculo los colores correctos. Acertar seguido enciende la <b>racha</b> y multiplica tus puntos (hasta ×3).</p>
        <button class="btn" @click="start"><Play :size="16" /> Jugar</button>
      </div>
    </div>
    <template v-else-if="st.phase === 'play'">
      <div class="hud" aria-live="off">
        <span class="hearts" :aria-label="`${st.lives} vidas`"><Heart v-for="n in 3" :key="n" :size="20" :class="{ lost: n > st.lives }" /></span>
        <span class="chip"><Flame :size="16" /> Racha ×{{ mult }}</span>
        <span class="chip">Ronda {{ st.r + 1 }}/{{ TOTAL }}</span>
        <b class="score">{{ st.pts }} pts</b>
      </div>
      <div class="tm"><i :style="{ width: st.r / TOTAL * 100 + '%' }" /></div>
      <div class="wheelbox" style="margin-top:1rem">
        <svg viewBox="0 0 320 320" class="wheel" role="group" aria-label="Círculo cromático del juego">
          <path v-for="(c, i) in WHEEL" :key="c[0]" :d="arc(i)" :fill="c[1]" :class="['w', cls(i)]" tabindex="0" role="button" :aria-label="c[0] + (i === st.base ? ' (color base)' : '')" :aria-pressed="st.sel.includes(i)" @click="pick(i)" @keydown.enter.prevent="pick(i)" @keydown.space.prevent="pick(i)" />
          <circle cx="160" cy="160" r="52" :fill="WHEEL[st.base][1]" />
        </svg>
        <div aria-live="polite">
          <Panzon :name="mood" :size="84" />
          <h3 style="margin-top:.5rem">{{ k.q(WHEEL[st.base][0]) }}</h3>
          <p class="mut">Elegidos: {{ st.sel.length }} de {{ k.need }}</p>
          <div v-if="st.res" :class="['fb', st.res]">
            <b>{{ st.res === 'ok' ? `¡Correcto! +${st.gain} pts` : 'Casi. Mira los bordes verdes del círculo.' }}</b>
            <p style="margin:.3rem 0 0">{{ k.why }} Aquí: {{ target.map(t => WHEEL[t][0]).join(' y ') }}.</p>
            <button class="btn" @click="next">{{ st.lives === 0 || st.r + 1 >= TOTAL ? 'Ver resultado' : 'Siguiente ronda' }}</button>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="game-intro" aria-live="polite">
      <Panzon :name="mood" :size="130" />
      <div>
        <h3><Trophy :size="20" style="vertical-align:-3px" /> {{ st.ok >= 6 ? '¡Cazador de armonías!' : 'Buen intento' }}</h3>
        <p>Acertaste <b>{{ st.ok }}</b> de {{ TOTAL }} rondas y sumaste <b>{{ st.pts }}</b> puntos. Tu nota: <b>{{ nota.toFixed(1) }} / 5</b> (se guarda la mejor).</p>
        <button class="btn" @click="start"><RotateCcw :size="16" /> Jugar de nuevo</button>
      </div>
    </div>
  </section>
</template>
