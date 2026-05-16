import { Lightbulb } from "lucide-react"

interface NarrativePanelProps {
  narrative: string
}

export default function NarrativePanel({ narrative }: NarrativePanelProps) {
  if (!narrative) return null

  return (
    <div className="mr2__narrative">
      <div className="mr2__narrative-icon-wrap">
        <Lightbulb size={16} strokeWidth={1.5} />
      </div>
      <div className="mr2__narrative-body">
        <span className="mr2__narrative-tag">AI MARKET NARRATIVE</span>
        <p className="mr2__narrative-text">{narrative}</p>
      </div>
    </div>
  )
}
