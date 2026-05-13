import { useState } from 'react'
import { loadMock } from './lib/mockLoader'
import QueryInput from './components/QueryInput'
import OutputCanvas from './components/OutputCanvas'
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

  const handleSubmit = async (query: string) => {
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
    <div className="app">
      <header className="app__header">
        <span className="app__title">SAARTHI</span>
        <span className="app__subtitle">crypto analytics terminal</span>
      </header>
      <QueryInput onSubmit={handleSubmit} />
      <OutputCanvas response={response} isLoading={isLoading} />
    </div>
  )
}

export default App
