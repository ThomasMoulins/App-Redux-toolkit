import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Annule le délai si la valeur change avant la fin du délai
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
