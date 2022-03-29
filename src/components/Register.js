export function Register() {
    return(
        <section className="sign">
          <h1 className="sign__title">Регистрация</h1>
          <form className="sign__form">
            <ul className="sign__list">
              <input className="sign__input" type="email" name="signUpEmail" placeholder="Email"></input>
              <input className="sign__input" type="text" name="signUpPassword" placeholder="Пароль"></input>
            </ul>
            <button className="sign__button" type="submit">Зарегистрироваться</button>
            <a className="sign__reminder">Уже зарегистрированы? Войти</a>
          </form>
        </section>
    )
}