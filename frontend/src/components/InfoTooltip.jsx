import Popup from "./Popup";

function InfoTooltip({ infoTooltipState, onClose }) {
  return (
    <Popup isOpen={infoTooltipState.isOpen} name={"tooltip"} onClose={onClose}>
      <div
        className={`tooltip__sign ${
        infoTooltipState.type === "success"
        ? "tooltip__sign_type_success"
        : "tooltip__sign_type_failure"
        }`}
      ></div>
      <h3 className="tooltip__title">
        {infoTooltipState.type === "success"
        ? "Вы успешно зарегистрировались!"
        : "Что-то пошло не так! Попробуйте ещё раз."}
      </h3>
    </Popup>
  )
}

export default InfoTooltip;
