interface RelatedCoinTagsProps {
  coins: string[]
}

export default function RelatedCoinTags({ coins }: RelatedCoinTagsProps) {
  if (coins.length === 0) return null

  return (
    <div className="news__tags">
      {coins.slice(0, 3).map(coin => (
        <span key={coin} className="news__tag">{coin}</span>
      ))}
    </div>
  )
}
