import React from 'react';

import './NavigationPopup.css';

function NavigationPopup(props) {

  React.useEffect(() => {
    if (props.navigationPopupIsOpen) {
      document.addEventListener('click', props.handleCloseEvent);
      document.addEventListener('keydown', props.handleCloseEvent);
    };
    return () => {
      document.removeEventListener('click', props.handleCloseEvent);
      document.removeEventListener('keydown', props.handleCloseEvent);
    };
  }, [props.navigationPopupIsOpen]);

  return (
    <div className={`navigation-popup ${props.navigationPopupIsOpen ? 'navigation-popup_opened' : ''}`}>
      <div className={`navigation-popup__content-box ${props.navigationPopupIsOpen ? 'navigation-popup__content-box_opened' : ''}`}>
        <button type="button" className="navigation-popup__close-button"></button>
        {props.children}
      </div>
    </div>
  );
};

export default NavigationPopup;