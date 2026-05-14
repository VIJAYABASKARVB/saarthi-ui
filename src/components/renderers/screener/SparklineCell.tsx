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
  const color = last > first ? "var(--green)" : "var(--red)"

  return (
    <div className="flex items-center py-2">
      <ResponsiveContainer width={80} height={32}>
        <LineChart data={points} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
          <defs>
            <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" fill={`url(#grad-${color})`} stroke="none" />
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
