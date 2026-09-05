import React, { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center h-full w-full" style={{ background: '#0e0e11', color: '#ffb4ab' }}>
          <div className="max-w-md p-6 rounded-lg border border-red-500/30 bg-red-950/20 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2 text-red-400">
              {this.props.fallbackTitle || 'Component Error'}
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-4 break-words">
              {this.state.error?.message || 'An unexpected runtime error occurred.'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 text-xs font-medium rounded bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
