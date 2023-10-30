import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import Search from '../search/Search';
import { getTodaysDate } from '../../utils';

function Header(): ReactElement {
  return (
    <header className={styles.container}>
      <Link to="/" className={styles.logo}>
        Breezy
      </Link>
      <Search />
      <p className={styles.date}>{getTodaysDate()}</p>
    </header>
  );
}

export default Header;
