export const modules = [
  { to: '/', t: 'Inicio', c: '#06b6d4', d: '', g: '' },
  { to: '/modulo-1', t: 'Módulo 1: Naturaleza del color', c: '#06b6d4', d: 'Círculo cromático, armonías, valor y el duelo de armonías.', g: 'Contenido' },
  { to: '/modulo-2', t: 'Módulo 2: Composición', c: '#ec4899', d: 'Peso visual, equilibrio y ley de los tercios.', g: 'Contenido' },
  { to: '/modulo-3', t: 'Módulo 3: Galería y laboratorio', c: '#eab308', d: 'Analiza obras famosas y cambia su emoción con el color.', g: 'Contenido' },
  { to: '/laboratorio', t: 'Taller de imagen y dibujo', c: '#eab308', d: 'Edita una foto, estudia el valor y dibuja con lápices.', g: 'Actividad' },
  { to: '/accesibilidad', t: 'Color para todos', c: '#06b6d4', d: 'Cómo ven otras personas y qué contraste necesitas.', g: 'Actividad' },
  { to: '/calma', t: 'Rincón de calma', c: '#ec4899', d: 'Color del día, respiración, mandala y ejercicio de sentidos.', g: 'Actividad' },
  { to: '/evaluacion', t: 'Evaluación', c: '#06b6d4', d: 'Quiz, autoevaluación y boletín de notas.', g: '' },
  { to: '/recursos', t: 'Recursos', c: '#ec4899', d: 'Museos, generadores de paletas y repositorio.', g: '' },
  { to: '/creditos', t: 'Créditos', c: '#eab308', d: 'Gracias por llegar hasta aquí.', g: '' }
]
const keys = ['/modulo-1', '/modulo-2', '/modulo-3', '/laboratorio', '/accesibilidad', '/calma', '/evaluacion']

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
