import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Layout.module.css';
import Header from '../header/Header';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useCitySearch from '../../hooks/useCitySearch';

function Layout({ children }: PropsWithChildren): ReactElement {
  const navigate = useNavigate();
  const location = useCurrentLocation();
  const query = !location ? '' : `${location.latitude}+${location.longitude}`;
  const city = useCitySearch(query);
  const isOpenedRef = useRef<boolean>(false);

  const result = city?.searchResults && city.searchResults[0].formatted;

  useEffect(() => {
    if (!result || isOpenedRef.current) return;
    navigate(`/cities/${result}`);
    isOpenedRef.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <main className={styles.container}>
      {/* <div className={styles.content_box}> */}
      <Header />
      {children}
      {/* </div> */}
    </main>
  );
}

export default Layout;
