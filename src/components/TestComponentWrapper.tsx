import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface TestComponentWrapperProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

const TestComponentWrapper: FC<TestComponentWrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

export default TestComponentWrapper