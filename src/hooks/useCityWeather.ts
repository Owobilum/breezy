import { useState, useEffect } from 'react';

import type { IWeatherInfo } from '../types';
import { getStoredCity, setStoredCityWeather } from '../utils/storage';

const API_KEY = import.meta.env?.VITE_WEATHERSTACK_KEY;
const BASE_URL = 'http://kapi.weatherstack.com';
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
          `${BASE_URL}/current?access_key=${API_KEY}&query=${query}`
        );
        const data: IWeatherInfo = await res.json();
        setStoredCityWeather(city, data);
        setCityWeather(data);
      } catch (error) {
        // console.error('Error fetching weather data:', error);
        if (retryCount < MAX_RETRIES) {
          //   console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
          setTimeout(() => {
            setRetryCount((prevCount) => prevCount + 1);
          }, RETRY_DELAY);
        } else {
          const storedCity = getStoredCity(city);
          setCityWeather(storedCity?.weather || null);
          //   console.error(`Max retries reached. Unable to fetch weather data.`);
        }
      }
    }

    fetchWeather(city);
  }, [city, retryCount]); // retryCount in dependencies triggers retries

  return cityWeather;
}

export default useCityWeather;

// import { useState, useEffect } from 'react';

// import type { IWeatherInfo } from '../types';
// import { getStoredCityWeather, setStoredCityWeather } from '../utils/storage';

// const API_KEY = import.meta.env?.VITE_WEATHERSTACK_KEY;
// const BASE_URL = 'http://kapi.weatherstack.com';
// const MAX_RETRIES = 1;
// const RETRY_DELAY = 1000;

// function useCityWeather(city: string): IWeatherInfo | null {
//   const [cityWeather, setCityWeather] = useState<IWeatherInfo | null>(null);
//   const [retryCount, setRetryCount] = useState<number>(0);

//   useEffect(() => {
//     if (!city) return;
//     async function fetchWeather(query: string): Promise<void> {
//       try {
//         const res = await fetch(
//           `${BASE_URL}/current?access_key=${API_KEY}&query=${query}`
//         );
//         const data: IWeatherInfo = await res.json();
//         setStoredCityWeather(data, city);
//         setCityWeather(data);
//       } catch (error) {
//         // console.error('Error fetching weather data:', error);
//         if (retryCount < MAX_RETRIES) {
//           //   console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
//           setTimeout(() => {
//             setRetryCount((prevCount) => prevCount + 1);
//           }, RETRY_DELAY);
//         } else {
//           const weather = getStoredCityWeather(city);
//           setCityWeather(weather);
//           //   console.error(`Max retries reached. Unable to fetch weather data.`);
//         }
//       }
//     }

//     fetchWeather(city);
//   }, [city, retryCount]); // Include retryCount in dependencies to trigger retries

//   return cityWeather;
// }

// export default useCityWeather;
