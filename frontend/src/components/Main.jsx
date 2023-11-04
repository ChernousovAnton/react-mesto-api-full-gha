import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

	return (
    <main className="main">
      <section className="profile">
        <div className="profile__card">
          <button className="profile__avatar" onClick={props.onEditProfile}>
            <img className="profile__image" src={currentUser.avatar} alt={`Аватар ${currentUser.name}`}/>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-btn" type="button" onClick={props.onEditAvatar}></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section aria-label="фотографии мест">
        <ul className="elements">
          {props.cards.map(card =>
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          )}
        </ul>
      </section>
    </main>	
	)
}

export default Main;
