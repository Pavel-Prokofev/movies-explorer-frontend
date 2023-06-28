import { Link } from 'react-router-dom';

import headerLogo from '../../images/logo/logo_header.svg';

import './Logo.css';

function Logo() {
  return (
    <Link to='/' className="logo"><img src={headerLogo} alt="Обозреватель фильмов" /></Link>
  )

}

export default Logo;