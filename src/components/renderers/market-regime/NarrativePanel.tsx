interface NarrativePanelProps {
  narrative: string
}

export default function NarrativePanel({ narrative }: NarrativePanelProps) {
  if (!narrative) return null

  return (
    <div className="px-6 py-5 border-t border-[var(--border)] relative">
      <span
        className="absolute top-3 left-6 font-mono text-4xl leading-none select-none pointer-events-none"
        style={{ color: "var(--text-mute)", opacity: 0.12 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <div className="flex items-start gap-3 pl-6">
        <span className="font-mono text-xs text-[var(--text-mute)] leading-6 shrink-0" aria-hidden="true">
          {`>`}
        </span>
        <p className="font-mono text-sm text-[var(--text-dim)] leading-6 flex-1 min-w-0">
          {narrative}
          <span className="inline-block w-[2px] h-[15px] ml-0.5 align-text-bottom bg-[var(--text-dim)] animate-pulse" aria-hidden="true" />
        </p>
      </div>
    </div>
  )
}
