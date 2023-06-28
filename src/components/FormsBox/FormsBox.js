import './FormsBox.css';

import Logo from '../Logo/Logo.js';

function FormsBox(props) {

  return (
    <section className="forms-box" aria-label="Форма">
      <div className={`forms-box__wrap forms-box__wrap_${props.display}`}>
        {(props.display === 'signup' || props.display === 'signin') &&
          <div className="forms-box__logo-box">
            <Logo />
          </div>
        }
        <span className={`forms-box__heading forms-box__heading_${props.display}`}>{props.heading}</span>
        <form
          name={props.display}
          className="forms-box__telescopic-segment-wrap"
          noValidate onSubmit={props.hendleSubmit}
        >
          <div className="forms-box__telescopic-segment">
            {props.children}
          </div>
          <div
            className={`
                ${(props.editingDisabled & props.display === 'profile') ? 'forms-box__hide-element' : 'forms-box__buttons-wrap'}`}
          >
            <span className="forms-box__submit-button-error" id="form-submit-button-error">
              Поле ошибок при сабмите.
            </span>
            <button type="submit"
              className="forms-box__basic-button-and-link-format forms-box__button-opacity forms-box__form-submit-button"
              onClick={props.hendleSubmit}
            >
              {props.submitButtonTag}
            </button>
          </div>
        </form>
        <div
          className={`
              ${(!props.editingDisabled || props.display !== 'profile') ? 'forms-box__hide-element' : 'forms-box__buttons-wrap'}
           `}
        >
          <button type="button"
            className={`forms-box__basic-button-and-link-format forms-box__basic-button-and-link-format_${props.display} forms-box__link-opacity forms-box__button-editing`}
            onClick={props.hendleEditing}
          >
            {props.buttonEditingTag}
          </button>
          <button type="button"
            className={`forms-box__basic-button-and-link-format forms-box__basic-button-and-link-format_${props.display} forms-box__link-opacity forms-box__button-logged-out`}
            onClick={props.handleLoggedOut}
          >
            {props.buttonLoggedOutTag}
          </button>
        </div>
        {(props.display === 'signup' || props.display === 'signin') &&
          <span className={`forms-box__basic-button-signature-format forms-box__basic-button-signature-format_${props.display} forms-box__link-button-signature`}>
            {props.linkButtonSignature}
            <button type="button"
              className={`forms-box__basic-button-and-link-format forms-box__basic-button-and-link-format_${props.display} forms-box__link-opacity forms-box__link-button`}
              onClick={props.handleSwitchTo}
            >
              {props.linkButtonTag}
            </button>
          </span>
        }
      </div>
    </section >
  );
};

export default FormsBox;