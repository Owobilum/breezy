import { ReactElement, useState, useEffect, useMemo } from 'react';

import CityCard from '../city-card/CityCard';
import {
  deleteStoredFavourite,
  getStoredFavourites,
} from '../../utils/storage';

function FavouriteCities(): ReactElement {
  const [storedFavourites, setStoredFavourites] = useState(
    getStoredFavourites()
  );

  const removeFavourite = (cityName: string) => {
    deleteStoredFavourite(cityName);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredFavourites(getStoredFavourites());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const sortedFavourites = useMemo(() => {
    return storedFavourites?.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
  }, [storedFavourites]);

  return (
    <div
      style={{ display: 'flex', gap: 32, padding: 40, border: 'solid green' }}
    >
      {!!sortedFavourites?.length &&
        sortedFavourites?.map((city) => (
          <CityCard key={city} city={city} onClick={removeFavourite} />
        ))}
    </div>
  );
}

export default FavouriteCities;
