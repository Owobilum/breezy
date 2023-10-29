import { ReactElement, useState } from 'react';

import citiesJsonData from '../../data/largest-cities.json';
import CityCard from '../city-card/CityCard';

const sortedCities = citiesJsonData.sort((a, b) =>
  a.city.toLowerCase().localeCompare(b.city.toLowerCase())
);

function LargestCities(): ReactElement {
  const [cities, setCities] = useState(sortedCities);

  const removeCity = (cityName: string) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city.city !== cityName)
    );
  };

  return (
    <div
      style={{ display: 'flex', gap: 32, padding: 40, border: 'solid green' }}
    >
      {cities?.map((city) => (
        <CityCard key={city.city} city={city.city} onClick={removeCity} />
      ))}
    </div>
  );
}

export default LargestCities;
