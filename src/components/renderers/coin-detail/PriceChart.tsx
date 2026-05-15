import { Line, Area, AreaChart, ResponsiveContainer, YAxis } from "recharts"

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
        <AreaChart data={points} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <defs>
            <linearGradient id="price-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.15} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="p"
            fill="url(#price-gradient)"
            stroke="none"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="p"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
