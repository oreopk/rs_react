import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
class Input extends React.Component<InputProps> {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Input;
