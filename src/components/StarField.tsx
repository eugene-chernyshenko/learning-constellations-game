import { useId } from 'react'
import type { Constellation } from '../data/constellations'
import styles from './StarField.module.css'

const PAD = 8
const VB = 100

function starXY(x: number, y: number) {
  const span = VB - 2 * PAD
  return { cx: PAD + x * span, cy: PAD + y * span }
}

export type StarFieldProps = {
  constellation: Constellation
  /** learn: сколько первых рёбер показать */
  learnVisibleEdges?: number
  /** connect: сколько звёзд уже нажато по порядку */
  connectProgress?: number
  /** подсветка следующей звезды (индекс в массиве stars) */
  hintStarIndex?: number | null
  /** выбранная звезда — показать подпись */
  selectedStar?: number | null
  onStarClick?: (starIndex: number) => void
  /** угадать: без подписей у звёзд */
  hideStarLabels?: boolean
  /** карточка превью */
  compact?: boolean
  /** всегда рисовать все рёбра (режим угадать / превью) */
  showAllEdges?: boolean
  className?: string
}

export function StarField({
  constellation,
  learnVisibleEdges = 0,
  connectProgress = 0,
  hintStarIndex = null,
  selectedStar = null,
  onStarClick,
  hideStarLabels = false,
  compact = false,
  showAllEdges = false,
  className,
}: StarFieldProps) {
  const filterId = useId().replace(/:/g, '')
  const { stars, edges, connectOrder } = constellation

  const edgeSet = new Set(edges.map(([a, b]) => (a < b ? `${a}-${b}` : `${b}-${a}`)))

  function hasEdge(i: number, j: number): boolean {
    return edgeSet.has(i < j ? `${i}-${j}` : `${j}-${i}`)
  }

  const linesToDraw: [number, number][] = []

  if (showAllEdges) {
    linesToDraw.push(...edges)
  } else if (connectProgress > 1) {
    for (let s = 0; s < connectProgress - 1; s++) {
      const a = connectOrder[s]
      const b = connectOrder[s + 1]
      if (hasEdge(a, b)) linesToDraw.push([a, b])
    }
  } else {
    const n = Math.min(learnVisibleEdges, edges.length)
    for (let e = 0; e < n; e++) linesToDraw.push(edges[e])
  }

  const svgClass = compact
    ? `${styles.svg} ${styles.svgCompact}`
    : styles.svg

  return (
    <svg
      className={`${svgClass} ${className ?? ''}`}
      viewBox={`0 0 ${VB} ${VB}`}
      role="img"
      aria-label={constellation.nameRu}
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {linesToDraw.map(([from, to], idx) => {
        const p1 = starXY(stars[from].x, stars[from].y)
        const p2 = starXY(stars[to].x, stars[to].y)
        return (
          <line
            key={`${from}-${to}-${idx}`}
            x1={p1.cx}
            y1={p1.cy}
            x2={p2.cx}
            y2={p2.cy}
            className={styles.line}
          />
        )
      })}

      {stars.map((star, i) => {
        const { cx, cy } = starXY(star.x, star.y)
        const isHint = hintStarIndex === i
        const isSel = selectedStar === i
        const label = star.label && !hideStarLabels ? star.label : null
        const r = compact ? 3.2 : isHint ? 5.5 : 4.2
        const interactive = Boolean(onStarClick)

        return (
          <g key={i}>
            {isHint && !compact && (
              <circle
                cx={cx}
                cy={cy}
                r={r + 6}
                className={styles.hintRing}
              />
            )}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              className={`${styles.star} ${isSel ? styles.starSelected : ''} ${isHint ? styles.starHint : ''}`}
              filter={compact ? undefined : `url(#${filterId})`}
              onClick={interactive ? () => onStarClick?.(i) : undefined}
              onKeyDown={
                interactive
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onStarClick?.(i)
                      }
                    }
                  : undefined
              }
              tabIndex={interactive ? 0 : undefined}
              role={interactive ? 'button' : undefined}
              aria-label={label ?? `Звезда ${i + 1}`}
            />
            {isSel && !hideStarLabels && !compact && (
              <text
                x={cx}
                y={cy - r - 5}
                textAnchor="middle"
                className={styles.starLabel}
              >
                {label ?? `Звезда ${i + 1}`}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
