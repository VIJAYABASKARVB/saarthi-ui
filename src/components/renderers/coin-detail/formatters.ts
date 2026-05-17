export function formatPrice(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatPercent(n: number): string {
  const sign = n > 0 ? "+" : ""
  return sign + n.toFixed(2) + "%"
}

export function formatLargeNumber(n: number): string {
  if (n === 0) return "0"
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "T"
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B"
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M"
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K"
  return n.toLocaleString("en-US")
}

export function formatInfinitePercent(n: number): string {
  if (n > 10000) return "~" + (n / 1e6).toFixed(1) + "M%"
  if (n > 100) return n.toFixed(1) + "%"
  return n.toFixed(1) + "%"
}

export interface OHLC {
  open: number
  high: number
  low: number
  close: number
}

export function deriveOHLC(data: Array<{ t: string; price: number }>): OHLC | null {
  if (!data || data.length < 2) return null
  const prices = data.map(d => d.price)
  return {
    open: prices[0],
    high: Math.max(...prices),
    low: Math.min(...prices),
    close: prices[prices.length - 1],
  }
}

export function getAthContext(pct: number): string {
  if (pct < 5) return "Near ATH"
  if (pct < 20) return "Mid-range"
  return "Far from ATH"
}

export function getAtlContext(pct: number): string {
  if (pct < 100) return "Near ATL"
  if (pct < 1000) return "Recovering"
  return "Far from ATL"
}

export function getTurnoverTier(v: number): string {
  if (v > 0.3) return "High"
  if (v > 0.1) return "Medium"
  return "Low"
}

export function getNetworkTier(v: number): string {
  if (v >= 500000) return "Very High"
  if (v >= 100000) return "High"
  if (v >= 10000) return "Medium"
  return "Low"
}

export function getHolderFlow(pct: number): string {
  if (pct > 0.5) return "Accumulation"
  if (pct < -0.5) return "Distribution"
  return "Neutral"
}

export function getPrismTier(score: number): string {
  if (score >= 70) return "Strong"
  if (score >= 40) return "Moderate"
  return "Weak"
}
