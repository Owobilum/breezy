import type { INote, IWeatherInfo } from '../types';

const FAVOURITES_KEY = 'breezy_favourties';

// helper to get city weather from localstorage
export function getStoredCity(city: string): {
  weather: IWeatherInfo | null;
  notes: INote[] | null;
  storedAt: number;
} | null {
  const storedCity = localStorage.getItem(city);
  return storedCity ? JSON.parse(storedCity) : null;
}

export function setStoredCityWeather(
  city: string,
  weather: IWeatherInfo
): void {
  const storedAt = Date.now();
  const storedCity = getStoredCity(city);

  if (!storedCity) {
    localStorage.setItem(
      city,
      JSON.stringify({ weather, notes: null, storedAt })
    );
    return;
  }
  localStorage.setItem(
    city,
    JSON.stringify({ ...storedCity, weather, storedAt })
  );
  window.dispatchEvent(new Event('storage'));
}

export function setStoredCityNote(city: string, note: string): void {
  const storedCity = getStoredCity(city);

  const storedAt = Date.now();

  const noteObject: INote = {
    text: note,
    id: Date.now(),
  };
  if (!storedCity) {
    localStorage.setItem(
      city,
      JSON.stringify({ notes: [noteObject], weather: null, storedAt })
    );
    window.dispatchEvent(new Event('storage'));
    return;
  }

  if (!storedCity.notes) {
    localStorage.setItem(
      city,
      JSON.stringify({ ...storedCity, notes: [noteObject] })
    );
    window.dispatchEvent(new Event('storage'));
    return;
  }

  localStorage.setItem(
    city,
    JSON.stringify({ ...storedCity, notes: [...storedCity.notes, noteObject] })
  );
  window.dispatchEvent(new Event('storage'));
}

export function editStoredCityNote(city: string, note: INote): void {
  const storedCity = getStoredCity(city);

  if (
    !storedCity ||
    !storedCity.notes ||
    storedCity.notes.findIndex((storedNote) => storedNote.id === note.id) === -1
  ) {
    return;
  }

  localStorage.setItem(
    city,
    JSON.stringify({
      ...storedCity,
      notes: storedCity.notes.map((storedNote) => {
        if (storedNote.id === note.id) {
          return note;
        }
        return storedNote;
      }),
    })
  );

  window.dispatchEvent(new Event('storage'));
}

export function deleteStoredCityNote(city: string, noteId: number): void {
  const storedCity = getStoredCity(city);

  if (
    !storedCity ||
    !storedCity.notes ||
    storedCity.notes.findIndex((storedNote) => storedNote.id === noteId) === -1
  ) {
    return;
  }

  localStorage.setItem(
    city,
    JSON.stringify({
      ...storedCity,
      notes: storedCity.notes.filter((storedNote) => storedNote.id !== noteId),
    })
  );

  window.dispatchEvent(new Event('storage'));
}

export function getStoredFavourites(): string[] | null {
  const storedFavourties = localStorage.getItem(FAVOURITES_KEY);
  return storedFavourties ? JSON.parse(storedFavourties) : null;
}

export function setStoredFavourite(favourite: string) {
  const favourites = getStoredFavourites();
  if (!favourites) {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify([favourite]));
    window.dispatchEvent(new Event('storage'));
    return;
  }
  if (
    favourites.findIndex(
      (fave) => fave.toLowerCase() === favourite.toLowerCase()
    ) !== -1
  ) {
    return;
  }

  const newFavourites = [...favourites, favourite];
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(newFavourites));
  window.dispatchEvent(new Event('storage'));
}

export function deleteStoredFavourite(favourite: string) {
  const favourites = getStoredFavourites();
  if (!favourites) return;

  const newFavourites = favourites.filter(
    (fave) => fave.toLowerCase() !== favourite.toLowerCase()
  );

  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(newFavourites));
  window.dispatchEvent(new Event('storage'));
}

export function clearStoredCity(city: string): void {
  localStorage.removeItem(city);
}
