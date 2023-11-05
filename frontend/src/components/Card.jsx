import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card?.owner === currentUser._id;
  const isLiked = props.card?.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`;
  
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className='card__trash card__trash_active' onClick={handleDeleteClick} />} 
    </li>
  );
}

export default Card;