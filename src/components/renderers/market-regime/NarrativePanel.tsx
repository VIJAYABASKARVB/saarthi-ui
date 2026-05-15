import { Lightbulb } from "lucide-react"

interface NarrativePanelProps {
  narrative: string
}

export default function NarrativePanel({ narrative }: NarrativePanelProps) {
  if (!narrative) return null

  return (
    <div className="regime__narrative-panel">
      <div className="regime__narrative-icon">
        <Lightbulb size={16} strokeWidth={1.5} />
      </div>
      <div className="regime__narrative-body">
        <p className="regime__narrative-text">{narrative}</p>
        <span className="regime__narrative-label">AI Insight &middot; Generated Market Interpretation</span>
      </div>
    </div>
  )
}
