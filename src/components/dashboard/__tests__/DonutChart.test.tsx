import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { DonutChart } from '../DonutChart'
import { MOCK_DONUT_DATA } from '@/test/mocks/dashboard'

describe('DonutChart', () => {
  describe('rendering', () => {
    it('renders the title', () => {
      render(<DonutChart data={MOCK_DONUT_DATA} title="Task Status" />)

      expect(screen.getByText('Task Status')).toBeInTheDocument()
    })

    it('renders legend items with labels and percentages', () => {
      render(<DonutChart data={MOCK_DONUT_DATA} title="Task Status" />)

      expect(screen.getByText('Completed')).toBeInTheDocument()
      expect(screen.getByText('Pending')).toBeInTheDocument()
      expect(screen.getByText('70%')).toBeInTheDocument()
      expect(screen.getByText('30%')).toBeInTheDocument()
    })

    it('renders SVG with circle segments', () => {
      const { container } = render(
        <DonutChart data={MOCK_DONUT_DATA} title="Task Status" />
      )

      const svgs = container.querySelectorAll('svg')
      const circles = container.querySelectorAll('circle')

      expect(svgs.length).toBeGreaterThan(0)
      expect(circles.length).toBeGreaterThan(2)
    })

    it('renders legend color indicators', () => {
      const { container } = render(
        <DonutChart data={MOCK_DONUT_DATA} title="Task Status" />
      )

      const colorIndicators = container.querySelectorAll('.rounded-full.w-3.h-3')
      expect(colorIndicators.length).toBe(MOCK_DONUT_DATA.length)
    })
  })

  describe('center content', () => {
    it('renders center value when provided', () => {
      render(
        <DonutChart
          data={MOCK_DONUT_DATA}
          title="Task Status"
          centerValue={100}
        />
      )

      expect(screen.getAllByText('100').length).toBeGreaterThan(0)
    })

    it('renders center label when provided', () => {
      render(
        <DonutChart
          data={MOCK_DONUT_DATA}
          title="Task Status"
          centerLabel="Total"
        />
      )

      expect(screen.getAllByText('Total').length).toBeGreaterThan(0)
    })

    it('formats large center values with locale string', () => {
      render(
        <DonutChart
          data={MOCK_DONUT_DATA}
          title="Task Status"
          centerValue={1000}
        />
      )

      expect(screen.getAllByText('1,000').length).toBeGreaterThan(0)
    })

    it('handles string centerValue', () => {
      render(
        <DonutChart
          data={MOCK_DONUT_DATA}
          title="Task Status"
          centerValue="N/A"
        />
      )

      expect(screen.getAllByText('N/A').length).toBeGreaterThan(0)
    })
  })

  describe('edge cases', () => {
    it('handles empty data', () => {
      render(<DonutChart data={[]} title="Empty Chart" />)

      expect(screen.getByText('Empty Chart')).toBeInTheDocument()
    })

    it('handles single item data', () => {
      const singleData = [{ label: 'Only', value: 100, color: '#10b981' }]

      render(<DonutChart data={singleData} title="Single Item" />)

      expect(screen.getByText('Only')).toBeInTheDocument()
      expect(screen.getByText('100%')).toBeInTheDocument()
    })
  })
})
