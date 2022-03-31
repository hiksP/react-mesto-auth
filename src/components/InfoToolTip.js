import { useEffect } from "react";

export function InfoToolTip({image, isOpen, onClose, message}) {

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
  
    document.addEventListener("keydown", handleEscClose);
  
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []); 
  
    return (
      <div className={isOpen ? `popup popup_sign popup_opened` : `popup popup_sign`}>
        <div className="popup__overlay"></div>
        <div className="popup__container popup__container_registration">
          <button className="popup__close" onClick={onClose} type="button"></button>
          <img className="popup__registration-image" src={image}/>
          <a className="popup__registration-message">{message}</a>
        </div>
      </div>
    )
}