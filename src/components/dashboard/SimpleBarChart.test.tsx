import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SimpleBarChart } from './SimpleBarChart'

describe('SimpleBarChart', () => {
  const mockData = [
    { name: 'User A', value: 100 },
    { name: 'User B', value: 75 },
    { name: 'User C', value: 50 },
    { name: 'User D', value: 25 },
    { name: 'User E', value: 10 },
  ]

  it('should render the title', () => {
    render(<SimpleBarChart data={mockData} title="Test Chart" />)
    expect(screen.getByText('Test Chart')).toBeInTheDocument()
  })

  it('should render all data items', () => {
    render(<SimpleBarChart data={mockData} title="Test Chart" />)
    expect(screen.getByText('User A')).toBeInTheDocument()
    expect(screen.getByText('User B')).toBeInTheDocument()
    expect(screen.getByText('User C')).toBeInTheDocument()
    expect(screen.getByText('User D')).toBeInTheDocument()
    expect(screen.getByText('User E')).toBeInTheDocument()
  })

  it('should render values for each item', () => {
    render(<SimpleBarChart data={mockData} title="Test Chart" />)
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('75')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('should show total count', () => {
    render(<SimpleBarChart data={mockData} title="Test Chart" />)
    // Total: 100 + 75 + 50 + 25 + 10 = 260
    expect(screen.getByText('Total: 260')).toBeInTheDocument()
  })

  it('should show rank numbers when showRank is true', () => {
    render(<SimpleBarChart data={mockData} title="Test Chart" showRank={true} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should limit data when limit prop is provided', () => {
    render(<SimpleBarChart data={mockData} title="Test Chart" limit={3} />)
    expect(screen.getByText('User A')).toBeInTheDocument()
    expect(screen.getByText('User B')).toBeInTheDocument()
    expect(screen.getByText('User C')).toBeInTheDocument()
    expect(screen.queryByText('User D')).not.toBeInTheDocument()
    expect(screen.queryByText('User E')).not.toBeInTheDocument()
  })

  it('should show empty state when data is empty', () => {
    render(<SimpleBarChart data={[]} title="Test Chart" />)
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('should apply blue color classes by default', () => {
    const { container } = render(<SimpleBarChart data={mockData} title="Test Chart" />)
    expect(container.innerHTML).toContain('from-blue-400')
  })

  it('should apply green color classes when specified', () => {
    const { container } = render(<SimpleBarChart data={mockData} title="Test Chart" color="green" />)
    expect(container.innerHTML).toContain('from-emerald-400')
  })

  it('should apply purple color classes when specified', () => {
    const { container } = render(<SimpleBarChart data={mockData} title="Test Chart" color="purple" />)
    expect(container.innerHTML).toContain('from-purple-400')
  })

  it('should apply orange color classes when specified', () => {
    const { container } = render(<SimpleBarChart data={mockData} title="Test Chart" color="orange" />)
    expect(container.innerHTML).toContain('from-orange-400')
  })

  it('should format large numbers with locale string', () => {
    const largeData = [{ name: 'User', value: 1000000 }]
    render(<SimpleBarChart data={largeData} title="Test Chart" />)
    expect(screen.getByText('1,000,000')).toBeInTheDocument()
  })

  it('should handle single item data', () => {
    const singleData = [{ name: 'Only User', value: 42 }]
    render(<SimpleBarChart data={singleData} title="Test Chart" />)
    expect(screen.getByText('Only User')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })
})
