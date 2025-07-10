import React from "react";
import "./App.css";

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

class App extends React.Component<object, { inputValue: string }> {
  constructor(props: object) {
    super(props);
    this.state = { inputValue: "" };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <div className="app-container">
        <Input
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <p>{this.state.inputValue}</p>
      </div>
    );
  }
}

export default App;
