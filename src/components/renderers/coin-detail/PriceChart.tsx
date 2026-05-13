import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts"

interface PriceChartProps {
  data: Array<{ t: string; price: number }>
}

export default function PriceChart({ data }: PriceChartProps) {
  if (!data || data.length < 2) {
    return <div className="coin-detail__chart-empty">&mdash;</div>
  }

  const points = data.map(d => ({ t: d.t, p: d.price }))
  const first = data[0].price
  const last = data[data.length - 1].price
  const color = last >= first ? "var(--green)" : "var(--red)"

  return (
    <div className="coin-detail__chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Line
            type="monotone"
            dataKey="p"
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
