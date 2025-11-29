import React from "react";

type ErrorBoundaryState = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("❌ Error Boundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700">
          <p>Something went wrong. Please refresh.</p>
          <pre className="text-xs mt-2">{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
