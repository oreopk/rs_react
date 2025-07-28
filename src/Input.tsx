import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ value, onChange }: InputProps): React.ReactElement {
  return <input type="text" value={value} onChange={onChange} />;
}

export default Input;
