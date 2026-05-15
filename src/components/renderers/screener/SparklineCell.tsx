import { LineChart, Line, Area, ResponsiveContainer } from "recharts"

interface SparklineCellProps {
  data: number[]
}

export default function SparklineCell({ data }: SparklineCellProps) {
  if (!data || data.length < 2) {
    return <span className="text-[var(--text-dim)]">&mdash;</span>
  }

  const points = data.map((v, i) => ({ i, v }))
  const first = data[0]
  const last = data[data.length - 1]
  const isUp = last > first
  const color = isUp ? "var(--green)" : "var(--red)"
  const glowColor = isUp ? "rgba(0, 212, 168, 0.4)" : "rgba(255, 107, 107, 0.4)"

  return (
    <div className="flex items-center py-2" style={{ filter: `drop-shadow(0 0 4px ${glowColor})` }}>
      <ResponsiveContainer width={80} height={32}>
        <LineChart data={points} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
          <defs>
            <linearGradient id={`spark-grad-${isUp ? "up" : "down"}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.15} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" fill={`url(#spark-grad-${isUp ? "up" : "down"})`} stroke="none" />
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
