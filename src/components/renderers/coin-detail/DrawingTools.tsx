import { useState } from "react"
import { Crosshair, TrendingUp, Minus, Type } from "lucide-react"

type ToolId = "crosshair" | "trendline" | "fibonacci" | "text"

interface DrawingToolsProps {
  onToolSelect?: (tool: ToolId | null) => void
}

const TOOLS: { id: ToolId; icon: typeof Crosshair; label: string }[] = [
  { id: "crosshair", icon: Crosshair, label: "Crosshair" },
  { id: "trendline", icon: TrendingUp, label: "Trendline" },
  { id: "fibonacci", icon: Minus, label: "Fibonacci" },
  { id: "text", icon: Type, label: "Text" },
]

export default function DrawingTools({ onToolSelect }: DrawingToolsProps) {
  const [active, setActive] = useState<ToolId | null>(null)

  const handleClick = (tool: ToolId) => {
    const next = active === tool ? null : tool
    setActive(next)
    onToolSelect?.(next)
  }

  return (
    <div className="coin-detail__drawing-tools">
      {TOOLS.map(t => {
        const Icon = t.icon
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            className={`coin-detail__drawing-tool ${isActive ? "coin-detail__drawing-tool--active" : ""}`}
            onClick={() => handleClick(t.id)}
            aria-pressed={isActive}
            aria-label={t.label}
          >
            <Icon size={16} strokeWidth={1.5} />
          </button>
        )
      })}
    </div>
  )
}
