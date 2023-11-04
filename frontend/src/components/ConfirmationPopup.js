import PopupWithForm from "./PopupWithForm"

export default function ConfirmationPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onConfirmation();
  }
  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      buttonText={props.isLoading ? "Удаление..." : "Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}