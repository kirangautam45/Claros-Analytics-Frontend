import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { SimpleBarChart } from '../SimpleBarChart'
import { MOCK_CHART_DATA } from '@/test/mocks/dashboard'

describe('SimpleBarChart', () => {
  describe('rendering', () => {
    it('renders the title', () => {
      render(<SimpleBarChart data={MOCK_CHART_DATA} title="Test Chart" />)

      expect(screen.getByText('Test Chart')).toBeInTheDocument()
    })

    it('renders all data item names', () => {
      render(<SimpleBarChart data={MOCK_CHART_DATA} title="Test Chart" />)

      MOCK_CHART_DATA.forEach((item) => {
        expect(screen.getByText(item.name)).toBeInTheDocument()
      })
    })

    it('renders values for each item', () => {
      render(<SimpleBarChart data={MOCK_CHART_DATA} title="Test Chart" />)

      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('75')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('25')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('displays the total count', () => {
      render(<SimpleBarChart data={MOCK_CHART_DATA} title="Test Chart" />)

      // Total: 100 + 75 + 50 + 25 + 10 = 260
      expect(screen.getByText(/260.*total/)).toBeInTheDocument()
    })
  })

  describe('ranking display', () => {
    it('shows rank numbers when showRank is true', () => {
      render(
        <SimpleBarChart
          data={MOCK_CHART_DATA}
          title="Test Chart"
          showRank={true}
        />
      )

      // Items 4+ show numeric ranks
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  describe('data limiting', () => {
    it('limits displayed data when limit prop is provided', () => {
      render(
        <SimpleBarChart data={MOCK_CHART_DATA} title="Test Chart" limit={3} />
      )

      expect(screen.getByText('User A')).toBeInTheDocument()
      expect(screen.getByText('User B')).toBeInTheDocument()
      expect(screen.getByText('User C')).toBeInTheDocument()
      expect(screen.queryByText('User D')).not.toBeInTheDocument()
      expect(screen.queryByText('User E')).not.toBeInTheDocument()
    })
  })

  describe('color variants', () => {
    it('applies cyan color by default', () => {
      const { container } = render(
        <SimpleBarChart data={MOCK_CHART_DATA} title="Test Chart" />
      )

      expect(container.innerHTML).toContain('from-cyan-400')
    })

    it('applies sky color when specified', () => {
      const { container } = render(
        <SimpleBarChart
          data={MOCK_CHART_DATA}
          title="Test Chart"
          color="sky"
        />
      )

      expect(container.innerHTML).toContain('from-sky-400')
    })

    it('applies emerald color when specified', () => {
      const { container } = render(
        <SimpleBarChart
          data={MOCK_CHART_DATA}
          title="Test Chart"
          color="emerald"
        />
      )

      expect(container.innerHTML).toContain('from-emerald-400')
    })
  })

  describe('number formatting', () => {
    it('formats large numbers with locale string', () => {
      const largeData = [{ name: 'User', value: 1000000 }]

      render(<SimpleBarChart data={largeData} title="Test Chart" />)

      expect(screen.getByText('1,000,000')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('shows empty state when data is empty', () => {
      render(<SimpleBarChart data={[]} title="Test Chart" />)

      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('handles single item data', () => {
      const singleData = [{ name: 'Only User', value: 42 }]

      render(<SimpleBarChart data={singleData} title="Test Chart" />)

      expect(screen.getByText('Only User')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
    })
  })
})
