interface SectionHeaderProps {
  title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  if (!title) return null
  return <div className="composite-section__header">{title.toUpperCase()}</div>
}
