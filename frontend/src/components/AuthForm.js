import React from "react";

function AuthForm({ onSubmit, titleText, btnText, children }) {
  const [userData, setUserData] = React.useState("");

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(userData);
  }

  return (
    <div className="auth">
      <p className="auth__welcome">{titleText}</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          value={userData.password || ""}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <button className="auth__submit" type="submit">
          {btnText}
        </button>
        {children}
      </form>
    </div>
  );
}

export default AuthForm;