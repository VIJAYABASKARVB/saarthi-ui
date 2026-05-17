import type { CSSProperties, ReactNode } from "react"

interface SkeletonLoaderProps {
  type: string
}

function Bar({ width, height = 12, style }: { width: string; height?: number; style?: CSSProperties }) {
  return <div className="skeleton-bar" style={{ width, height, ...style }} />
}

function ScreenerSkeleton() {
  return (
    <div>
      <div className="screener-v2__toolbar">
        <Bar width="80px" height={12} />
        <Bar width="100px" height={12} />
      </div>
      <div className="screener-v2__table-wrap">
        <table className="screener-v2__table">
          <thead>
            <tr className="screener-v2__header-row">
              {[0, 1, 2, 3, 4].map((_, i) => (
                <th key={i} className="screener-v2__header-cell" style={{ padding: "14px 16px" }}>
                  <div className="skeleton-bar" style={{ width: "60%", height: 10 }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, r) => (
              <tr key={r} className="screener-v2__row">
                <td className="screener-v2__cell">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="skeleton-bar" style={{ width: 28, height: 28, borderRadius: "50%" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div className="skeleton-bar" style={{ width: 100, height: 12 }} />
                      <div className="skeleton-bar" style={{ width: 50, height: 10 }} />
                    </div>
                  </div>
                </td>
                {[60, 70, 80, 80].map((w, i) => (
                  <td key={i} className="screener-v2__cell screener-v2__cell--right">
                    <div className="skeleton-bar" style={{ width: w, height: 12, marginLeft: "auto" }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="screener-v2__pagination">
        <div className="skeleton-bar" style={{ width: 120, height: 11 }} />
        <div style={{ display: "flex", gap: 6 }}>
          {[44, 32, 32, 44].map((w, i) => (
            <div key={i} className="skeleton-bar" style={{ width: w, height: 28, borderRadius: 9999 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SignalsSkeleton() {
  return (
    <div className="ml-signals">
      <div className="ml-signals__meta">
        <Bar width="200px" height={10} />
      </div>
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="ml-signals__card" style={{ padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Bar width="40px" height={14} />
              <Bar width="80px" height={12} />
              <Bar width="60px" height={12} />
            </div>
            <Bar width="50px" height={14} />
          </div>
          <div className="ml-signals__score-row">
            <Bar width="60px" height={10} />
            <div className="ml-signals__confidence"><div className="skeleton-bar" style={{ width: "65%", height: "100%" }} /></div>
            <Bar width="36px" height={10} />
          </div>
          <div className="ml-signals__probability">
            <div className="ml-signals__probability-bar">
              <div className="ml-signals__probability-segment" style={{ width: "60%", background: "rgba(255, 255, 255, 0.04)" }} />
              <div className="ml-signals__probability-segment" style={{ width: "25%", background: "rgba(255, 255, 255, 0.04)" }} />
              <div className="ml-signals__probability-segment" style={{ width: "15%", background: "rgba(255, 255, 255, 0.04)" }} />
            </div>
          </div>
          <div className="ml-signals__features" style={{ borderTop: "1px solid var(--border)" }}>
            {Array.from({ length: 3 }).map((_, fi) => (
              <div key={fi} className="ml-signals__feature-row">
                <Bar width="160px" height={10} />
                <div className="ml-signals__feature-track"><div className="skeleton-bar" style={{ width: "70%", height: "100%" }} /></div>
                <Bar width="40px" height={10} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function RegimeSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-[var(--border)]">
        <Bar width="140px" height={11} />
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Bar width="60px" height={11} />
          <div className="skeleton-bar" style={{ width: 44, height: 11, borderRadius: 9999 }} />
        </div>
      </div>
      <div className="flex items-center gap-8 px-6 py-8">
        <div className="flex flex-col gap-2">
          <Bar width="40px" height={40} />
          <Bar width="240px" height={56} />
          <Bar width="80px" height={11} style={{ marginTop: 6 }} />
        </div>
        <div className="ml-auto">
          <div className="skeleton-bar" style={{ width: 100, height: 100, borderRadius: "50%" }} />
        </div>
      </div>
      <div className="px-6 py-5 border-t border-[var(--border)]">
        <Bar width="180px" height={10} style={{ marginBottom: 16 }} />
        <div className="flex justify-center gap-6" style={{ height: 128 }}>
          {[0, 1, 2].map(i => (
            <div key={i} className="flex flex-col items-center gap-2" style={{ alignSelf: "flex-end" }}>
              <Bar width="36px" height={12} />
              <div className="skeleton-bar" style={{ width: 56, height: 64 + i * 16, borderRadius: 9999 }} />
              <Bar width="60px" height={10} />
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-5 border-t border-[var(--border)]">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <Bar width="120px" height={10} />
          <Bar width="120px" height={10} />
        </div>
        <div className="skeleton-bar" style={{ width: "100%", height: 32, borderRadius: 8 }} />
      </div>
      <div className="px-6 py-5 border-t border-[var(--border)]">
        <Bar width="100%" height={36} />
      </div>
    </div>
  )
}

function NewsSkeleton() {
  return (
    <div className="news">
      <div className="news__meta">
        <Bar width="120px" height={10} />
      </div>
      {[0.85, 0.7, 0.9, 0.75].map((w, i) => (
        <div key={i} className="news__card">
          <div className="news__card-top">
            <Bar width={`${w * 100}%`} height={14} />
            <Bar width="12px" height={5} style={{ borderRadius: "50%", marginTop: 5, flexShrink: 0 }} />
          </div>
          <div className="news__card-bottom">
            <Bar width="140px" height={10} />
            <div style={{ display: "flex", gap: 4 }}>
              <Bar width="30px" height={10} />
              <Bar width="30px" height={10} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CoinDetailSkeleton() {
  return (
    <div className="coin-detail">
      <div className="coin-detail__header">
        <div className="coin-detail__header-left">
          <Bar width="50px" height={16} />
          <Bar width="100px" height={11} />
          <Bar width="120px" height={20} />
          <Bar width="60px" height={12} />
        </div>
      </div>
      <div className="coin-detail__toolbar">
        <div className="coin-detail__toolbar-timeframes">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bar key={i} width="32px" height={10} />
          ))}
        </div>
      </div>
      <div className="coin-detail__ohlc-bar">
        <Bar width="120px" height={10} />
        <Bar width="60px" height={10} />
        <Bar width="60px" height={10} />
        <Bar width="60px" height={10} />
        <Bar width="60px" height={10} />
      </div>
      <div className="coin-detail__chart-area">
        <div className="coin-detail__drawing-tools">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-bar" style={{ width: 28, height: 28, borderRadius: 6 }} />
          ))}
        </div>
        <div className="coin-detail__chart"><Bar width="100%" height={200} /></div>
        <div className="coin-detail__analysis-panel">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <Bar width="60px" height={9} style={{ marginBottom: 6 }} />
              <Bar width="100%" height={12} />
              <Bar width="40px" height={9} style={{ marginTop: 4 }} />
            </div>
          ))}
        </div>
      </div>
      <div className="coin-detail__metrics-cards">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="coin-detail__metric-card">
            <Bar width="80px" height={10} style={{ marginBottom: 6 }} />
            <Bar width="60px" height={16} style={{ marginBottom: 6 }} />
            <Bar width="40px" height={10} />
          </div>
        ))}
      </div>
    </div>
  )
}

function DefaultSkeleton() {
  return (
    <div className="output-canvas__success">
      <div style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <Bar width="240px" height={16} />
        <Bar width="180px" height={12} />
        <Bar width="120px" height={12} />
      </div>
    </div>
  )
}

const SKELETON_VARIANTS: Record<string, () => ReactNode> = {
  screener: ScreenerSkeleton,
  signals: SignalsSkeleton,
  regime: RegimeSkeleton,
  news: NewsSkeleton,
  coin: CoinDetailSkeleton,
  default: DefaultSkeleton,
}

export default function SkeletonLoader({ type }: SkeletonLoaderProps) {
  const Variant = SKELETON_VARIANTS[type] ?? SKELETON_VARIANTS.default
  return (
    <div className="bezel-shell animate-fade-up">
      <div className="bezel-core">
        <Variant />
      </div>
    </div>
  )
}
