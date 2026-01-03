import { Suspense } from 'react'
import { PageLoader } from './PageLoader'

interface LazyPageProps {
  Component: React.LazyExoticComponent<React.ComponentType>
}

export function LazyPage({ Component }: LazyPageProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}
