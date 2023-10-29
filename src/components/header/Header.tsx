import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import Search from '../search/Search';

function Header(): ReactElement {
  return (
    <header className={styles.container}>
      <Link to="/">Logo</Link>
      <Search />
      <div>Hi</div>
    </header>
  );
}

export default Header;
