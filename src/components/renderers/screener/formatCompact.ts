export function formatCompact(n: number): string {
  if (n === 0) return "< $1M"
  if (n >= 1e12) return "$" + (n / 1e12).toFixed(2) + "T"
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B"
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M"
  return "< $1M"
}
