import headerLogo from "../images/headerLogo.svg";

export function Header() {
    return(
        <header className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип Mesto"/>
      </header>
    );
};