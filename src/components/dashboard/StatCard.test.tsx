import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from './StatCard'
import { Users } from 'lucide-react'

describe('StatCard', () => {
  const defaultProps = {
    title: 'Total Users',
    value: 1234,
    icon: <Users data-testid="icon" />,
    color: 'teal' as const,
  }

  it('should render the title', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByText('Total Users')).toBeInTheDocument()
  })

  it('should render the value with locale formatting', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('should render the icon', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should format large numbers correctly', () => {
    render(<StatCard {...defaultProps} value={1000000} />)
    expect(screen.getByText('1,000,000')).toBeInTheDocument()
  })

  it('should handle zero value', () => {
    render(<StatCard {...defaultProps} value={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should apply teal color classes', () => {
    const { container } = render(<StatCard {...defaultProps} color="teal" />)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('from-teal-50')
    expect(card.className).toContain('border-teal-200')
  })

  it('should apply cyan color classes', () => {
    const { container } = render(<StatCard {...defaultProps} color="cyan" />)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('from-cyan-50')
    expect(card.className).toContain('border-cyan-200')
  })

  it('should apply emerald color classes', () => {
    const { container } = render(<StatCard {...defaultProps} color="emerald" />)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('from-emerald-50')
    expect(card.className).toContain('border-emerald-200')
  })

  it('should apply amber color classes', () => {
    const { container } = render(<StatCard {...defaultProps} color="amber" />)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('from-amber-50')
    expect(card.className).toContain('border-amber-200')
  })

  it('should apply slate color classes', () => {
    const { container } = render(<StatCard {...defaultProps} color="slate" />)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('from-slate-50')
    expect(card.className).toContain('border-slate-200')
  })

  it('should have hover transition classes', () => {
    const { container } = render(<StatCard {...defaultProps} />)
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('hover:shadow-md')
    expect(card.className).toContain('transition-all')
  })
})
