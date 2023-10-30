export interface IWeatherInfo {
  current?: {
    temperature: number;
    cloudcover: number;
    feelslike: number;
    humidity: number;
    is_day: string;
    observation_time: string;
    precip: number;
    pressure: number;
    uv_index: number;
    visibility: number;
    weather_descriptions: string[];
    weather_icons: string[];
    wind_degree: number;
    wind_dir: string;
    wind_speed: number;
  };
  success?: boolean;
  error?: { type: string };
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
