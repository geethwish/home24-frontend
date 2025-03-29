import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'

const LoginPage = lazy(() => import('./pages/Login'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
