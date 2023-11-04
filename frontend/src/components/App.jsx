import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from "./ImagePopup";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";
import PageNotFound from "./PageNotFound";
import api from "../utils/Api";
import apiAuth from "../utils/ApiAuth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { LoggedUserContext } from "../contexts/LoggedUserContext";
import ProtectedRoute from "./ProtectedRoute";
import { getToken, setToken, removeToken } from "../utils/token";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [deletedCard, setDeletedCard] = React.useState({});
  const [loggedUser, setloggedUser] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [infoTooltipState, setInfoTooltipState] = React.useState({
    isOpen: false,
    type: "",
  });

  const token = getToken();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => console.error(err));
  }, [loggedUser]);

  React.useEffect(() => {
    apiAuth.getContent(token)
      .then((dataUser) => {
        if (dataUser.data?.email) {
          setloggedUser(dataUser.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setCurrentUser(prev => ({...prev, isAuthCheck: true})))
  }, [token]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setInfoTooltipState({ isOpen: false, type: "" });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch((err) => console.error(err));
  }

  function handleConfirmCardDelete() {
    setLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateUser(data) {
    setLoading(true);
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(link) {
    setLoading(true);
    api
      .setUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .createCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  function handleDeleteButtonClick(card) {
    setIsConfirmationPopupOpen(true);
    setDeletedCard(card);
  }

  function handelLogin(dataUser) {
    apiAuth
      .authorise(dataUser)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
        }
        setloggedUser(dataUser);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleRegister(dataUser) {
    apiAuth
      .register(dataUser)
      .then((data) => {
        setInfoTooltipState({ isOpen: true, type: "success" });
      })
      .catch((err) => {
        setInfoTooltipState({ isOpen: true, type: "failure" });
      });
  }

  function onSignOut() {
    setloggedUser({});
    removeToken();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedUserContext.Provider value={loggedUser}>
        <div className="page">
          <Header handleLogout={onSignOut}/>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main
                    cards={cards}
                    onEditProfile={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteButtonClick}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <ProtectedRoute onlyUnAuth>
                  <AuthForm onSubmit={handelLogin} titleText={"Вход"} btnText={"Войти"}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute onlyUnAuth>
                  <AuthForm onSubmit={handleRegister} titleText={"Регистрация"} btnText={"Зарегистрироваться"}>
                  <p className="auth__signup">
                    Уже зарегистрированы?{" "}
                    {
                      <Link to="/signin" className="auth__signin-link">
                        Войти
                      </Link>
                    }
                  </p>
                  </AuthForm>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <InfoTooltip
            infoTooltipState={infoTooltipState}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onConfirmation={handleConfirmCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <Footer />
        </div>
      </LoggedUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
