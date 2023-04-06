import { useRef, useCallback, useEffect, RefObject } from 'react';

type handleClick = (event: MouseEvent) => void;

export const useClickOutside = <T extends HTMLElement>(onClickOutside: handleClick): { elementRef: RefObject<T> } => {
  const elementRef = useRef<T>(null);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        onClickOutside(event);
      }
    },

    [onClickOutside, elementRef],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return { elementRef };
};
