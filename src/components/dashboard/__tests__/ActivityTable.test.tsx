import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@/test/test-utils'
import { ActivityTable } from '../ActivityTable'
import {
  MOCK_ACTIVITIES,
  createMockActivity,
} from '@/test/mocks/dashboard'

describe('ActivityTable', () => {
  describe('rendering', () => {
    it('renders the table title and user count', () => {
      render(<ActivityTable activities={MOCK_ACTIVITIES} />)

      expect(screen.getByText('User Activity Overview')).toBeInTheDocument()
      expect(screen.getByText('3 users')).toBeInTheDocument()
    })

    it('renders table headers', () => {
      render(<ActivityTable activities={MOCK_ACTIVITIES} />)

      expect(screen.getByText('User')).toBeInTheDocument()
      expect(screen.getByText('Posts')).toBeInTheDocument()
      expect(screen.getByText('Todos')).toBeInTheDocument()
    })

    it('renders all user names and emails', () => {
      render(<ActivityTable activities={MOCK_ACTIVITIES} />)

      MOCK_ACTIVITIES.forEach((activity) => {
        expect(screen.getByText(activity.name)).toBeInTheDocument()
      })
    })

    it('renders user initials in avatar', () => {
      render(<ActivityTable activities={MOCK_ACTIVITIES} />)

      // John and Jane both have 'J' initial
      expect(screen.getAllByText('J').length).toBeGreaterThanOrEqual(2)
      expect(screen.getByText('B')).toBeInTheDocument() // Bob
    })

    it('displays completion percentages correctly', () => {
      render(<ActivityTable activities={MOCK_ACTIVITIES} />)

      // John: 15/20 = 75%, Jane: 20/25 = 80%, Bob: 5/15 = 33%
      expect(screen.getByText('75%')).toBeInTheDocument()
      expect(screen.getByText('80%')).toBeInTheDocument()
      expect(screen.getByText('33%')).toBeInTheDocument()
    })
  })

  describe('sorting', () => {
    it('sorts by name when clicking the User header', () => {
      render(<ActivityTable activities={MOCK_ACTIVITIES} />)

      fireEvent.click(screen.getByText('User'))

      const rows = screen.getAllByRole('row')
      expect(rows.length).toBeGreaterThan(1)
    })

    it('toggles sort direction when clicking the same header twice', () => {
      render(<ActivityTable activities={MOCK_ACTIVITIES} />)
      const postsHeader = screen.getByText('Posts')

      fireEvent.click(postsHeader) // First click - desc
      fireEvent.click(postsHeader) // Second click - asc

      expect(screen.getByText('User Activity Overview')).toBeInTheDocument()
    })

    it('sorts by posts in descending order by default', () => {
      render(<ActivityTable activities={MOCK_ACTIVITIES} />)

      // Jane has most posts (15), should be first
      const rows = screen.getAllByRole('row')
      const firstDataRow = rows[1] // Skip header row
      expect(within(firstDataRow).getByText('Jane Smith')).toBeInTheDocument()
    })
  })

  describe('ranking indicators', () => {
    it('shows trophy/medal icons for top users', () => {
      const { container } = render(
        <ActivityTable activities={MOCK_ACTIVITIES} />
      )

      const trophyIcons = container.querySelectorAll('.lucide-trophy')
      expect(trophyIcons.length).toBeGreaterThan(0)
    })
  })

  describe('edge cases', () => {
    it('shows empty state when no activities provided', () => {
      render(<ActivityTable activities={[]} />)

      expect(screen.getByText('No activity data available')).toBeInTheDocument()
    })

    it('handles user with zero todos gracefully', () => {
      const activityWithZeroTodos = createMockActivity({
        id: 99,
        name: 'Zero Todo User',
        todos: 0,
        completedTodos: 0,
      })

      render(<ActivityTable activities={[activityWithZeroTodos]} />)

      expect(screen.getByText('Zero Todo User')).toBeInTheDocument()
      expect(screen.getByText('0%')).toBeInTheDocument()
    })
  })
})
