import Popup from "./Popup";

function ImagePopup({ onClose, ...props }) {
  return (
    <Popup
      isOpen={props.card.link === "" ? false : true}
      name={"card"}
      onClose={onClose}
    >
      <img
        className="popup__card-image"
        src={props.card.link === "" ? "#" : props.card.link}
        alt={props.card.name === "" ? "#" : props.card.name}
      />
      <p className="popup__figcaption">
        {props.card.name === "" ? "#" : props.card.name}
      </p>
    </Popup>
  );
}

export default ImagePopup;
