import { useState } from 'react';
import { Link } from 'react-router-dom';

import useCityWeather from '../../hooks/useCityWeather';

interface ICityCard {
  city: string;
  onClick: (city: string) => void;
}

function CityCard({ city, onClick }: ICityCard) {
  const cityWeather = useCityWeather(city);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ position: 'relative', border: 'solid green', padding: 32 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={() => onClick(city)}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: isHovered ? 'inline' : 'none',
        }}
      >
        X
      </button>
      <Link
        style={{
          height: 100,
          width: 100,
          display: 'grid',
          placeItems: 'center',
          border: 'solid red',
        }}
        to={`/cities/${city}`}
      >
        <span>{`city ${city}: Temperature ${cityWeather?.current?.temperature}`}</span>
      </Link>
    </div>
  );
}

export default CityCard;
