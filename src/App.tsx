import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import MainLayout from './layouts/MainLayout'

const LoginPage = lazy(() => import('./pages/Login'))
const RegisterPage = lazy(() => import('./pages/Register'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <MainLayout />
          }
        >
          <Route path="/" element={<DashboardPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
