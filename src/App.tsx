import React from "react";
import "./App.css";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button 
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
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
  
  handleClick = () => {
  };


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
        <Button onClick={this.handleClick}>
          Поиск
        </Button>
      </div>
    );
  }
}

export default App;
