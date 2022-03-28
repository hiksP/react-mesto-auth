import headerLogo from "../images/headerLogo.svg";

export function Header({text}) {
    return(
        <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип Mesto"/>
        <a className="header__text">{text}</a>
      </header>
    );
};