import { useState, useEffect } from 'react';

import type { IWeatherInfo } from '../types';
import { getStoredCity, setStoredCityWeather } from '../utils/storage';

const API_KEY = import.meta.env?.VITE_WEATHERSTACK_KEY;
const BASE_URL = 'http://api.weatherstack.com';
const MAX_RETRIES = 1;
const RETRY_DELAY = 1000;

function useCityWeather(city: string): IWeatherInfo | null {
  const [cityWeather, setCityWeather] = useState<IWeatherInfo | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    if (!city) return;
    async function fetchWeather(query: string): Promise<void> {
      try {
        const res = await fetch(
          `${BASE_URL}/current?access_key=${API_KEY}&query=${query}&unit=m`
        );
        const data: IWeatherInfo = await res.json();
        if (data?.current) {
          setStoredCityWeather(city, data);
          setCityWeather(data);
        } else {
          throw new Error(data?.error?.type || 'weather api error');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount((prevCount) => prevCount + 1);
          }, RETRY_DELAY);
        } else {
          const storedCity = getStoredCity(city);
          setCityWeather(storedCity?.weather || null);
        }
      }
    }

    fetchWeather(city);
  }, [city, retryCount]); // retryCount in dependencies triggers retries

  return cityWeather;
}

export default useCityWeather;
