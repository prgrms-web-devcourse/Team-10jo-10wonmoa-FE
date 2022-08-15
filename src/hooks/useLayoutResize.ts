import { useEffect } from 'react';
import { debounce } from 'lodash';

const setScreenSize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const debounced = debounce(() => {
  setScreenSize();
}, 500);

const useLayoutResize = () => {
  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', debounced);

    return () => {
      window.removeEventListener('resize', debounced);
    };
  }, []);
};

export default useLayoutResize;
