import type { Constellation, Star } from './constellationTypes'

export function hashId(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function chainStars(id: string, n: number): Star[] {
  const h = hashId(id)
  const stars: Star[] = []
  for (let i = 0; i < n; i++) {
    const t = n <= 1 ? 0.5 : i / (n - 1)
    const wobble = 0.1 * Math.sin(((h + i * 31) % 360) * (Math.PI / 180))
    const x = 0.12 + 0.76 * t + wobble * 0.6
    const y =
      0.18 +
      0.64 * (0.35 + 0.65 * Math.sin(t * Math.PI * 0.9 + (h % 11) * 0.2)) +
      0.06 * Math.sin(i * 1.7 + h * 0.01)
    stars.push({
      x: Math.min(0.92, Math.max(0.08, x)),
      y: Math.min(0.92, Math.max(0.08, y)),
    })
  }
  return stars
}

export function chainConstellation(
  meta: Pick<Constellation, 'id' | 'nameRu' | 'nameLat' | 'fact'>,
  nStars: number,
  labelIndex?: number,
  labelText?: string,
): Constellation {
  const stars = chainStars(meta.id, nStars)
  if (labelIndex !== undefined && labelText && stars[labelIndex]) {
    stars[labelIndex] = { ...stars[labelIndex], label: labelText }
  }
  const edges: [number, number][] = []
  for (let i = 0; i < stars.length - 1; i++) edges.push([i, i + 1])
  const connectOrder = stars.map((_, i) => i)
  return { ...meta, stars, edges, connectOrder }
}
