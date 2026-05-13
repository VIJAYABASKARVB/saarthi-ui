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

export function formatCompactCoin(n: number): string {
  if (n === 0) return "< $1M"
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T"
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B"
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M"
  return "< $1M"
}
