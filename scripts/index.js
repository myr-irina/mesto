import Card from './cards.js';
import initialCards from './initial-cards.js';
import FormValidator from './formValidator.js';


const formList = Array.from(document.querySelectorAll(this.formSelector)); //вернем массив из этих элементов
// пройдемся по массиву методом forEach и добавим слушатель на форму
formList.forEach((formElement) => {
  new FormValidator({
    formSelector: ".popup__field-form",
    inputSelector: ".popup__field-input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input-error_active",
    // errorClass: "popup__error_visible",
    // popupClose: "popup__close",
  }, formElement)
 
});



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
const cardPopupInputName = cardPopup.querySelector(
  ".popup__field-input-description"
);
const cardPopupInputLink = cardPopup.querySelector(".popup__field-input-link");

const cardPopupButton = document.querySelector(".popup__button");
const container = document.querySelector(".elements__list");
const cardPopupForm = document.querySelector(".popup__field-form-card");

// Попап изображений
const imgPreviewTargetCaption = imgPopup.querySelector(".popup__caption");
const templateElement = document
  .querySelector("#template")
  .content.querySelector(".elements__list-item"); //выберем элемент, который потом будем клонировать

//функция открытия модалки
function openPopup(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
}

// функция закрытия модалки
function closePopup(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

//функция-обработчик на закрытия попапа по esc
function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    closePopup(openedPopup);
  }
}

//функция- обработчик закрытияя попапа по оверлей
document.addEventListener("click", overlayHandler);

function overlayHandler(e) {
  if (e.target.classList.contains("popup")) {
    closePopup(e.target);
  }
}

// 1. навешиваем обработчики событий на кнопки открытия и закрытия модалки редактирования
profileOpenButton.addEventListener("click", () => {
  const inputElements = Array.from(
    profileFormElement.querySelectorAll(".popup__field-input")
  );
  const buttonElement = profileFormElement.querySelector(".popup__button");

  openProfilePopup(profilePopup);

  inputElements.forEach((input) => {
    isValid(profileFormElement, input, "popup__input-error_active");
  });

  toggleButtonState(inputElements, buttonElement, "popup__button_disabled");
});

profileCloseButton.addEventListener("click", () => closePopup(profilePopup));

function openProfilePopup(popup, formElement, inputElement) {
  const inputList = cardPopupForm.querySelectorAll(".popup__field-input");
  const buttonElement = cardPopupForm.querySelector(".popup__button");
  //заполняем поля формы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popup);
  toggleButtonState(inputList, buttonElement, "popup__button_disabled");
}

//Обработчик отправки формы для модалки редактирования
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(profilePopup);
}

//Прикрепляем обработчик к форме
profileFormElement.addEventListener("submit", handleProfileSubmit);

// 2. обработчики функции закрытия/открытия модалки для добавления карточек
cardPopupOpen.addEventListener("click", () => {
  const inputElements = Array.from(
    cardPopupForm.querySelectorAll(".popup__field-input")
  );
  const buttonElement = cardPopupForm.querySelector(".popup__button");

  openPopup(cardPopup);

  inputElements.forEach((input) => {
    input.value = "";
    hideInputError(cardPopupForm, input, "popup__input-error_active");
  });

  toggleButtonState(inputElements, buttonElement, "popup__button_disabled");
});

cardPopupClose.addEventListener("click", () => closePopup(cardPopup));


function handleCardClick(card) {
  imgPreviewTargetImg.src = card.link;
  imgPreviewTargetImg.alt = card.name;
  imgPreviewTargetCaption.textContent = card.name;

  openPopup(imgPopup);
}

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, "#template", handleCardClick);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  container.prepend(cardElement);
});


//функция добавления карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault();

  const obj = {
    link: cardPopupInputLink.value,
    name: cardPopupInputName.value,
  };


  const cardElement = createCard(obj, templateElement);

  container.prepend(cardElement);

  closePopup(cardPopup);

  // profileFormElement.reset();
  cardPopupInputLink.value = "";
  cardPopupInputName.value = "";
};

cardPopup.addEventListener("submit", handleCardSubmit);
imgPopupClose.addEventListener("click", () => closePopup(imgPopup));

//----------------------------




