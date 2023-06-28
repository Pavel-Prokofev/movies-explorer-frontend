import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import Logo from '../Logo/Logo.js';
import NavigationPopup from '../NavigationPopup/NavigationPopup.js';
import NavLinkBox from '../NavLinkBox/NavLinkBox.js'

function Header(props) {

  return (
    <>

      {(props.display !== '/signup' && props.display !== '/signin') &&
        <header className={`header ${props.display === '/' && 'header_background-main'}`}>
          <nav className="header__nav">
            <Logo />
            {!props.loggedIn ?
              (
                <div className="header__links-box">
                  <Link to='/signup' className="header__link header__link_loggedout header__link-opacity">Регистрация</Link>
                  <Link to='/signin' className="header__link header__link_loggedout header__link_signin header__button-opacity">Войти</Link>
                </div>
              )
              :
              (
                <>
                  <NavLinkBox location='header' />
                  {!props.navigationPopupIsOpen &&
                    (
                      <button type="button" className="header__burger-button header__button-opacity"
                        onClick={props.openNavigationPopup}>
                        <span className="header__burger-button-line"></span>
                        <span className="header__burger-button-line"></span>
                        <span className="header__burger-button-line"></span>
                      </button>
                    )
                  }
                </>
              )
            }
            <NavigationPopup handleCloseEvent={props.handleCloseEvent} navigationPopupIsOpen={props.navigationPopupIsOpen}>
              <NavLinkBox location='navigation-popup' closeNavigationPopup={props.closeNavigationPopup} />
            </NavigationPopup>
          </nav>
        </header>
      }

    </>
  );
};

export default Header;

// 