import { Header } from "./Header";

export function Register() {
    return(
        <section className="sign">
          <Header
          text="Регистрация"/>
          <h1 className="sign__title">Регистрация</h1>
          <form className="sign__form">
            <input type="email" name="signUpEmail" placeholder="Email" className="sign__input"></input>
            <input type="text" name="signUpPassword" placeholder="Пароль" className="sign__input"></input>
          </form>
          <button type="submit">Зарегистрированы</button>
          <a className="">Уже зарегистрированы? Войти</a>
        </section>
    )
}