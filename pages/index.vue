<script setup>
import { Trophy, CheckCircle2, ArrowRight, Sparkles } from 'lucide-vue-next'
const { done, pct, keys } = useOva()
const { avg, g } = useGrades()
const mood = useState('ova-mood', () => null)
const R = 34, C = 2 * Math.PI * R
const nextKey = computed(() => keys.find(k => !done.value.includes(k)))
const nextMod = computed(() => modules.find(m => m.to === nextKey.value))
const medals = computed(() => [(g.value.color || 0) >= 4, (g.value.tercios || 0) >= 4, (g.value.armonia || 0) >= 4, (g.value.quiz || 0) >= 4, g.value.rubrica !== undefined].filter(Boolean).length)
const goals = [
  'Clasificar los colores (primarios, secundarios, terciarios) y combinarlos en armonías: complementarios, análogos y tríadas.',
  'Experimentar con simulaciones de mezcla y ver cómo el color cambia la emoción de una obra.',
  'Aplicar la regla de tercios, el peso visual y el contraste con lienzos interactivos hechos con componentes Vue 3.'
]
useHead({ title: 'Prisma: universo del color y la composición' })
</script>
<template>
  <div>
    <section class="hero3">
      <svg class="prism" viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06b6d4" /><stop offset=".5" stop-color="#ec4899" /><stop offset="1" stop-color="#eab308" /></linearGradient></defs><polygon points="100,14 186,164 14,164" fill="none" stroke="url(#pg)" stroke-width="3" /><polygon points="100,54 150,142 50,142" fill="url(#pg)" opacity=".25" /><g stroke="url(#pg)" stroke-width="3" stroke-linecap="round"><line x1="0" y1="110" x2="62" y2="110" /><line x1="138" y1="104" x2="200" y2="84" /><line x1="140" y1="112" x2="200" y2="112" /><line x1="138" y1="120" x2="200" y2="140" /></g></svg>
      <div class="h3-t">
        <span class="kick">OVA de Artística · Universidad de Córdoba</span>
        <h1>Prisma: universo del color y la composición</h1>
        <p>Aprende jugando: gira el círculo cromático, mezcla colores, acomoda una escena con la regla de tercios, respira en el rincón de calma y gana tus notas.</p>
        <div class="row"><NuxtLink class="btn" :to="nextMod ? nextMod.to : '/modulo-1'">{{ done.length ? 'Continuar' : 'Comenzar' }} <ArrowRight :size="16" /></NuxtLink><NuxtLink class="btn ghost" to="/evaluacion">Ver mis notas</NuxtLink></div>
        <ArtSupplies />
      </div>
      <Panzon name="bostezo" :size="210" framed cap="Panzón, tu guía" />
    </section>

    <section class="stats" aria-label="Tu avance">
      <div class="stat"><svg viewBox="0 0 80 80" class="ring" aria-hidden="true"><circle cx="40" cy="40" :r="R" fill="none" stroke="var(--line)" stroke-width="8" /><circle cx="40" cy="40" :r="R" fill="none" stroke="var(--ye)" stroke-width="8" stroke-linecap="round" :stroke-dasharray="C" :stroke-dashoffset="C * (1 - pct / 100)" transform="rotate(-90 40 40)" /></svg><div><b>{{ pct }}%</b><small>del recorrido</small></div></div>
      <div class="stat"><CheckCircle2 :size="34" color="#22c55e" /><div><b>{{ keys.filter(k => done.includes(k)).length }} / {{ keys.length }}</b><small>secciones completas</small></div></div>
      <div class="stat"><Trophy :size="34" color="#eab308" /><div><b>{{ avg === null ? '—' : avg.toFixed(1) }}</b><small>nota promedio (0 a 5)</small></div></div>
      <div class="stat"><Sparkles :size="34" color="#ec4899" /><div><b>{{ medals }} / 5</b><small>medallas ganadas</small></div></div>
    </section>

    <NuxtLink v-if="nextMod" :to="nextMod.to" class="next" :style="{ '--tc': nextMod.c }"><span><small>Tu siguiente paso</small><b>{{ nextMod.t }}</b></span><ArrowRight :size="20" /></NuxtLink>

    <h2>Tablero de contenidos</h2>
    <p class="mut" style="margin-top:-.3rem">Toca una tarjeta para entrar. Puedes ir en el orden que quieras, pero la ruta sugerida es de izquierda a derecha y de arriba abajo.</p>
    <OvaBoard />

    <h2 style="margin-top:2rem">Lo que vas a aprender</h2>
    <div class="grid"><div v-for="(x, i) in goals" :key="x" class="card goal" style="margin:0"><b class="n">{{ i + 1 }}</b><p style="margin:0">{{ x }}</p></div></div>
  </div>
</template>
