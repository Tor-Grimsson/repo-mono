import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging (keep this one)
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen w-full flex items-center justify-center px-8"
          style={{ backgroundColor: 'var(--kol-surface-primary)' }}
        >
          <div className="max-w-[600px] space-y-8 text-center">
            <div className="space-y-4">
              <h1
                className="kol-heading-display"
                style={{ color: 'var(--kol-surface-on-primary)' }}
              >
                Something went wrong
              </h1>
              <p
                className="kol-mono-text text-lg"
                style={{ color: 'var(--kol-surface-on-primary)', opacity: 0.7 }}
              >
                We encountered an unexpected error. This has been logged and we'll look into it.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div
                className="text-left p-6 rounded overflow-auto max-h-[300px]"
                style={{
                  backgroundColor: 'var(--kol-surface-secondary)',
                  color: 'var(--kol-surface-on-primary)'
                }}
              >
                <p className="kol-mono-xs font-bold mb-2">Error Details (dev only):</p>
                <pre className="kol-mono-xs whitespace-pre-wrap break-all">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 rounded transition-opacity kol-mono-text"
                style={{
                  backgroundColor: 'var(--kol-surface-on-primary)',
                  color: 'var(--kol-surface-primary)'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Try again
              </button>

              <a
                href="/"
                className="px-6 py-3 rounded transition-opacity kol-mono-text inline-block"
                style={{
                  backgroundColor: 'var(--kol-surface-secondary)',
                  color: 'var(--kol-surface-on-primary)'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
