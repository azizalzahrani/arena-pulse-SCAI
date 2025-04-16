import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../error-boundary'

// Mock console.error to avoid error logs in test output
const originalError = console.error
beforeAll(() => {
  console.error = jest.fn()
})
afterAll(() => {
  console.error = originalError
})

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Test Content</div>
      </ErrorBoundary>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders fallback UI when there is an error', () => {
    const ErrorComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })

  it('renders custom fallback UI when provided', () => {
    const ErrorComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary fallback={<div data-testid="custom-fallback">Custom Error UI</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
  })

  it('resets error state when Try Again is clicked', () => {
    const ErrorComponent = () => {
      throw new Error('Test error')
    }

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )

    const tryAgainButton = screen.getByText('Try again')
    tryAgainButton.click()

    // The error boundary should still show the error UI
    // because the ErrorComponent will throw again on re-render
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
}) 