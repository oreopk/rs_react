"use client";

import Input from "../Input/Input";
import Button from "../Button/Button";

type Props = {
  theme?: string;
  title?: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function PlanetsHeader({
  theme = "light",
  title = "Star Wars Planets",
  inputValue,
  onInputChange,
  onSearch,
}: Props) {
  return (
    <>
      <h1 className={`title ${theme}`}>{title}</h1>
      <div className={`search-container ${theme}`}>
        <Input value={inputValue} onChange={onInputChange} />
        <Button onClick={onSearch}>Search</Button>
      </div>
    </>
  );
}
