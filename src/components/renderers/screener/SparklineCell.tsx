import { LineChart, Line, ResponsiveContainer } from "recharts"

interface SparklineCellProps {
  data: number[]
}

export default function SparklineCell({ data }: SparklineCellProps) {
  if (!data || data.length < 2) {
    return <span className="screener-cell--dim">&mdash;</span>
  }

  const points = data.map((v, i) => ({ i, v }))
  const first = data[0]
  const last = data[data.length - 1]
  const color = last > first ? "var(--green)" : "var(--red)"

  return (
    <div className="screener-sparkline">
      <ResponsiveContainer width={80} height={24}>
        <LineChart data={points}>
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
