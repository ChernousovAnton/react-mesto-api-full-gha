import React from "react";
import { useLocation, Link } from "react-router-dom";
import { LoggedUserContext } from "../contexts/LoggedUserContext";

function Header({handleLogout}) {
  const loggedUser = React.useContext(LoggedUserContext)
  const location = useLocation();
  return (
    <header className="header">
      <div className="header__logo"></div>
      <nav className="header__nav">
        {
        location.pathname == "/signin" ? <Link to="/signup" className="header__nav-element">Регистрация</Link> : 
        location.pathname == "/signup" ? <Link to="/signin" className="header__nav-element">Войти</Link> : 
        <>
          <Link to="/" className="header__nav-element">{loggedUser.email}</Link>
          <Link to="/signin" className="header__nav-element" onClick={handleLogout}>Выйти</Link>
          </>
        }
      </nav>
    </header>
  )
}

export default Header;