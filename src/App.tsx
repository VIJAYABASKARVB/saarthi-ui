import { useState } from 'react'

import { loadMock } from './lib/mockLoader'

import OutputCanvas from './components/OutputCanvas'
import IdleScreen from './components/IdleScreen'
import type { DashboardResponse } from './types/api'

const MOCK_MAP: Record<string, string> = {
  screener: "screener-happy.json",
  signals: "ml-signals-happy.json",
  regime: "market-regime-risk-on.json",
  news: "news-happy.json",
  coin: "coin-detail-btc.json",
  composite: "composite-happy.json",
  error: "error-rejected.json",
}

function App() {
  const [response, setResponse] = useState<DashboardResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastQuery, setLastQuery] = useState("")

  const handleSubmit = async (query: string) => {
    setLastQuery(query)
    setIsLoading(true)
    setResponse(null)
    try {
      const file = MOCK_MAP[query] ?? "screener-empty.json"
      const data = await loadMock(file)
      setResponse(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="mesh-orb mesh-orb--purple" />
      <div className="mesh-orb mesh-orb--emerald" />
      <div className="mesh-orb mesh-orb--accent" />

      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-[rgba(13,13,18,0.7)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.08)] rounded-full px-6 py-2.5 flex items-center gap-4 animate-fade-in">
          <span className="text-sm font-semibold text-[var(--text)] tracking-tight">Saarthi</span>
          <span className="w-px h-4 bg-[rgba(255,255,255,0.08)]" />
          <span className="text-[10px] text-[var(--text-mute)] tracking-wide">Powered by Saarthi AI</span>
        </div>
      </nav>

      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <IdleScreen onSubmit={handleSubmit} />
        <div className="mt-8">
          <OutputCanvas response={response} isLoading={isLoading} query={lastQuery} />
        </div>
      </div>
    </div>
  )
}

export default App
