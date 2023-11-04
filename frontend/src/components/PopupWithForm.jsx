import Popup from "./Popup";

function PopupWithForm({ isOpen, name, onClose, isValid, ...props }) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h3 className="popup__title">{props.title}</h3>
      <form className="form" name={`${name}-form`} onSubmit={props.onSubmit}>
        {props.children}
        <button
          className={
            isValid
              ? "form__submit"
              : "form__submit form__submit_inactive"
          }
          type="submit"
          disabled={!isValid}
        >
          {props.buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
