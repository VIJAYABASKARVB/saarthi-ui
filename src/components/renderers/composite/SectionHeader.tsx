import { Badge } from "../../ui/badge"

interface SectionHeaderProps {
  title: string
  type: string
}

export default function SectionHeader({ title, type }: SectionHeaderProps) {
  if (!title) return null
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-sm font-semibold text-[var(--text)]">{title}</span>
      <Badge variant="outline" className="text-[10px] px-1.5 py-0 rounded-full text-[var(--text-mute)]">
        {type}
      </Badge>
    </div>
  )
}
