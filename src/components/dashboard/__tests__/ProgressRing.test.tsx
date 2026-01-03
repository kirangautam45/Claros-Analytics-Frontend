import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/test-utils'
import { ProgressRing } from '../ProgressRing'

describe('ProgressRing', () => {
  describe('rendering', () => {
    it('renders the percentage value', () => {
      render(<ProgressRing percentage={75} />)

      expect(screen.getAllByText('75%').length).toBeGreaterThan(0)
    })

    it('renders the label when provided', () => {
      render(<ProgressRing percentage={50} label="Progress" />)

      expect(screen.getAllByText('Progress').length).toBeGreaterThan(0)
    })

    it('renders SVG with circles', () => {
      const { container } = render(<ProgressRing percentage={50} />)

      const svgs = container.querySelectorAll('svg')
      const circles = container.querySelectorAll('circle')

      expect(svgs.length).toBeGreaterThan(0)
      expect(circles.length).toBeGreaterThan(0)
    })
  })

  describe('status labels based on percentage', () => {
    it('shows "Excellent" for percentage >= 70', () => {
      render(<ProgressRing percentage={75} />)

      expect(screen.getByText('Excellent')).toBeInTheDocument()
    })

    it('shows "Good" for percentage >= 40 and < 70', () => {
      render(<ProgressRing percentage={50} />)

      expect(screen.getByText('Good')).toBeInTheDocument()
    })

    it('shows "Needs Attention" for percentage < 40', () => {
      render(<ProgressRing percentage={20} />)

      expect(screen.getByText('Needs Attention')).toBeInTheDocument()
    })
  })

  describe('color coding', () => {
    it('applies green color for high percentage (>=70)', () => {
      const { container } = render(<ProgressRing percentage={80} />)

      expect(container.innerHTML).toContain('#10b981')
    })

    it('applies amber color for medium percentage (>=40, <70)', () => {
      const { container } = render(<ProgressRing percentage={50} />)

      expect(container.innerHTML).toContain('#f59e0b')
    })

    it('applies red color for low percentage (<40)', () => {
      const { container } = render(<ProgressRing percentage={20} />)

      expect(container.innerHTML).toContain('#ef4444')
    })
  })

  describe('value clamping', () => {
    it('clamps percentage above 100 to 100', () => {
      render(<ProgressRing percentage={150} />)

      expect(screen.getAllByText('100%').length).toBeGreaterThan(0)
    })

    it('clamps negative percentage to 0', () => {
      render(<ProgressRing percentage={-10} />)

      expect(screen.getAllByText('0%').length).toBeGreaterThan(0)
    })
  })
})
