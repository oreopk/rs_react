import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps): React.ReactElement {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
