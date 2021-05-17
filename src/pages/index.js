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
} from "../utils/variables.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import "./index.css";

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

const userinfo = new UserInfo({
  name: profileTitle,
  about: profileSubtitle,
});

const popupWithImage = new PopupWithImage(imgPopup);
const addCardPopup = new PopupWithForm(cardPopup, addCardSubmitHandler);
const editProfilePopup = new PopupWithForm(profilePopup, editFormSubmitHandler);
const formAddCardValidator = new FormValidation(
  validationConfig,
  cardPopupForm
);

const formEditCardValidator = new FormValidation(
  validationConfig,
  profileFormElement
);

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

  cardsList.addItem(card);
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
