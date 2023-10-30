import { ReactElement, useState, useEffect, useMemo } from 'react';

import styles from './FavouriteCities.module.css';
import CityCard from '../city-card/CityCard';
import {
  deleteStoredFavourite,
  getStoredFavourites,
} from '../../utils/storage';

const removeFavourite = (cityName: string) => {
  deleteStoredFavourite(cityName);
};

function FavouriteCities(): ReactElement {
  const [storedFavourites, setStoredFavourites] = useState(
    getStoredFavourites()
  );

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
    <section className={styles.section}>
      <h2 className={styles.h2}>Your Favourite Cities</h2>
      <div className={styles.container}>
        {!!sortedFavourites?.length &&
          sortedFavourites?.map((city) => (
            <CityCard key={city} city={city} onClick={removeFavourite} />
          ))}
        {!sortedFavourites?.length && (
          <p className={styles.message}>
            Your favourite cites will appear here...
          </p>
        )}
      </div>
    </section>
  );
}

export default FavouriteCities;
