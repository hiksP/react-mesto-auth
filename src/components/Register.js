import { useRef } from "react";

export function Register({onRegister}) {

  // создаем рефы
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
}

    return(
        <section className="sign">
          <h1 className="sign__title">Регистрация</h1>
          <form onSubmit={handleSubmit} className="sign__form">
            <ul className="sign__list">
              <input className="sign__input" ref={emailRef} defaultValue={''} required type="email" name="signUpEmail" placeholder="Email"></input>
              <input className="sign__input" ref={passwordRef} defaultValue={''} required type="text" name="signUpPassword" placeholder="Пароль"></input>
            </ul>
            <button className="sign__button" type="submit">Зарегистрироваться</button>
            <a className="sign__reminder">Уже зарегистрированы? Войти</a>
          </form>
        </section>
    )
}