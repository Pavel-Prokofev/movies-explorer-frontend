import React from 'react';

import './AboutMe.css';

import MainContentBox from '../MainContentBox/MainContentBox.js';
import Portfolio from '../Portfolio/Portfolio.js';
import myPhoto from '../../images/photo_for_about_me.jpg';

function AboutMe(props) {
  return (
    <MainContentBox primaryBackground={true} id='about-me' headingText='Студент'>
      <div className="about-me">
        <img className="about-me__photo" src={myPhoto} alt="Фото автора сайта" />
        <div className="about-me__info-box">
          <div>
            <h3 className="about-me__subheading">Павел</h3>
            <p className="about-me__bio">Фронтенд-разработчик, 39 лет</p>
            <p className="about-me__text-content">
              Почему я решил поменять профессию и выбрал именно Фронт-энд, ну как вам сказать.
              Понимаете, была среда, я встал с левой ноги,
              а Венера как раз находилась в созвездии стрельца
              и увидев все эти знаки я понял,
              это однозначное указание от высших сфер,
              пора, пора менять профессию, и направить свои устремления
              мне долженствует в строну IT.
              И тут, тихонько загудевший, в фа мажоре 2ой октавы,
              кулер компа недвусмысленно намекнул,
              что менять надо именно на Фронт-энд разработку.
              Так и начался мой путь в IT.
            </p>
          </div>
          <a className="about-me__link" href="https://github.com/Pavel-Prokofev" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
      <Portfolio />
    </MainContentBox>
  );
};

export default AboutMe;