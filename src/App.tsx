import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import MainLayout from './layouts/MainLayout'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './router/PrivateRoute'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import PageLoader from './components/PageLoader'

const LoginPage = lazy(() => import('./pages/Login'))
const RegisterPage = lazy(() => import('./pages/Register'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const CategoryProductsPage = lazy(() => import('./pages/CategoryProducts'))
const ManageProductDetailsPage = lazy(() => import('./pages/ManageProductDetails'))
const AllProductsPage = lazy(() => import('./pages/Products'))


function App() {
  const isLoading = useSelector((state: RootState) => state.user.loading);
  return (
    <BrowserRouter>
      {isLoading && <PageLoader />}
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
          <Route path="/products" element={<AllProductsPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
