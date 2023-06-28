import React from 'react';

import './NavTab.css';

import { linksArrForNavTab } from '../../utils/constants.js';

import Element from '../Element/Element.js';

function NavTab(props) {

  const listOfNavTablinks = linksArrForNavTab.map((link) => <Element key={link.id}>
    <li><a href={link.href} className="nav-tab__link">{link.title}</a></li>
  </Element>
  );

  return (
    <nav className="nav-tab">
      <ul className="nav-tab__links-box">
        {listOfNavTablinks}
      </ul>
    </nav>
  );
};

export default NavTab;