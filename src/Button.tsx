import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
}

export default Button;
