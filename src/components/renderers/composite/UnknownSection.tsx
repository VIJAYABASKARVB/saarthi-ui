interface UnknownSectionProps {
  responseType: string
}

export default function UnknownSection({ responseType }: UnknownSectionProps) {
  return <div className="composite-unknown">[UNKNOWN] {responseType}</div>
}
