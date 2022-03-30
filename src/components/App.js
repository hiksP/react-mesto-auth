import React, {useState, useEffect} from 'react';
import {Header} from './Header.js';
import {Main} from './Main.js';
import {Footer} from './Footer.js';
import {ImagePopup} from './ImagePopup.js';
import {api} from "../utils/Api.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import {Card} from "./Card.js";
import { Login } from "./Login.js";
import { Register } from "./Register.js";
import { InfoToolTip } from "./InfoToolTip";
import { Routes, Route, useNavigate } from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute.js"
import { authApi } from '../utils/authApi.js';

function App() {
// стейт перменные попапов
  
const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState(null);

// стейт карточек

const [cards, setCards] = useState([]);

// стейт логина

const [loggedIn, setLoggedIn] = useState(true);

// стейт с данными пользователя 

const [currentUser, setCurrentUser] = useState({})

// установка данных текущего пользователя 
useEffect(() => {
  api.getUserInfo()
  .then(res => {
    setCurrentUser(res)
  })
  .catch(err => {
    console.log(err);
  })
},[])

// обработчики открытия попапов

const handleEditAvatarClick = () => {
  setEditAvatarPopupOpen(true);
}

const handleEditProfileClick = () => {
  setEditProfilePopupOpen(true);
}

const handleAddPlaceClick = () => {
  setAddPlacePopupOpen(true);
}

const handleCardClick  = (card) => {
  setSelectedCard(card);
}

// хендлеры обновления данных пользователя 

 const handleUpdateUser = (user) => {
  api.editInfo(user.name, user.about)
  .then(res => {
    setCurrentUser(res)
  })
  .catch(err => {
    console.log(err)
  })
  closeAllPopups();
 }

 const handleUpdateAvatar = (input) => {
    api.changeAvatar(input.avatar)
    .then(res => {
      setCurrentUser(res)
    })
    .catch(err => {
      console.log(err)
    })
    closeAllPopups();
 } 

 // передача данных логина на сервер
  const signIn = (input) => {
    authApi.signIn(input.email, input.password)
    .then((res) => {
      console.log(res);
    })
  }

  // передача данных для рпегистрации
  const handleRegister = (input) => {
    authApi.signUp(input.email, input.password)
    .then((res) => {
      console.log(res);
    })
  }

// закрытие всех попапов

const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
}

  // загрузка карточек

  useEffect(() => {
    api.getCards()
    .then(res => {
      setCards(res);
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

    // функция лайка карточки

    function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }  

    // функция удаления карточки

    function handleCardDelete(card) {
      // проверяем являемся ли мы владельцем карточки
      const isMine = card.owner._id === currentUser._id;
  
      // отправляем запрос на удаление карточки
      api.deleteCard(card._id, isMine)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
    }

    // функция добавления карточки

    function handleAddPlaceSubmit(newCard) {
      api.uploadCard(newCard.placeName, newCard.placeUrl)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch(err => {
        console.log(err);
      })
      closeAllPopups();
    }

  // обработка массива с карточками

  const sectionWithCards = () => {
    if (cards.length > 0) {
      return cards.map((cardInfo) => (
         <Card card={cardInfo} onCardLike={handleCardLike} onCardDelete={handleCardDelete} key={cardInfo._id} selectedCard={handleCardClick} />
      ));
    }
  };


// вся разметка сайта

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__size">
      <Header
      text=""/>
        <Routes>
          <Route path="/sign-in" element={<Login
            onLogin={signIn}/>} />
          <Route path="/sign-up" element={<Register
            onRegister={handleRegister}/>} />
          <Route path="/" element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={
              <Main
              cards={sectionWithCards()}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} />}
            />} 
          />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard} />
    </div>
  </div>
</CurrentUserContext.Provider>
  );
}

export default App;
