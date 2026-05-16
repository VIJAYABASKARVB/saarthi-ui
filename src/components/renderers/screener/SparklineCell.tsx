interface SparklineCellProps {
  data: number[]
}

function buildSparklinePath(data: number[], width: number, height: number): string {
  if (!data || data.length < 2) return ""
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)
  return data
    .map((v, i) => {
      const x = i * stepX
      const y = height - ((v - min) / range) * height
      return (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1)
    })
    .join(" ")
}

function buildSparklineArea(data: number[], width: number, height: number): string {
  if (!data || data.length < 2) return ""
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)
  const points = data.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * height
    return x.toFixed(1) + "," + y.toFixed(1)
  })
  return "M" + points[0] + "L" + points.slice(1).join("L") + "L" + width.toFixed(1) + "," + height.toFixed(1) + "L0," + height.toFixed(1) + "Z"
}

export default function SparklineCell({ data }: SparklineCellProps) {
  if (!data || data.length < 2) {
    return <span className="text-[var(--text-dim)]">-</span>
  }

  const W = 80
  const H = 32
  const first = data[0]
  const last = data[data.length - 1]
  const isUp = last > first
  const color = isUp ? "var(--green)" : "var(--red)"

  return (
    <div className="flex items-center py-2">
      <svg width={W} height={H} viewBox={"0 0 " + W + " " + H} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter id={"spark-glow-" + (isUp ? "up" : "down")}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
            <feFlood floodColor={isUp ? "#22c55e" : "#ff6b6b"} floodOpacity="0.3" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={buildSparklineArea(data, W, H)}
          fill={color}
          fillOpacity="0.08"
        />
        <path
          d={buildSparklinePath(data, W, H)}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={"url(#spark-glow-" + (isUp ? "up" : "down") + ")"}
        />
      </svg>
    </div>
  )
}
