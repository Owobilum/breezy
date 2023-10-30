import { ReactElement, useCallback, useState } from 'react';

import citiesJsonData from '../../data/largest-cities.json';
import CityCard from '../city-card/CityCard';
import styles from './LargestCities.module.css';

const sortedCities = citiesJsonData.sort((a, b) =>
  a.city.toLowerCase().localeCompare(b.city.toLowerCase())
);

function LargestCities(): ReactElement {
  const [cities, setCities] = useState(sortedCities);

  const removeCity = useCallback((cityName: string) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city.city !== cityName)
    );
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.h2}>World&apos;s Largest Cities</h2>
      <div className={styles.container}>
        {cities?.map((city) => (
          <CityCard key={city.city} city={city.city} onClick={removeCity} />
        ))}
      </div>
    </section>
  );
}

export default LargestCities;
