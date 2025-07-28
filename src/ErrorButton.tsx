import React from "react";

interface ErrorButtonProps {
  onClick: () => void;
}

function ErrorButton({ onClick }: ErrorButtonProps): React.ReactElement {
  return (
    <button onClick={onClick} className="error-test-button">
      Test Error
    </button>
  );
}

export default ErrorButton;
