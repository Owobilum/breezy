export interface IWeatherInfo {
  current: {
    temperature: number;
  };
}

export interface INote {
  id: number;
  text: string;
}

export interface ISearchResult {
  formatted: string;
  confidence: number;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}
