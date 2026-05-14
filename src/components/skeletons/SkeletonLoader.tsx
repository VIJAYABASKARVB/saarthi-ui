import type { CSSProperties, ReactNode } from "react"

interface SkeletonLoaderProps {
  type: string
}

function Bar({ width, height = 12, style }: { width: string; height?: number; style?: CSSProperties }) {
  return <div className="skeleton-bar" style={{ width, height, ...style }} />
}

function ScreenerSkeleton() {
  return (
    <div className="screener">
      <div className="screener-meta">
        <Bar width="60px" height={10} />
      </div>
      <div className="screener-table-wrap">
        <table className="screener-table">
          <thead>
            <tr className="screener-header-row">
              {["100px", "140px", "70px", "90px", "110px"].map((w, i) => (
                <th key={i} className="screener-header-cell">
                  <Bar width={w} height={10} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, r) => (
              <tr key={r} className="screener-row">
                {["100px", "140px", "70px", "90px", "80px"].map((w, c) => (
                  <td key={c} className="screener-data-cell">
                    <Bar width={w} height={11} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
              <div className="ml-signals__probability-segment" style={{ width: "60%", background: "#1a1a1a" }} />
              <div className="ml-signals__probability-segment" style={{ width: "25%", background: "#1a1a1a" }} />
              <div className="ml-signals__probability-segment" style={{ width: "15%", background: "#1a1a1a" }} />
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
    <div className="regime">
      <div className="regime__meta">
        <Bar width="200px" height={10} />
      </div>
      <div className="regime__hero">
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
          <Bar width="220px" height={32} />
        </div>
        <div className="regime__confidence">
          <div className="regime__confidence-track"><div className="skeleton-bar" style={{ width: "82%", height: "100%" }} /></div>
          <div style={{ textAlign: "right", marginTop: 4 }}><Bar width="36px" height={12} style={{ display: "inline-block" }} /></div>
        </div>
      </div>
      <div className="regime__metrics" style={{ gap: 24, justifyContent: "center" }}>
        <Bar width="120px" height={11} />
        <Bar width="120px" height={11} />
      </div>
      <div className="regime__transitions">
        <div className="regime__transitions-header"><Bar width="180px" height={10} /></div>
        {["Risk-on", "Risk-off", "Choppy"].map((_, i) => (
          <div key={i} className="regime__transition-row">
            <Bar width="80px" height={10} />
            <div className="regime__transition-track"><div className="skeleton-bar" style={{ width: `${[82, 8, 10][i]}%`, height: "100%" }} /></div>
            <Bar width="36px" height={10} />
          </div>
        ))}
      </div>
      <div className="regime__history">
        <div className="regime__history-header"><Bar width="100px" height={10} /></div>
        <div className="regime__history-strip">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="regime__history-dot-group">
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a1a1a" }} />
              <Bar width="20px" height={8} />
            </div>
          ))}
        </div>
      </div>
      <div className="regime__narrative"><Bar width="100%" height={36} /></div>
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
      <div className="coin-detail__hero">
        <div className="coin-detail__identity">
          <Bar width="50px" height={16} />
          <Bar width="30px" height={10} />
        </div>
        <Bar width="140px" height={11} style={{ marginBottom: 6 }} />
        <Bar width="180px" height={24} style={{ marginBottom: 8 }} />
        <div className="coin-detail__changes">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bar key={i} width="80px" height={11} />
          ))}
        </div>
      </div>
      <div className="coin-detail__body">
        <div className="coin-detail__signal-column">
          <Bar width="90px" height={9} style={{ marginBottom: 8 }} />
          <Bar width="50px" height={16} style={{ marginBottom: 8 }} />
          <div style={{ height: 6, background: "#1a1a1a", borderRadius: 2 }} />
          <Bar width="80px" height={10} style={{ marginTop: 4 }} />
        </div>
        <div className="coin-detail__metrics-column">
          <div className="coin-detail__metrics-section">
            <Bar width="50px" height={9} style={{ marginBottom: 6 }} />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="coin-detail__metric-row">
                <Bar width="120px" height={11} />
                <Bar width="60px" height={11} />
              </div>
            ))}
          </div>
          <div className="coin-detail__metrics-section">
            <Bar width="60px" height={9} style={{ marginBottom: 6 }} />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="coin-detail__metric-row">
                <Bar width="100px" height={11} />
                <Bar width="50px" height={11} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="coin-detail__chart"><Bar width="100%" height={100} /></div>
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
  return <Variant />
}
