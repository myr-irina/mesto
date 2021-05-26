import Card from "../../src/components/Сards.js";
import initialCards from "../utils/initial-cards.js";
import FormValidation from "../components/FormValidator.js";
import {
  profilePopup,
  cardPopup,
  imgPopup,
  profileOpenButton,
  cardPopupOpen,
  imgPreviewTargetImg,
  profileCloseButton,
  cardPopupClose,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  cardPopupInputName,
  cardPopupInputLink,
  container,
  cardPopupForm,
  imgPreviewTargetCaption,
  validationConfig,
  profileFormElement,
  templateElement,
  elementImage,
  cardPopupButton,
  deletePopup,
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
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      cardsList.addItem(cardElement);
    },
  },
  container
);


// api
//   .getInitialCards()
//   .then((result) => {
//     cardsList.renderItems(result);
//   })
//   .catch((err) => {
//     console.log(`Ошибка при получении карточек: ${err}`); // выведем ошибку в консоль
//   });

// api
//   .getUserData()
//   .then((userData) => {
//     console.log(userData);
//     user = userData;
//   })
//   .catch((err) => {
//     console.log(`Ошибка при получении данных пользователя: ${err}`); // выведем ошибку в консоль
//   });

Promise.all([api.getUserData(), api.getInitialCards()]).then(
  ([userData, cards]) => {    
    userinfo.setUserInfo(userData.name, userData.about);
    cardsList.renderItems(cards);
    
  }
);





const userinfo = new UserInfo({
  name: profileTitle,
  about: profileSubtitle,
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

function deleteCardHandler() {}

function editFormSubmitHandler(data) {
  userinfo.setUserInfo(data.name, data.about);
  editProfilePopup.close();
}

profileOpenButton.addEventListener("click", () => {
  nameInput.value = userinfo.getUserInfo().name;
  jobInput.value = userinfo.getUserInfo().about;
  editProfilePopup.open();
  formEditCardValidator.reset();
});

function addCardSubmitHandler(data) {
  const card = createCard(data);
// здесь кнопка сохренение..
  cardsList.addItem(card);
  // здесь убираем кнопку сохренение..
  addCardPopup.close();
  
}

cardPopupOpen.addEventListener("click", () => {
  addCardPopup.open();
  formAddCardValidator.reset();
});

cardsList.renderItems();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
formAddCardValidator.enableValidation();
formEditCardValidator.enableValidation();
