import { useState } from "react"

interface ChartToolbarProps {
  onTimeframeChange: (tf: string) => void
}

const TIMEFRAMES = ["1D", "7D", "30D", "All"] as const

export default function ChartToolbar({ onTimeframeChange }: ChartToolbarProps) {
  const [active, setActive] = useState("1D")

  const handleClick = (tf: string) => {
    setActive(tf)
    onTimeframeChange(tf)
  }

  return (
    <div className="coin-detail__toolbar">
      <div className="coin-detail__toolbar-timeframes">
        {TIMEFRAMES.map(tf => (
          <button
            key={tf}
            className={`coin-detail__toolbar-tf ${active === tf ? "coin-detail__toolbar-tf--active" : ""}`}
            onClick={() => handleClick(tf)}
            aria-current={active === tf ? "true" : undefined}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  )
}
