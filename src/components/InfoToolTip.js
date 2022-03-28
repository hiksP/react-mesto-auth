import Success from "../images/RegisterSuccess.svg";
import Fail from "../images/RegisterFail.svg";

export function InfoToolTip() {
    return (
      <div className="popup popup_opened">
        <div className="popup__overlay"></div>
        <div className="popup__container popup__container_registration">
          <button className="popup__close" type="button"></button>
          <img className="popup__registration-image" src={Success}/>
          <a className="popup__registration-message">Вы успешно зарегистрировались!</a>
        </div>
      </div>
    )
}