import { Area, AreaChart, ResponsiveContainer, YAxis, XAxis, CartesianGrid, ReferenceLine } from "recharts"

interface PriceChartProps {
  data: Array<{ t: string; price: number }>
  symbol?: string
  timeframe?: string
}

function formatDate(t: string, timeframe: string): string {
  const d = new Date(t)
  if (timeframe === "1D") return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  if (timeframe === "7D") return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  if (timeframe === "30D") return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
}

function filterByTimeframe(data: Array<{ t: string; price: number }>, timeframe: string): Array<{ t: string; price: number }> {
  if (timeframe === "All") return data
  const lastDate = new Date(data[data.length - 1].t)
  const cutoff = new Date(lastDate)
  if (timeframe === "1D") cutoff.setDate(lastDate.getDate() - 1)
  else if (timeframe === "7D") cutoff.setDate(lastDate.getDate() - 7)
  else if (timeframe === "30D") cutoff.setDate(lastDate.getDate() - 30)
  const filtered = data.filter(d => new Date(d.t) >= cutoff)
  return filtered.length > 0 ? filtered : data
}

export default function PriceChart({ data, symbol, timeframe = "1D" }: PriceChartProps) {
  if (!data || data.length < 2) {
    return <div className="coin-detail__chart-empty">No price data</div>
  }

  const filtered = filterByTimeframe(data, timeframe)
  const points = filtered.map(d => ({ t: d.t, p: d.price }))
  const first = points[0].p
  const last = points[points.length - 1].p
  const trend = last >= first ? "uptrend" : "downtrend"
  const color = last >= first ? "var(--green)" : "var(--red)"

  const tickCount = Math.min(6, points.length)
  const xTickCount = Math.min(5, points.length)

  return (
    <div className="coin-detail__chart" role="img" aria-label={`Price chart for ${symbol ?? "asset"} showing ${trend}`}>
      <div className="coin-detail__chart-inner">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 0, right: 64, bottom: 8, left: 0 }}>
            <defs>
              <linearGradient id="price-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="t"
              tick={{ fill: "var(--text-mute)", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
              tickFormatter={(t: string) => formatDate(t, timeframe)}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tickCount={xTickCount}
            />
            <YAxis
              orientation="right"
              tick={{ fill: "var(--text-mute)", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
              tickFormatter={(v: number) => "$" + v.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              tickLine={false}
              axisLine={false}
              width={60}
              tickCount={tickCount}
              domain={["dataMin", "dataMax"]}
            />
            <ReferenceLine y={last} stroke={color} strokeDasharray="3 3" strokeOpacity={0.5} />
            <Area
              type="monotone"
              dataKey="p"
              fill="url(#price-gradient)"
              stroke={color}
              strokeWidth={1.5}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="coin-detail__chart-price-label" style={{ color, borderColor: color + "40" }}>
          ${last.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  )
}
