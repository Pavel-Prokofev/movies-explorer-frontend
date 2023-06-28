import React from 'react';

import './MainContentBox.css';

function MainContentBox(props) {
  return (
    <section className={`main-content-box ${props.primaryBackground ? "main-content-box_primary-background-color" : "main-content-box_alter-background-color"}`}>
      <h2 className="main-content-box__heading" id={props.id}>{props.headingText}</h2>
      {props.children}
    </section>
  );
};

export default MainContentBox;