import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p className="error-message">{this.state.error?.toString()}</p>
          <button className="error-test-button" onClick={this.resetError}>
            Reboot
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
