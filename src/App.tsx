import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import MainLayout from './layouts/MainLayout'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './router/PrivateRoute'

const LoginPage = lazy(() => import('./pages/Login'))
const RegisterPage = lazy(() => import('./pages/Register'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const CategoryProductsPage = lazy(() => import('./pages/CategoryProducts'))
const ManageProductDetailsPage = lazy(() => import('./pages/ManageProductDetails'))

function App() {

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/:category/:id" element={<CategoryProductsPage />} />
          <Route path="/product" element={<ManageProductDetailsPage />} />
          <Route path="/product/:id" element={<ManageProductDetailsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
