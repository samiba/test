import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './app/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { MatchesPage } from './pages/MatchesPage'
import { PlayersPage } from './pages/PlayersPage'
import { TeamDetailPage } from './pages/TeamDetailPage'
import { TeamsPage } from './pages/TeamsPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:teamId" element={<TeamDetailPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/matches" element={<MatchesPage />} />
      </Route>
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
