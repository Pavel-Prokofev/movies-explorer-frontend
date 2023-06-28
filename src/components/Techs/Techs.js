import React from 'react';

import './Techs.css';

import { techsArrForTechs } from '../../utils/constants.js';

import MainContentBox from '../MainContentBox/MainContentBox.js';
import Element from '../Element/Element.js';

function Techs(props) {

  const listOfTechs = techsArrForTechs.map((tech) => <Element key={tech.id}>
    <li className="techs__list-item">{tech.title}</li>
  </Element>);

  return (
    <MainContentBox primaryBackground={false} id='techs' headingText='Технологии'>
      <div className="techs">
        <h3 className="techs__subheading">7 технологий</h3>
        <p className="techs__text-content">На курсе веб-разработки мы освоили технологии, которые применили в дипломном&nbsp;проекте.</p>
        <ul className="techs__list">
          {listOfTechs}
        </ul>
      </div>
    </MainContentBox>
  );
};

export default Techs;