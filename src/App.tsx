import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { router } from '@/routes'
import { ErrorBoundary } from '@/components/common'

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  )
}

export default App
