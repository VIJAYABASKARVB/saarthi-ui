interface UnknownSectionProps {
  responseType: string
}

export default function UnknownSection({ responseType }: UnknownSectionProps) {
  return <div className="px-5 py-3 text-xs text-[var(--text-dim)] border-t border-[rgba(255,255,255,0.06)]">[UNKNOWN] {responseType}</div>
}
