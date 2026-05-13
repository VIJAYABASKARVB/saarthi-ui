interface RelativeTimeProps {
  iso: string
}

function formatRelativeTime(iso: string): string {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diffMs = now - then

  if (diffMs < 0) return "now"

  const diffSec = Math.floor(diffMs / 1000)
  if (diffSec < 60) return "now"

  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin}m ago`

  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h ago`

  const diffDay = Math.floor(diffHr / 24)
  if (diffDay < 7) return `${diffDay}d ago`

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const d = new Date(iso)
  return `${months[d.getMonth()]} ${d.getDate()}`
}

export default function RelativeTime({ iso }: RelativeTimeProps) {
  return <span>{formatRelativeTime(iso)}</span>
}
