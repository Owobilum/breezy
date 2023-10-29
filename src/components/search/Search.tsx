/* eslint-disable jsx-a11y/label-has-associated-control */
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Search.module.css';
import useCitySearch from '../../hooks/useCitySearch';

function Search(): ReactElement {
  const [searchParam, setSearchParam] = useState('');
  const { searchResults: cities, state } = useCitySearch(searchParam);

  const hasSearchResults = !!cities?.length;

  const renderMessage = () => {
    if (state === 'loading') return 'Loading...';
    if (state === 'idle') return 'No results found';
    return '';
  };

  return (
    <section>
      <div className={styles.input_box}>
        <label htmlFor="search" className="sr-only">
          Search for City
        </label>
        <input
          id="search"
          className={styles.input}
          placeholder="Search City"
          onChange={(e) => setSearchParam(e.target.value)}
          value={searchParam}
        />
        <div
          className={`${styles.results}`}
          data-has-results={hasSearchResults && !!searchParam}
        >
          {hasSearchResults &&
            cities.map((city, i) => (
              <Link
                // eslint-disable-next-line react/no-array-index-key
                key={city.formatted + i}
                className={styles.result}
                to={`/cities/${city.formatted}`}
              >
                {city.formatted}
              </Link>
            ))}
        </div>
        {!!searchParam && !hasSearchResults && (
          <div className={`${styles.results}`}>
            <p className={styles.result} role="alert">
              {renderMessage()}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;
