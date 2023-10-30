import { useState, useEffect } from 'react';

import type { IWeatherInfo } from '../types';
import { getStoredCity, setStoredCityWeather } from '../utils/storage';

const API_KEY = import.meta.env?.VITE_WEATHERSTACK_KEY;
const BASE_URL = 'http://api.weatherstack.com';
const MAX_RETRIES = 1;
const RETRY_DELAY = 1000;
const CACHE_TIME = 1 * 1000 * 60 * 5; // 5 miuntes

function useCityWeather(city: string): IWeatherInfo | null {
  const [cityWeather, setCityWeather] = useState<IWeatherInfo | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    if (!city) return;
    const storedCity = getStoredCity(city);

    async function fetchWeather(query: string): Promise<void> {
      try {
        const res = await fetch(
          `${BASE_URL}/current?access_key=${API_KEY}&query=${query}&unit=m`,
          {
            referrerPolicy: 'unsafe-url',
          }
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
          setCityWeather(storedCity?.weather || null);
        }
      }
    }

    if (storedCity?.weather && Date.now() - storedCity.storedAt < CACHE_TIME) {
      // the weather info gets stale every 5 minutes
      setCityWeather(storedCity.weather);
    } else {
      fetchWeather(city);
    }
  }, [city, retryCount]); // retryCount in dependencies triggers retries

  return cityWeather;
}

export default useCityWeather;
