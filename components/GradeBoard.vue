<script setup>
// Boletín de notas con medallas
const { g, avg } = useGrades()
const rows = [['color', 'Mezcla de colores', '/modulo-1'], ['armonia', 'Duelo de armonías', '/modulo-1'], ['tercios', 'Lienzo de tercios', '/modulo-2'], ['quiz', 'Quiz Master Croma', '/evaluacion'], ['rubrica', 'Autoevaluación', '/evaluacion']]
const badges = computed(() => [['Alquimista del color', (g.value.color || 0) >= 4], ['Cazador de armonías', (g.value.armonia || 0) >= 4], ['Ojo de artista', (g.value.tercios || 0) >= 4], ['Mente cromática', (g.value.quiz || 0) >= 4], ['Autocrítica sincera', g.value.rubrica !== undefined]])
const msg = computed(() => avg.value === null ? 'Completa las actividades para ver tu nota.' : avg.value >= 4.5 ? '¡Sobresaliente! Eres un artista del color.' : avg.value >= 4 ? '¡Muy bien! Casi perfecto.' : avg.value >= 3 ? 'Aprobado. Repasa los módulos y mejora tu nota.' : 'Sigue practicando: puedes repetir cualquier actividad.')
</script>
<template>
  <section class="card">
    <h3>Boletín de notas</h3>
    <p class="mut">Se guarda tu mejor nota de cada actividad (escala de 0 a 5).</p>
    <ul class="gl">
      <li v-for="r in rows" :key="r[0]"><NuxtLink :to="r[2]">{{ r[1] }}</NuxtLink><b>{{ g[r[0]] !== undefined ? g[r[0]].toFixed(1) + ' / 5' : 'Pendiente' }}</b><span class="tm"><i :style="{ width: (g[r[0]] || 0) / 5 * 100 + '%' }" /></span></li>
    </ul>
    <p><b>Nota final: {{ avg === null ? '—' : avg.toFixed(1) + ' / 5' }}</b> ({{ Object.keys(g).length }} de 5 actividades) · {{ msg }}</p>
    <div class="row chips"><span v-for="b in badges" :key="b[0]">{{ b[1] ? 'Obtenida' : 'Bloqueada' }}: {{ b[0] }}</span></div>
  </section>
</template>
