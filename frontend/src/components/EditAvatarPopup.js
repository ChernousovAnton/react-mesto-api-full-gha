import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

export default function EditAvatarPopup(props) {

  const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors} = useFormAndValidation();

  const avatarRef = React.useRef();
  React.useEffect(() => {
    resetForm();
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <fieldset className="form__set">
        <input 
          className="form__input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
          onChange={handleChange}
        />
        <span className="form__input-error link-error">{errors.link}</span>
      </fieldset>
    </PopupWithForm>
  )
}