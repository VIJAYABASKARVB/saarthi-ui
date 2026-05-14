import { Badge } from "../../ui/badge"

interface RelatedCoinTagsProps {
  coins: string[]
}

export default function RelatedCoinTags({ coins }: RelatedCoinTagsProps) {
  if (coins.length === 0) return null

  return (
    <div className="flex gap-1">
      {coins.slice(0, 3).map(coin => (
        <Badge key={coin} variant="outline" className="text-[10px] px-1.5 py-0 rounded-full text-[var(--text-mute)]">
          {coin}
        </Badge>
      ))}
    </div>
  )
}
