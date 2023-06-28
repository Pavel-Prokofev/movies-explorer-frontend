import React from 'react';

import './Portfolio.css';

import { linksArrForPortfolio } from '../../utils/constants.js';

import Element from '../Element/Element.js';

function Portfolio(props) {

  const listOfPortfoliolinks = linksArrForPortfolio.map((link) => <Element key={link.id}>
    <li className="portfolio__artifact">
      <a href={link.href} className="portfolio__artifact-link" target="_blank" rel="noreferrer">
        <span className="portfolio__artifact-link-label">{link.title}</span>
        <div className="portfolio__artifact-link-icon"></div>
      </a>
    </li>
  </Element>);

  return (
    <section className="portfolio">
      <h3 className="portfolio__subheading">Портфолио</h3>
      <ul className="portfolio__artifacts-box">
        {listOfPortfoliolinks}
      </ul>
    </section>
  );
};

export default Portfolio;