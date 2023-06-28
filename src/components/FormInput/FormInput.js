import React from 'react';

function FormInput(props) {
  return (<>
    <label className={`${props.display}__form-basic-label-text-format ${props.display}__form-label`}>{props.label}
      <input type={props.type} name={props.name} id={`${props.name}-${props.display}-input`}
        className={`${props.display}__form-basic-input-text-format ${props.display}__form-input`}
        value={props.value} onChange={props.handleChangeValue}
        placeholder={props.placeholder} required={props.required ? `required` : null} />
    </label>
    <span className={`${props.display}__form-basic-input-text-format ${props.display}__form-input-error`}
      id={`${props.name}-${props.display}-input-error`}>Поле для валидации ошибок</span>
  </>)
}

export default FormInput;