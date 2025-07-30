import { useState, useEffect } from "react";
function useLocalStorage(
  key: string,
  defaultValue: string,
): [string, (value: string) => void] {
  const [Value, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    if (item) {
      return item;
    } else {
      return defaultValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, Value);
  }, [key, Value]);

  const setValue = (value: string) => {
    setStoredValue(value);
  };
  return [Value, setValue];
}
export default useLocalStorage;
