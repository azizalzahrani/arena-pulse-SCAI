"use client"

import { Component, ErrorInfo, ReactNode } from "react"

/**
 * Props for the ErrorBoundary component
 * @interface Props
 * @property {ReactNode} children - The child components to render
 * @property {ReactNode} [fallback] - Optional custom fallback UI to display when an error occurs
 */
interface Props {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * State for the ErrorBoundary component
 * @interface State
 * @property {boolean} hasError - Whether an error has been caught
 * @property {Error | null} error - The caught error object
 * @property {ErrorInfo | null} errorInfo - Additional error information
 */
interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole application.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 * 
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  /**
   * Updates state so the next render will show the fallback UI
   * @param {Error} error - The error that was thrown
   * @returns {State} The new state
   */
  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  /**
   * Called when an error is caught by the error boundary
   * @param {Error} error - The error that was thrown
   * @param {ErrorInfo} errorInfo - Additional error information
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  /**
   * Renders either the children or the fallback UI based on error state
   * @returns {ReactNode} The rendered component
   */
  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900 p-4 text-white">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="mb-2 text-xl font-bold">Something went wrong</h2>
            <p className="mb-4 text-center text-sm text-gray-400">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null })
              }}
            >
              Try again
            </button>
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 w-full max-w-md rounded bg-gray-800 p-4 text-xs">
                <summary className="cursor-pointer text-gray-400">Error details</summary>
                <pre className="mt-2 overflow-auto text-gray-300">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        )
      )
    }

    return this.props.children
  }
} 