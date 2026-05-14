import { useState } from 'react'
import { loadMock } from './lib/mockLoader'
import QueryInput from './components/QueryInput'
import OutputCanvas from './components/OutputCanvas'
import { Separator } from './components/ui/separator'
import { BGPattern } from './components/ui/bg-pattern'
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
    <div className="relative min-h-screen">
      <BGPattern variant="grid" mask="fade-edges" fill="rgba(124,92,255,0.08)" size={32} />
      <BGPattern variant="dots" mask="fade-center" fill="rgba(0,212,168,0.04)" size={48} />
      <div className="app">
        <header className="app__header">
        <div className="app__header-left">
          <div className="app__logomark">S</div>
          <span className="app__title">Saarthi</span>
        </div>
        <span className="app__subtitle">Powered by Saarthi AI</span>
      </header>
      <Separator className="mb-6 !bg-transparent" />
      <QueryInput onSubmit={handleSubmit} />
      <OutputCanvas response={response} isLoading={isLoading} query={lastQuery} />
      </div>
    </div>
  )
}

export default App
