import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../header/Header';
import useCurrentLocation from '../../hooks/useCurrentLocation';
// import useCityWeather from '../../hooks/useCityWeather';
import useCitySearch from '../../hooks/useCitySearch';

function Layout({ children }: PropsWithChildren): ReactElement {
  const navigate = useNavigate();
  const location = useCurrentLocation();
  const query = !location ? '' : `${location.latitude}+${location.longitude}`;
  const city = useCitySearch(query);
  const isOpenedRef = useRef<boolean>(false);

  const result = city?.searchResults && city.searchResults[0].formatted;

  //   useEffect(() => {
  //     if (!location?.latitude || !location.longitude) return;

  //     navigate(`/cities/${location.latitude},${location.longitude}`);

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [location?.latitude, location?.longitude]);
  useEffect(() => {
    if (!result || isOpenedRef.current) return;
    navigate(`/cities/${result}`);
    isOpenedRef.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <main>
      <Header />
      {children}
    </main>
  );
}

export default Layout;
