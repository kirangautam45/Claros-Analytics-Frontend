import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { DashboardHeader } from '../DashboardHeader'

describe('DashboardHeader', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('rendering', () => {
    it('renders the dashboard title and description', () => {
      render(<DashboardHeader />)

      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument()
      expect(
        screen.getByText(/what's happening with your analytics today/i)
      ).toBeInTheDocument()
    })

    it('renders the activity status section', () => {
      render(<DashboardHeader />)

      expect(screen.getByText('Activity Status')).toBeInTheDocument()
      expect(screen.getByText('All Systems Active')).toBeInTheDocument()
    })
  })

  describe('greeting based on time of day', () => {
    it('shows "Good morning!" before noon', () => {
      vi.setSystemTime(new Date(2024, 0, 1, 9, 0, 0))
      render(<DashboardHeader />)

      expect(screen.getByText('Good morning!')).toBeInTheDocument()
    })

    it('shows "Good afternoon!" between noon and 6pm', () => {
      vi.setSystemTime(new Date(2024, 0, 1, 14, 0, 0))
      render(<DashboardHeader />)

      expect(screen.getByText('Good afternoon!')).toBeInTheDocument()
    })

    it('shows "Good evening!" after 6pm', () => {
      vi.setSystemTime(new Date(2024, 0, 1, 20, 0, 0))
      render(<DashboardHeader />)

      expect(screen.getByText('Good evening!')).toBeInTheDocument()
    })
  })

  describe('date and time display', () => {
    it('displays the formatted date', () => {
      vi.setSystemTime(new Date(2024, 0, 15, 10, 30, 0))
      render(<DashboardHeader />)

      expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument()
    })

    it('displays the formatted time', () => {
      vi.setSystemTime(new Date(2024, 0, 15, 10, 30, 0))
      render(<DashboardHeader />)

      expect(screen.getByText(/10:30/)).toBeInTheDocument()
    })
  })
})
