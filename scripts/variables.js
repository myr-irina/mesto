// Находим модальные окна
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imgPopup = document.querySelector(".popup_type_image");

// Находим кнопки открытия модальных окон
const profileOpenButton = document.querySelector("#show-popup");
const cardPopupOpen = document.querySelector(".profile__button");
const imgPreviewTargetImg = imgPopup.querySelector(".popup__image");

// Находим кнопки закрытия модальных окон
const profileCloseButton = profilePopup.querySelector(".popup__close");
const cardPopupClose = cardPopup.querySelector(".popup__close");
const imgPopupClose = imgPopup.querySelector(".popup__close");

//Находим форму в DOM
const profileFormElement = document.querySelector(".popup__field-form");
const nameInput = profileFormElement.querySelector(".popup__field-input-name");
const jobInput = profileFormElement.querySelector(".popup__field-input-about");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

//Находим форму для добавления карточек в DOM
const cardPopupInputName = cardPopup.querySelector(".popup__field-input-description");
const cardPopupInputLink = cardPopup.querySelector(".popup__field-input-link");

const cardPopupButton = document.querySelector(".popup__button");
const container = document.querySelector(".elements__list");
const cardPopupForm = document.querySelector(".popup__field-form-card");

// Попап изображений
const imgPreviewTargetCaption = imgPopup.querySelector(".popup__caption");
const templateElement = document
  .querySelector("#template")
  .content.querySelector(".elements__list-item"); //выберем элемент, который потом будем клонировать


const validationConfig =  {
  form: '.popup__field-form',
  inputSelector: ".popup__field-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error_active",
  errorOutline: ".popup__input-error",
};


export {profilePopup, cardPopup, imgPopup, profileOpenButton, cardPopupOpen, imgPreviewTargetImg, profileCloseButton, cardPopupClose, imgPopupClose, nameInput, jobInput, profileTitle, profileSubtitle, cardPopupInputName, cardPopupInputLink, cardPopupButton, container, cardPopupForm, imgPreviewTargetCaption, templateElement, validationConfig};