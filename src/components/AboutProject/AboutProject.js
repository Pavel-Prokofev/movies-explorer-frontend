import React from 'react';

import './AboutProject.css';

import MainContentBox from '../MainContentBox/MainContentBox.js';

function AboutProject(props) {
  return (
    <MainContentBox primaryBackground={true} id='about-project' headingText='О проекте'>
      <div className="about-project">
        <div className="about-project__text-box">
          <h3 className="about-project__subheading about-project__hed1">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text-content about-project__text1">Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.</p>
          <h3 className="about-project__subheading about-project__hed2">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text-content about-project__text2">У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__graph">
          <span className="about-project__size-back-end about-project__centering">1 неделя</span>
          <span className="about-project__size-front-end about-project__centering">4 недели</span>
          <span className="about-project__label">Back-end</span>
          <span className="about-project__label">Front-end</span>
        </div>
      </div>
    </MainContentBox>
  );
};

export default AboutProject;