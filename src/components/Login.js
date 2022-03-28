import { Header } from "./Header";

export function Login() {
    return(
        <section className="sign">
          <Header
          text="Регистрация"/>
          <h1 className="sign__title">Вход</h1>
          <form className="sign__form">
            <input className="sign__input" type="email" name="signInEmail" placeholder="Email"></input>
            <input className="sign__input" type="text" name="signInPassword" placeholder="Пароль"></input>
            <button className="sign__button" type="submit">Войти</button>
          </form>
        </section>
    )
}