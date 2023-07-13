import { useEffect, useState, useCallback } from 'react';
export const useKey = (key: any) => {
  const [pressed, setPressed] = useState(false);
  const match = useCallback(
    (event: any) => key.toLowerCase() === event.key.toLowerCase(),
    [key],
  );
  const onDown = useCallback(
    (event: any) => {
      if (match(event)) setPressed(true);
    },
    [match],
  );
  const onUp = useCallback(
    (event: any) => {
      if (match(event)) setPressed(false);
    },
    [match],
  );
  useEffect(() => {
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [onDown, onUp]);
  return pressed;
};
