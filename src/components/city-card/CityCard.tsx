import { Link } from 'react-router-dom';

import styles from './CityCard.module.css';
import useCityWeather from '../../hooks/useCityWeather';
import { Icon } from '../icons';

interface ICityCard {
  city: string;
  onClick: (city: string) => void;
}

function CityCard({ city, onClick }: ICityCard) {
  const cityWeather = useCityWeather(city);

  return (
    <article className={styles.container}>
      <button
        type="button"
        onClick={() => onClick(city)}
        className={`ghost_btn ${styles.btn}`}
      >
        <Icon
          title="close"
          height={18}
          width={18}
          aria-label="delete_icon"
          className={styles.close_icon}
        />
      </button>
      <Link className={`${styles.link}`} to={`/cities/${city}`}>
        <span className={`${styles.location}`}>
          <Icon title="location" /> {`${city}`}
        </span>
        <span className={styles.temperature}>
          <Icon title="temperature" />{' '}
          {cityWeather?.current?.temperature
            ? `${cityWeather.current.temperature}°C`
            : 'unkwown'}
        </span>
      </Link>
    </article>
  );
}

export default CityCard;
