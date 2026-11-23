<script setup>
import { Palette, Wind, Sparkles, Hand } from 'lucide-vue-next'
useHead({ title: 'Rincón de calma · Prisma' })
const mood = useState('ova-mood', () => null)
const tab = ref(0)
const tabs = [['Mi color de hoy', Palette], ['Respira', Wind], ['Mandala', Sparkles], ['5-4-3-2-1', Hand]]
const key = e => {
  if (e.key === 'ArrowRight') tab.value = (tab.value + 1) % tabs.length
  else if (e.key === 'ArrowLeft') tab.value = (tab.value + tabs.length - 1) % tabs.length
  else return
  e.preventDefault(); nextTick(() => document.getElementById('ct-' + tab.value)?.focus())
}
</script>
<template>
  <div>
    <PageHead kicker="Actividad" title="Rincón de calma" />
    <p>Los colores influyen en lo que sentimos (Módulo 3). Aquí tienes cuatro estaciones para hacer una pausa: elegir tu color del día, respirar, dibujar un mandala o volver al presente con tus sentidos. Haz una o todas, a tu ritmo.</p>
    <div class="stage" :style="{ '--mood': mood !== null ? MOODS[mood][1] : '#06b6d4' }">
      <div class="tabs" role="tablist" aria-label="Estaciones de calma" @keydown="key">
        <button v-for="(t, i) in tabs" :id="'ct-' + i" :key="t[0]" role="tab" :aria-selected="tab === i" :tabindex="tab === i ? 0 : -1" :class="{ on: tab === i }" @click="tab = i"><component :is="t[1]" :size="18" /> {{ t[0] }}</button>
      </div>
      <KeepAlive>
        <MoodColor v-if="tab === 0" />
        <Breathing v-else-if="tab === 1" />
        <Mandala v-else-if="tab === 2" />
        <Grounding v-else />
      </KeepAlive>
    </div>
  </div>
</template>
