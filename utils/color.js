// Conversión y comparación de colores (auto-importado por Nuxt)
export const hsl2hex = (h, s, l) => {
  s /= 100; l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}
export const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
export const similarity = (a, b) => {
  const [p, q] = [rgb(a), rgb(b)]
  return Math.max(0, Math.round(100 - Math.hypot(...p.map((v, i) => v - q[i])) / 441.7 * 250))
}

// Círculo cromático RYB de 12 colores (compartido por ColorWheel y HarmonyGame)
export const WHEEL = [
  ['Amarillo', '#f7d117', 'Primario', 'cálido'], ['Amarillo anaranjado', '#f5a623', 'Terciario', 'cálido'],
  ['Naranja', '#f2711c', 'Secundario', 'cálido'], ['Rojo anaranjado', '#e8412c', 'Terciario', 'cálido'],
  ['Rojo', '#d7263d', 'Primario', 'cálido'], ['Rojo violáceo', '#a8326f', 'Terciario', 'templado'],
  ['Violeta', '#6f3bb0', 'Secundario', 'frío'], ['Azul violáceo', '#4a4fc4', 'Terciario', 'frío'],
  ['Azul', '#2563eb', 'Primario', 'frío'], ['Azul verdoso', '#0e9aa7', 'Terciario', 'frío'],
  ['Verde', '#2f9e44', 'Secundario', 'frío'], ['Amarillo verdoso', '#9ccc2a', 'Terciario', 'templado']
]
// Estados de ánimo del Rincón de calma: [nombre, color, emoción, consejo, Panzón]
export const MOODS = [
  ['Rojo', '#ef4444', 'Energía', 'Tienes fuerza hoy. Úsala para terminar algo que te importe.', 'bostezo'],
  ['Naranja', '#f97316', 'Entusiasmo', 'Hay ganas de hacer cosas. Empieza por la más pequeña.', 'gris'],
  ['Amarillo', '#eab308', 'Alegría', 'Comparte una idea o una sonrisa; se contagia.', 'bostezo'],
  ['Verde', '#22c55e', 'Calma', 'Todo va a su ritmo. Tómate un descanso corto sin culpa.', 'dormido'],
  ['Azul', '#3b82f6', 'Tranquilidad', 'Buen momento para concentrarte y estudiar en silencio.', 'dormido'],
  ['Violeta', '#8b5cf6', 'Creatividad', 'Tu cabeza está llena de ideas. Anótalas o dibújalas.', 'gris']
]
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
