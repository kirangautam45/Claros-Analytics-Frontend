import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@/test/test-utils'
import { Pagination } from '../Pagination'
import { createMockPaginationProps } from '@/test/mocks/dashboard'

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders pagination info showing items range', () => {
      const props = createMockPaginationProps()
      render(<Pagination {...props} />)

      expect(
        screen.getByText(/Showing 1 to 10 of 100 results/)
      ).toBeInTheDocument()
    })

    it('renders items per page selector with correct value', () => {
      const props = createMockPaginationProps()
      render(<Pagination {...props} />)

      expect(screen.getByText('Show')).toBeInTheDocument()
      expect(screen.getByText('per page')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toHaveValue('10')
    })

    it('highlights current page button', () => {
      const props = createMockPaginationProps({ currentPage: 2 })
      render(<Pagination {...props} />)

      const currentPageButton = screen.getByRole('button', { name: '2' })
      expect(currentPageButton.className).toContain('bg-blue-600')
    })

    it('shows ellipsis for many pages', () => {
      const props = createMockPaginationProps({
        currentPage: 5,
        totalPages: 20,
      })
      render(<Pagination {...props} />)

      const ellipses = screen.getAllByText('...')
      expect(ellipses.length).toBeGreaterThan(0)
    })

    it('shows all page numbers when total pages is small', () => {
      const props = createMockPaginationProps({
        totalPages: 3,
        totalItems: 30,
      })
      render(<Pagination {...props} />)

      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument()
    })
  })

  describe('navigation buttons', () => {
    it('disables previous button on first page', () => {
      const props = createMockPaginationProps({ currentPage: 1 })
      render(<Pagination {...props} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
    })

    it('disables next button on last page', () => {
      const props = createMockPaginationProps({
        currentPage: 10,
        totalPages: 10,
      })
      render(<Pagination {...props} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[buttons.length - 1]).toBeDisabled()
    })

    it('calls onPageChange with previous page when clicking previous', () => {
      const onPageChange = vi.fn()
      const props = createMockPaginationProps({
        currentPage: 5,
        onPageChange,
      })
      render(<Pagination {...props} />)

      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[0])

      expect(onPageChange).toHaveBeenCalledWith(4)
    })

    it('calls onPageChange with next page when clicking next', () => {
      const onPageChange = vi.fn()
      const props = createMockPaginationProps({
        currentPage: 5,
        onPageChange,
      })
      render(<Pagination {...props} />)

      const buttons = screen.getAllByRole('button')
      fireEvent.click(buttons[buttons.length - 1])

      expect(onPageChange).toHaveBeenCalledWith(6)
    })
  })

  describe('page number clicks', () => {
    it('calls onPageChange when clicking a page number', () => {
      const onPageChange = vi.fn()
      const props = createMockPaginationProps({ onPageChange })
      render(<Pagination {...props} />)

      fireEvent.click(screen.getByRole('button', { name: '2' }))

      expect(onPageChange).toHaveBeenCalledWith(2)
    })
  })

  describe('items per page', () => {
    it('calls onItemsPerPageChange when selecting a different value', () => {
      const onItemsPerPageChange = vi.fn()
      const props = createMockPaginationProps({ onItemsPerPageChange })
      render(<Pagination {...props} />)

      fireEvent.change(screen.getByRole('combobox'), { target: { value: '25' } })

      expect(onItemsPerPageChange).toHaveBeenCalledWith(25)
    })
  })

  describe('pagination info display', () => {
    it('shows correct range for middle pages', () => {
      const props = createMockPaginationProps({
        currentPage: 5,
        itemsPerPage: 10,
        totalItems: 100,
      })
      render(<Pagination {...props} />)

      expect(
        screen.getByText(/Showing 41 to 50 of 100 results/)
      ).toBeInTheDocument()
    })

    it('shows correct range for last page with partial items', () => {
      const props = createMockPaginationProps({
        currentPage: 10,
        itemsPerPage: 10,
        totalItems: 95,
        totalPages: 10,
      })
      render(<Pagination {...props} />)

      expect(
        screen.getByText(/Showing 91 to 95 of 95 results/)
      ).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('does not render when totalItems is 0', () => {
      const props = createMockPaginationProps({ totalItems: 0 })
      const { container } = render(<Pagination {...props} />)

      expect(container.firstChild).toBeNull()
    })
  })
})
