'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './MetricsBlock.module.css'

type Metric = {
  label: string
  value: number | null
  note?: string
}

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()

          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }

          // Respect reduced motion
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(target)
          } else {
            requestAnimationFrame(animate)
          }
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}</span>
}

export function MetricsBlock({ metrics }: { metrics: Metric[] }) {
  return (
    <div className={styles.grid}>
      {metrics.map((metric) => (
        <div key={metric.label} className={styles.metric}>
          <span className={styles.value}>
            {metric.value !== null ? (
              <CountUp target={metric.value} />
            ) : (
              '—'
            )}
          </span>
          <span className={styles.label}>{metric.label}</span>
          {metric.note && <span className={styles.note}>{metric.note}</span>}
        </div>
      ))}
    </div>
  )
}
