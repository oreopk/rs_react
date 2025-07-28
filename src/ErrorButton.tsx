import React from "react";

interface ErrorButtonProps {
  onClick: () => void;
}

class ErrorButton extends React.Component<ErrorButtonProps> {
  render() {
    const { onClick } = this.props;
    return (
      <button onClick={onClick} className="error-test-button">
        Test Error
      </button>
    );
  }
}
export default ErrorButton;