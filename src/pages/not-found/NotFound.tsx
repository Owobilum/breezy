import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

function NotFound(): ReactElement {
  return (
    <>
      <h1>Pahe Not Found</h1>
      <Link to="/">Go Home</Link>
    </>
  );
}

export default NotFound;
