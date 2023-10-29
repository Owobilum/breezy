import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import NotFound from './pages/NotFound';
import CityWeatherDetails from './pages/city-weather-details/CityWeatherDetails';
import Layout from './components/layout/Layout';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities/:city" element={<CityWeatherDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
