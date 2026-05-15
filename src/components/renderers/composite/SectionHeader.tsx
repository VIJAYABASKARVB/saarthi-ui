interface SectionHeaderProps {
  title: string
  type: string
}

export default function SectionHeader({ title, type }: SectionHeaderProps) {
  if (!title) return null
  return (
    <div className="flex items-center gap-3 px-4 pt-4">
      <span className="text-sm font-semibold text-[var(--text)]">{title}</span>
      <span className="eyebrow">{type}</span>
    </div>
  )
}
