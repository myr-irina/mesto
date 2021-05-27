// Находим модальные окна
export const profilePopup = ".popup_type_edit";
export const cardPopup = ".popup_type_new-card";
export const imgPopup = ".popup_type_image";
export const deletePopup = ".popup_type_delete";
// export const avatarPopup = ".popup_type_update";
export const avatarUpdatePopup = ".popup_type_update"

// Находим кнопки открытия модальных окон
export const profileOpenButton = document.querySelector("#show-popup");
export const cardPopupOpen = document.querySelector(".profile__button");
export const imgPreviewTargetImg = document.querySelector(".popup__image");
export const elementImage = document.querySelector('elements__image');
export const profileAvatarButton = document.querySelector('.profile__avatar-button');

// Находим кнопки закрытия модальных окон
export const profileCloseButton = document.querySelector(".popup__close");
export const cardPopupClose = document.querySelector(".popup__close");

//Находим форму в DOM
export const profileFormElement = document.querySelector(".popup__field-form");
export const nameInput = profileFormElement.querySelector(".popup__field-input-name");
export const jobInput = profileFormElement.querySelector(".popup__field-input-about");
export const profileTitle = ".profile__title";
export const profileSubtitle = ".profile__subtitle";
export const profileAvatar = '.profile__avatar';

//Находим форму для добавления карточек в DOM
export const cardPopupInputName = document.querySelector(".popup__field-input-description");
export const cardPopupInputLink = document.querySelector(".popup__field-input-link");

export const cardPopupButton = document.querySelector(".popup__button");
export const container = document.querySelector(".elements__list");
export const cardPopupForm = document.querySelector(".popup__field-form-card");

// Попап изображений
export const imgPreviewTargetCaption = document.querySelector(".popup__caption");
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


