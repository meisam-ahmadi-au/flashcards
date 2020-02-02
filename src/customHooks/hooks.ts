import { useRef, useEffect } from 'react';

export const usePreviousValue = (value: any) => {
  const previous = useRef<any>();
  useEffect(() => {
    previous.current = value;
  }, [value]);
  return previous.current;
};
