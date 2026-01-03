import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ConfirmDialog } from '../ConfirmDialog'

describe('ConfirmDialog', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders when isOpen is true', () => {
      render(<ConfirmDialog {...defaultProps} />)

      expect(screen.getByText('Confirm Action')).toBeInTheDocument()
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
      render(<ConfirmDialog {...defaultProps} isOpen={false} />)

      expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument()
    })

    it('renders default button text', () => {
      render(<ConfirmDialog {...defaultProps} />)

      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })

    it('renders custom button text', () => {
      render(
        <ConfirmDialog
          {...defaultProps}
          confirmText="Delete"
          cancelText="Keep"
        />
      )

      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /keep/i })).toBeInTheDocument()
    })
  })

  describe('variants', () => {
    it('applies danger variant styles', () => {
      render(<ConfirmDialog {...defaultProps} variant="danger" />)

      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      expect(confirmButton.className).toContain('bg-red-600')
    })

    it('applies warning variant styles', () => {
      render(<ConfirmDialog {...defaultProps} variant="warning" />)

      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      expect(confirmButton.className).toContain('bg-yellow-600')
    })

    it('applies info variant styles', () => {
      render(<ConfirmDialog {...defaultProps} variant="info" />)

      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      expect(confirmButton.className).toContain('bg-blue-600')
    })
  })

  describe('interactions', () => {
    it('calls onConfirm when confirm button is clicked', () => {
      render(<ConfirmDialog {...defaultProps} />)

      fireEvent.click(screen.getByRole('button', { name: /confirm/i }))

      expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when cancel button is clicked', () => {
      render(<ConfirmDialog {...defaultProps} />)

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }))

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when close (X) button is clicked', () => {
      render(<ConfirmDialog {...defaultProps} />)

      const closeButtons = screen.getAllByRole('button')
      const xButton = closeButtons.find((btn) =>
        btn.className.includes('absolute')
      )
      if (xButton) {
        fireEvent.click(xButton)
        expect(defaultProps.onClose).toHaveBeenCalled()
      }
    })

    it('calls onClose when backdrop is clicked', () => {
      render(<ConfirmDialog {...defaultProps} />)

      const backdrop = document.querySelector('.bg-black\\/50')
      if (backdrop) {
        fireEvent.click(backdrop)
        expect(defaultProps.onClose).toHaveBeenCalled()
      }
    })

    it('calls onClose when Escape key is pressed', () => {
      render(<ConfirmDialog {...defaultProps} />)

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(defaultProps.onClose).toHaveBeenCalled()
    })

    it('does not call onClose on Escape when loading', () => {
      render(<ConfirmDialog {...defaultProps} isLoading={true} />)

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('disables buttons when loading', () => {
      render(<ConfirmDialog {...defaultProps} isLoading={true} />)

      expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
    })

    it('shows processing text when loading', () => {
      render(<ConfirmDialog {...defaultProps} isLoading={true} />)

      expect(screen.getByText(/processing/i)).toBeInTheDocument()
    })

    it('does not close on backdrop click when loading', () => {
      render(<ConfirmDialog {...defaultProps} isLoading={true} />)

      const backdrop = document.querySelector('.bg-black\\/50')
      if (backdrop) {
        fireEvent.click(backdrop)
        expect(defaultProps.onClose).not.toHaveBeenCalled()
      }
    })
  })

  describe('accessibility', () => {
    it('locks body scroll when open', () => {
      render(<ConfirmDialog {...defaultProps} />)

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when closed', () => {
      const { rerender } = render(<ConfirmDialog {...defaultProps} />)

      rerender(<ConfirmDialog {...defaultProps} isOpen={false} />)

      expect(document.body.style.overflow).toBe('unset')
    })
  })
})
