import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { StatCard } from '../StatCard'
import { Users } from 'lucide-react'

describe('StatCard', () => {
  const defaultProps = {
    title: 'Total Users',
    value: 1234,
    icon: <Users data-testid="stat-icon" />,
    color: 'cyan' as const,
  }

  describe('rendering', () => {
    it('renders the title', () => {
      render(<StatCard {...defaultProps} />)

      expect(screen.getByText('Total Users')).toBeInTheDocument()
    })

    it('renders the value with locale formatting', () => {
      render(<StatCard {...defaultProps} />)

      expect(screen.getByText('1,234')).toBeInTheDocument()
    })

    it('renders the icon', () => {
      render(<StatCard {...defaultProps} />)

      expect(screen.getByTestId('stat-icon')).toBeInTheDocument()
    })
  })

  describe('number formatting', () => {
    it('formats large numbers correctly', () => {
      render(<StatCard {...defaultProps} value={1000000} />)

      expect(screen.getByText('1,000,000')).toBeInTheDocument()
    })

    it('handles zero value', () => {
      render(<StatCard {...defaultProps} value={0} />)

      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  describe('color variants', () => {
    it.each([
      ['cyan', 'from-cyan-500'],
      ['sky', 'from-sky-500'],
      ['emerald', 'from-emerald-500'],
      ['amber', 'from-amber-500'],
      ['slate', 'from-slate-500'],
    ] as const)('applies %s color classes', (color, expectedClass) => {
      const { container } = render(
        <StatCard {...defaultProps} color={color} />
      )

      expect(container.innerHTML).toContain(expectedClass)
    })
  })

  describe('interactions', () => {
    it('has hover transition styling', () => {
      const { container } = render(<StatCard {...defaultProps} />)

      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('hover:shadow-lg')
      expect(card.className).toContain('transition-all')
    })
  })
})
