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
