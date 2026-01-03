/* eslint-disable react-refresh/only-export-components */
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

/**
 * Custom render function that wraps components with common providers.
 * Extend this as needed when you add providers (Redux, Router, etc.)
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options })
}

// Re-export everything from testing-library
export * from '@testing-library/react'

// Override render with our custom render
export { customRender as render }
