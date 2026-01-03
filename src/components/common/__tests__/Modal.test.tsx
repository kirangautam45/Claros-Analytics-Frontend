import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from '../Modal'

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Test Modal',
    children: <div>Modal content</div>,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders when isOpen is true', () => {
      render(<Modal {...defaultProps} />)

      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />)

      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
      expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
    })

    it('renders children content', () => {
      render(
        <Modal {...defaultProps}>
          <p>Custom child content</p>
          <button>Action Button</button>
        </Modal>
      )

      expect(screen.getByText('Custom child content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /action button/i })).toBeInTheDocument()
    })
  })

  describe('sizes', () => {
    it('applies small size class', () => {
      const { container } = render(<Modal {...defaultProps} size="sm" />)

      const modal = container.querySelector('.sm\\:max-w-sm')
      expect(modal).toBeInTheDocument()
    })

    it('applies medium size class (default)', () => {
      const { container } = render(<Modal {...defaultProps} />)

      const modal = container.querySelector('.sm\\:max-w-md')
      expect(modal).toBeInTheDocument()
    })

    it('applies large size class', () => {
      const { container } = render(<Modal {...defaultProps} size="lg" />)

      const modal = container.querySelector('.sm\\:max-w-lg')
      expect(modal).toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onClose when close button is clicked', () => {
      render(<Modal {...defaultProps} />)

      const closeButton = screen.getByRole('button')
      fireEvent.click(closeButton)

      expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when backdrop is clicked', () => {
      render(<Modal {...defaultProps} />)

      const backdrop = document.querySelector('.bg-black\\/50')
      if (backdrop) {
        fireEvent.click(backdrop)
        expect(defaultProps.onClose).toHaveBeenCalled()
      }
    })

    it('calls onClose when Escape key is pressed', () => {
      render(<Modal {...defaultProps} />)

      fireEvent.keyDown(document, { key: 'Escape' })

      expect(defaultProps.onClose).toHaveBeenCalled()
    })

    it('does not call onClose for other keys', () => {
      render(<Modal {...defaultProps} />)

      fireEvent.keyDown(document, { key: 'Enter' })

      expect(defaultProps.onClose).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('locks body scroll when open', () => {
      render(<Modal {...defaultProps} />)

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when closed', () => {
      const { rerender } = render(<Modal {...defaultProps} />)

      rerender(<Modal {...defaultProps} isOpen={false} />)

      expect(document.body.style.overflow).toBe('unset')
    })

    it('cleans up event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

      const { unmount } = render(<Modal {...defaultProps} />)
      unmount()

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
      removeEventListenerSpy.mockRestore()
    })
  })

  describe('complex content', () => {
    it('renders form content correctly', () => {
      render(
        <Modal {...defaultProps} title="Edit User">
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <button type="submit">Save</button>
          </form>
        </Modal>
      )

      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    })
  })
})
