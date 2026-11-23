export const panAlt = {
  gris: 'Cachorro gris azulado asomándose por el borde de su cuna',
  dormido: 'Cachorro blanco y panzón durmiendo boca arriba',
  bostezo: 'Cachorro blanco bostezando sobre una mano',
  nube: 'Cachorro blanco y panzón dormido, recortado',
  perro: 'Perro con lentes gruesos y un lápiz en la boca'
}
export const contrast = (a, b) => {
  const L = h => { const [r, g, k] = rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }); return 0.2126 * r + 0.7152 * g + 0.0722 * k }
  const [x, y] = [L(a), L(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
