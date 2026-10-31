export const modules = [
  { to: '/', t: 'Inicio', c: '#06b6d4', d: '' },
  { to: '/modulo-1', t: 'Módulo 1: Naturaleza del color', c: '#06b6d4', d: 'Círculo cromático, armonías y temperatura del color.' },
  { to: '/modulo-2', t: 'Módulo 2: Composición', c: '#ec4899', d: 'Peso visual, equilibrio y ley de los tercios.' },
  { to: '/modulo-3', t: 'Módulo 3: Galería y laboratorio', c: '#eab308', d: 'Analiza obras famosas y cambia su emoción con el color.' },
  { to: '/evaluacion', t: 'Evaluación', c: '#06b6d4', d: 'Quiz Master Croma y autoevaluación.' },
  { to: '/recursos', t: 'Recursos', c: '#ec4899', d: 'Museos, generadores de paletas y repositorio.' }
]
const keys = ['/modulo-1', '/modulo-2', '/modulo-3', '/evaluacion']

export const useOva = () => {
  const done = useState('ova-done', () => [])
  const load = () => { try { done.value = JSON.parse(localStorage.getItem('ova-done') || '[]') } catch {} }
  const toggle = p => {
    done.value = done.value.includes(p) ? done.value.filter(x => x !== p) : [...done.value, p]
    localStorage.setItem('ova-done', JSON.stringify(done.value))
  }
  const pct = computed(() => Math.round(keys.filter(k => done.value.includes(k)).length / keys.length * 100))
  return { done, load, toggle, pct, keys }
}
