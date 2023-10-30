import { type ReactElement, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import styles from './CityWeather.module.css';
import useCityWeather from '../../hooks/useCityWeather';
import {
  setStoredCityNote,
  getStoredCity,
  getStoredFavourites,
  setStoredFavourite,
  deleteStoredFavourite,
} from '../../utils/storage';
import type { INote, IWeatherInfo } from '../../types';
import Note from '../../components/note/Note';
import { Icon } from '../../components/icons';

function Info({ title, content = '' }: { title: string; content?: string }) {
  return (
    <p className={styles.info_text_container}>
      <span className={styles.info_title}>{`${title}:`}</span>{' '}
      <span className={styles.info_content}>{content}</span>
    </p>
  );
}

function InfoBox({ cityWeather }: { cityWeather: IWeatherInfo | null }) {
  return (
    <div className={styles.info_box}>
      <div className={styles.descriptors}>
        <p>
          {!!cityWeather?.current?.weather_icons.length &&
            cityWeather.current.weather_icons.map((icon) => (
              <img
                key={icon}
                src={icon}
                alt="weather_icon"
                className={styles.weather_icon}
              />
            ))}
        </p>
        <p>
          {!!cityWeather?.current?.weather_descriptions.length &&
            cityWeather.current.weather_descriptions.map((description) => (
              <span key={description} className={styles.weather_summary}>
                {description}
              </span>
            ))}
        </p>
      </div>

      <Info
        title="Temperature"
        content={
          cityWeather?.current?.temperature
            ? `${cityWeather.current.temperature}°C`
            : undefined
        }
      />
      <Info
        title="Humidity"
        content={cityWeather?.current?.humidity?.toString()}
      />
      <Info
        title="Pressure"
        content={cityWeather?.current?.pressure?.toString()}
      />
      <Info
        title="UV Index"
        content={cityWeather?.current?.uv_index?.toString()}
      />
      <Info
        title="Visibility"
        content={cityWeather?.current?.visibility?.toString()}
      />
      <Info
        title="Wind Speed"
        content={cityWeather?.current?.wind_speed?.toString()}
      />
      <Info
        title="Wind Direction"
        content={cityWeather?.current?.wind_dir?.toString()}
      />
    </div>
  );
}

function CityWeatherDetails(): ReactElement {
  const { city } = useParams();
  const cityWeather = useCityWeather(city ?? '');
  const [note, setNote] = useState('');
  const [storedCityInfo, setStoredCityInfo] = useState<{
    weather: IWeatherInfo | null;
    notes: INote[] | null;
  } | null>(getStoredCity(city ?? ''));
  const [storedFavourites, setStoredFavourites] = useState(
    getStoredFavourites()
  );

  const isFavourite = useMemo(() => {
    return (
      storedFavourites &&
      storedFavourites.findIndex(
        (fave) => fave.toLowerCase() === city?.toLowerCase()
      ) !== -1
    );
  }, [city, storedFavourites]);

  const handleSave = () => {
    if (!city) return;
    setStoredCityNote(city, note);
    setNote('');
  };

  const handleFavourite = () => {
    if (!city) return;
    if (isFavourite) {
      deleteStoredFavourite(city);
      return;
    }

    setStoredFavourite(city);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (!city) return;
      setStoredCityInfo(getStoredCity(city));
      setStoredFavourites(getStoredFavourites());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [city]);

  return (
    <div>
      <div>
        <div className={styles.top_div}>
          <h1 className={styles.heading}>{`${city}`}</h1>
          <p>
            <button
              type="button"
              className="ghost_btn"
              onClick={handleFavourite}
            >
              <span className="sr-only">like city</span>
              <Icon
                title="heart"
                className={styles.like_icon}
                data-is-fave={isFavourite}
              />
            </button>
          </p>
        </div>
        <InfoBox cityWeather={cityWeather} />
      </div>

      <div className={styles.textarea_box}>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          value={note}
          placeholder="Enter Note..."
          onChange={(e) => setNote(e.target.value)}
          className={styles.textarea}
        />
        <button type="button" onClick={handleSave} className={styles.save_btn}>
          Save Note
        </button>
      </div>
      <h3 className={styles.heading3}>Saved Notes</h3>
      <ul className={styles.notes_container}>
        {!!storedCityInfo?.notes?.length &&
          storedCityInfo.notes.map((cityNote) => (
            <Note key={cityNote.id} note={cityNote} city={city || ''} />
          ))}
      </ul>
    </div>
  );
}

export default CityWeatherDetails;
