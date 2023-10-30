import { useState, useEffect, useRef } from 'react';

import type { ISearchResult } from '../types';

const API_KEY = import.meta.env?.VITE_OPENCAGE_KEY;
const BASE_URL = 'https://api.opencagedata.com/geocode/v1';
const DEBOUNCE_DELAY = 1000; // 1 second

type StateType = 'loading' | 'idle' | 'error' | 'typing';

interface ISearchResponse {
  results: ISearchResult[];
}

interface UseCitySearch {
  searchResults: ISearchResult[] | null;
  state: StateType;
}

function useCitySearch(city: string): UseCitySearch {
  const [searchResults, setSearchResults] = useState<ISearchResult[] | null>(
    null
  );
  const [state, setState] = useState<StateType>('idle');
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!city) return;
    setState('typing');
    clearTimeout(timeoutIdRef.current);
    async function searchCity(query: string): Promise<void> {
      try {
        setState('loading');
        const res = await fetch(`${BASE_URL}/json?q=${query}&key=${API_KEY}`);
        const data: ISearchResponse = await res.json();
        const { results } = data;
        setSearchResults(results);
        setState('idle');
      } catch (error) {
        setState('error');
        console.error('Error searching for city:', error);
      }
    }
    const id = setTimeout(() => {
      searchCity(city);
    }, DEBOUNCE_DELAY);

    timeoutIdRef.current = id;

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(id);
    };
  }, [city]);

  return { searchResults, state };
}

export default useCitySearch;
