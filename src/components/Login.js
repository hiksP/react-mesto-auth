import { Header } from "./Header";

export function Login() {
    return(
        <section className="sign">
          <Header
          text="Вход"/>
          <h1 className="sign__title">Вход</h1>
          <form className="sign__form">
            <input type="email" name="signInEmail" placeholder="Email" className="sign__input"></input>
            <input type="text" name="signInPassword" placeholder="Пароль" className="sign__input"></input>
          </form>
          <button type="submit">Войти</button>
        </section>
    )
}