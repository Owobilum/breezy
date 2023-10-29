import { type ReactElement, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

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
    <div style={{ padding: 32 }}>
      <div>
        <p>{`city: ${city} temperature: ${cityWeather?.current.temperature}`}</p>
        <p>
          <button type="button" onClick={handleFavourite}>
            {isFavourite ? 'Unfavourite' : 'Make Favourite'}
          </button>
        </p>
      </div>

      <div>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="button" onClick={handleSave}>
          Save Note
        </button>
      </div>
      <div>
        <h3>Notes</h3>
        <ul>
          {!!storedCityInfo?.notes?.length &&
            storedCityInfo.notes.map((cityNote) => (
              <Note key={cityNote.id} note={cityNote} city={city || ''} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CityWeatherDetails;
