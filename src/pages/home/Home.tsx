import { ReactElement } from 'react';

import LargestCities from '../../components/largest-cities/LargestCities';
import FavouriteCities from '../../components/favourite-cities/FavouriteCities';

function Home(): ReactElement {
  return (
    <div>
      <FavouriteCities />
      <LargestCities />
    </div>
  );
}

export default Home;
