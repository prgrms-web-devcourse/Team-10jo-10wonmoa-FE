import React, { MouseEvent, useEffect, useRef } from 'react';

const targetEvent = ['touchstart', 'mousedown'];

const useClickAway = (handler: () => void) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const handleEvent = (e: Event) => {
    if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
      handlerRef.current();
    }
  };

  useEffect(() => {
    targetEvent.forEach((event) => {
      document.addEventListener(event, handleEvent);
    });

    return () => {
      targetEvent.forEach((event) => {
        document.removeEventListener(event, handleEvent);
      });
    };
  }, [targetRef]);

  return targetRef;
};

export default useClickAway;
