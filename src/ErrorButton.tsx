import React from "react";

interface ErrorButtonProps {
  onClick: () => void;
}

const ErrorButton: React.FC<ErrorButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="error-test-button">
      Test Error
    </button>
  );
};

export default ErrorButton;
