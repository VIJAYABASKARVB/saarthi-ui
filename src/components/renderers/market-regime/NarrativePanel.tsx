interface NarrativePanelProps {
  narrative: string
}

export default function NarrativePanel({ narrative }: NarrativePanelProps) {
  if (!narrative) return null

  return (
    <div className="px-6 py-3.5 border-t border-[rgba(255,255,255,0.06)] flex items-start gap-2">
      <span className="font-mono text-xs text-[var(--text-mute)] leading-5 shrink-0">
        {`>`}
      </span>
      <p className="font-mono text-xs text-[var(--text-dim)] leading-5 flex-1 min-w-0">
        {narrative}
        <span className="inline-block w-[2px] h-[14px] ml-0.5 align-text-bottom bg-[var(--text-dim)] animate-pulse" />
      </p>
    </div>
  )
}
