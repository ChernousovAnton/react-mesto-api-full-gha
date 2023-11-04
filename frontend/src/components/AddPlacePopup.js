import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from '../hooks/useFormAndValidation';

export default function AddPlacePopup(props) {

  const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors} = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({name: values.name, link: values.link});
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="form__set">
        <input
          className="form__input"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChange}
          value={values.name || ''}
        />
        <span className="form__input-error name-error">{errors.name}</span>
      </fieldset>
      <fieldset className="form__set">
        <input 
          className="form__input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values.link || ''}
        />
        <span className="form__input-error link-error">{errors.link}</span>
      </fieldset>
    </PopupWithForm> 
  )
}
