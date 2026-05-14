import type {
  CompositeSection as CompositeSectionType,
  ScreenerData,
  MlSignalsData,
  MarketRegimeData,
  NewsData,
  CoinDetailData,
} from "../../../types/api"
import ScreenerRenderer from "../ScreenerRenderer"
import MlSignalsRenderer from "../MlSignalsRenderer"
import MarketRegimeRenderer from "../MarketRegimeRenderer"
import NewsRenderer from "../NewsRenderer"
import CoinDetailRenderer from "../CoinDetailRenderer"
import SectionHeader from "./SectionHeader"
import UnknownSection from "./UnknownSection"
import { buildEnvelope } from "./buildEnvelope"

interface CompositeSectionProps {
  section: CompositeSectionType
}

export default function CompositeSection({ section }: CompositeSectionProps) {
  const { response_type, title, data } = section

  const header = <SectionHeader title={title} />

  switch (response_type) {
    case "screener": {
      const d = data as ScreenerData
      return <>{header}<ScreenerRenderer response={buildEnvelope("screener", d, d.rows.length)} /></>
    }
    case "ml_signals": {
      const d = data as MlSignalsData
      return <>{header}<MlSignalsRenderer response={buildEnvelope("ml_signals", d, d.signals.length)} /></>
    }
    case "market_regime": {
      const d = data as MarketRegimeData
      return <>{header}<MarketRegimeRenderer response={buildEnvelope("market_regime", d, 1)} /></>
    }
    case "news": {
      const d = data as NewsData
      return <>{header}<NewsRenderer response={buildEnvelope("news", d, d.articles.length)} /></>
    }
    case "coin_detail": {
      const d = data as CoinDetailData
      return <>{header}<CoinDetailRenderer response={buildEnvelope("coin_detail", d, 1)} /></>
    }
    default:
      return <UnknownSection responseType={response_type} />
  }
}
