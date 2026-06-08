import React from "react"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    // also log to console
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          <div className="max-w-3xl w-full bg-white dark:bg-black/90 border rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-red-600">Application error</h2>
            <div className="mt-2 text-sm">
              <div className="font-medium">{String(this.state.error?.message || this.state.error)}</div>
              <pre className="mt-2 text-xs whitespace-pre-wrap">{this.state.info?.componentStack}</pre>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
