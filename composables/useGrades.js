// Notas del estudiante (escala 0 a 5). Se guarda la mejor nota de cada actividad.
export const useGrades = () => {
  const g = useState('ova-grades', () => ({}))
  const load = () => { try { g.value = JSON.parse(localStorage.getItem('ova-grades') || '{}') } catch {} }
  const set = (k, v) => {
    const n = Math.round(v * 10) / 10
    g.value = { ...g.value, [k]: Math.max(g.value[k] ?? 0, n) }
    localStorage.setItem('ova-grades', JSON.stringify(g.value))
  }
  const avg = computed(() => {
    const a = Object.values(g.value)
    return a.length ? Math.round(a.reduce((x, y) => x + y) / a.length * 10) / 10 : null
  })
  return { g, load, set, avg }
}
