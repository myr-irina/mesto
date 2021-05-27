import Card from "../../src/components/Сards.js";
import initialCards from "../utils/initial-cards.js";
import FormValidation from "../components/FormValidator.js";
import {
  profilePopup,
  profileAvatar,
  cardPopup,
  imgPopup,
  profileOpenButton,
  cardPopupOpen,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  container,
  cardPopupForm,
  validationConfig,
  profileFormElement,
  templateElement,
  deletePopup,
  
  avatarUpdatePopup,
  profileAvatarButton,
} from "../utils/variables.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";
import PopupWithDeleteForm from "../components/PopupWithDeleteForm.js";

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-24",
  token: "4efae440-5715-4ca9-8417-962742ac588e",
});

const createCard = (data) => {
  const card = new Card(data, templateElement, {
    handleCardClick() {
      popupWithImage.open(data);
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    // items: initialCards,
    renderer: (data) => {
      cardsList.addItem(createCard(data));
    },
  },
  container
);

// Пп 1 и 2: загрузка инфо пользователя с сервера и карточек
Promise.all([api.getUserData(), api.getInitialCards()]).then(
  ([userData, initialCards]) => {
    userinfo.setUserInfo(userData.name, userData.about, userData.avatar);
    cardsList.renderItems(initialCards);
  }
);

const userinfo = new UserInfo({
  name: profileTitle,
  about: profileSubtitle,
  avatar: profileAvatar,
});

const popupWithImage = new PopupWithImage(imgPopup);
const addCardPopup = new PopupWithForm(cardPopup, addCardSubmitHandler);
const editProfilePopup = new PopupWithForm(profilePopup, editFormSubmitHandler);
const deleteCardPopup = new PopupWithDeleteForm(deletePopup, deleteCardHandler);
const formAddCardValidator = new FormValidation(
  validationConfig,
  cardPopupForm
);

const formEditCardValidator = new FormValidation(
  validationConfig,
  profileFormElement
);

//  п.9 Обновление аватара
const updateAvatarPopup = new PopupWithForm(avatarUpdatePopup, avatarPopupSubmitHandler);

function avatarPopupSubmitHandler(data) {

  const updateAvatar = document.querySelector('.popup_type_update')
  const buttonText = updateAvatar.querySelector(".popup__button");
  
  buttonText.textContent = "Сохранение...";  
    api.updateAvatar(data.avatar)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    })
    .then((res) => {
      buttonText.textContent = "Сохранение";
      document.querySelector(profileAvatar).src = res.avatar;
    })
    .catch(err => console.log(`Ошибка при загрузке фотографии: ${err}`));
};

function deleteCardHandler() {}

// 3. редактирование профиля
function editFormSubmitHandler(data) {
  const buttonText = profilePopup.querySelector(".popup__button");
  buttonText.textContent = "Сохранение...";

  api.setUserData(data)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    })
    .then((res) => {
      userinfo.setUserInfo(res.name, res.about);
      buttonText.textContent = "Сохранение";
      editProfilePopup.close();
    })
    .catch((err) => console.log(`Ошибка при загрузке карточки: ${err}`));
}

// п.4 добавление новой карточки
function addCardSubmitHandler(data) {

  const addCard = document.querySelector('.popup_type_new-card')
  const buttonText = addCard.querySelector(".popup__button");
  buttonText.textContent = "Сохранение...";

  api
    .createCard(data)
    
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    })
    .then((res) => {
      cardsList.addItem(createCard(res));
      buttonText.textContent = "Сохранение";
      addCardPopup.close();
    })
    .catch((err) => console.log(`Ошибка при загрузке карточки: ${err}`));
}

profileOpenButton.addEventListener("click", () => {
  nameInput.value = userinfo.getUserInfo().name;
  jobInput.value = userinfo.getUserInfo().about;
  editProfilePopup.open();
  formEditCardValidator.reset();
});

cardPopupOpen.addEventListener("click", () => {
  addCardPopup.open();
  formAddCardValidator.reset();
});

profileAvatarButton.addEventListener('click', () => {
  updateAvatarPopup.open();
})


updateAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
formAddCardValidator.enableValidation();
formEditCardValidator.enableValidation();
