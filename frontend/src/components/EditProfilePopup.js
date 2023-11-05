import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setValues, setErrors} = useFormAndValidation();

  React.useEffect(() => {
    setErrors({});
    setValues({name: currentUser.name, about:currentUser.about});
    
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm 
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="form__set">
        <input
          className="form__input"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={values.name || ''}
          onChange={handleChange}
          required
        />
        <span className="form__input-error name-error">{errors.name}</span>
      </fieldset>
      <fieldset className="form__set">
        <input
          className="form__input"
          type="text"
          name="about"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          value={values.about || ''}
          onChange={handleChange}
          required
        />
        <span className="form__input-error about-error">{errors.about}</span>
      </fieldset>
    </PopupWithForm>
  )
}
