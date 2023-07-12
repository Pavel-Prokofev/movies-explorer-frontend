import './Footer.css';

import { linksArrForFooter } from '../../utils/constants.js';

import Element from '../Element/Element.js';

function Footer(props) {

  const listOfFooterlinks = linksArrForFooter.map((link) => <Element key={link.id}>
    <li className="footer__link-box">
      <a href={link.href} className="footer__link" target="_blank" rel="noreferrer">{link.title}</a>
    </li>
  </Element>);

  return (
    <footer className="footer">
      <span className="footer__subheading">Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className="footer__box">
        <ul className="footer__links-box">
          {listOfFooterlinks}
        </ul>
        <span className="footer__copyright" lang="en">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;