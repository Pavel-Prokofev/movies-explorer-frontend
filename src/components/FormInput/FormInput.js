function FormInput(props) {
  return (<>
    <label className={`${props.display}__form-basic-label-text-format ${props.display}__form-label`}>{props.label}
      <input type={props.type} name={props.name} id={`${props.name}-${props.display}-input`}
        className={`${props.display}__form-basic-input-text-format ${props.display}__form-input ${props.input.inputValid ? '' : `${props.display}__form-input_invalid`}`}
        value={props.input.value} onChange={props.input.handleChangeValue} onFocus={props.input.onInput}
        placeholder={props.placeholder} />
    </label>
    <span className={`${props.display}__form-basic-input-text-format ${props.display}__form-input-error`}
      id={`${props.name}-${props.display}-input-error`}>{props.input.isDirty ? props.input.errorText : ''}</span>
  </>)
}

export default FormInput;