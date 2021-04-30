// Находим модальные окна
export const profilePopup = document.querySelector(".popup_type_edit");
export const cardPopup = document.querySelector(".popup_type_new-card");
export const imgPopup = document.querySelector(".popup_type_image");

// Находим кнопки открытия модальных окон
export const profileOpenButton = document.querySelector("#show-popup");
export const cardPopupOpen = document.querySelector(".profile__button");
export const imgPreviewTargetImg = imgPopup.querySelector(".popup__image");

// Находим кнопки закрытия модальных окон
export const profileCloseButton = profilePopup.querySelector(".popup__close");
export const cardPopupClose = cardPopup.querySelector(".popup__close");
export const imgPopupClose = imgPopup.querySelector(".popup__close");

//Находим форму в DOM
export const profileFormElement = document.querySelector(".popup__field-form");
export const nameInput = profileFormElement.querySelector(".popup__field-input-name");
export const jobInput = profileFormElement.querySelector(".popup__field-input-about");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");

//Находим форму для добавления карточек в DOM
export const cardPopupInputName = cardPopup.querySelector(".popup__field-input-description");
export const cardPopupInputLink = cardPopup.querySelector(".popup__field-input-link");

export const cardPopupButton = document.querySelector(".popup__button");
export const container = document.querySelector(".elements__list");
export const cardPopupForm = document.querySelector(".popup__field-form-card");

// Попап изображений
export const imgPreviewTargetCaption = imgPopup.querySelector(".popup__caption");
export const templateElement = document
  .querySelector("#template")
  .content.querySelector(".elements__list-item"); //выберем элемент, который потом будем клонировать


export const validationConfig =  {
  form: '.popup__field-form',
  inputSelector: ".popup__field-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error_active",
  errorOutline: ".popup__input-error",
};


// export {profilePopup, cardPopup, imgPopup, profileOpenButton, cardPopupOpen, imgPreviewTargetImg, profileCloseButton, cardPopupClose, imgPopupClose, nameInput, jobInput, profileTitle, profileSubtitle, cardPopupInputName, cardPopupInputLink, cardPopupButton, container, cardPopupForm, imgPreviewTargetCaption, templateElement, validationConfig, profileFormElement};