"use client"
import {useState, useEffect} from 'react';

type mode = "less" | "equal" | "greater"

function useMediaQuery(width: number, mode: mode = 'greater') {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let query: string;
    switch (mode) {
      case 'less':
        query = `(max-width: ${width}px)`;
        break;
      case 'equal':
        query = `(width: ${width}px)`;
        break;
      case 'greater':
        query = `(min-width: ${width}px)`;
        break;
      default:
        throw new Error('Invalid mode. Use "less", "equal", or "greater".');
    }

    const mediaQueryList = window.matchMedia(query);

    const updateMatches = (event: any) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', updateMatches);

    return () => mediaQueryList.removeEventListener('change', updateMatches);
  }, [width, mode]);

  return matches;
}

export default useMediaQuery;
