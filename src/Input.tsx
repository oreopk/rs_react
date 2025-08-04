import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ value, onChange }: InputProps): React.ReactElement {
  const { theme } = useContext(ThemeContext) || {};
  return (
    <input
      className={`main-input ${theme}`}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
