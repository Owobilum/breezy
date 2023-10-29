import { ReactElement } from 'react';

import Header from '../../components/header/Header';
import LargestCities from '../../components/largest-cities/LargestCities';
import FavouriteCities from '../../components/favourite-cities/FavouriteCities';

function Home(): ReactElement {
  return (
    <div>
      {/* <Header /> */}
      <div>
        <FavouriteCities />
        <LargestCities />
      </div>
    </div>
  );
}

export default Home;
