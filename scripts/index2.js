import Card from "./cards.js";
import initialCards from "./initial-cards.js";
import FormValidation from "./formValidator2.js";
import {profilePopup, cardPopup, imgPopup, profileOpenButton, cardPopupOpen, imgPreviewTargetImg, profileCloseButton, cardPopupClose, imgPopupClose, nameInput, jobInput, profileTitle, profileSubtitle, cardPopupInputName, cardPopupInputLink, cardPopupButton, container, cardPopupForm, imgPreviewTargetCaption, templateElement, validationConfig} from "./variables.js";



// const formList = Array.from(document.querySelectorAll(".popup__field-form")); 

// const formsObjects = formList.map((form) => {
//   const formValidationInstance = new FormValidator(
//     {
//       inputSelector: ".popup__field-input",
//       submitButtonSelector: ".popup__button",
//       inactiveButtonClass: "popup__button_disabled",
//       inputErrorClass: "popup__input-error_active",
//     },
//     form
//   );
//   formValidationInstance.enableValidation();
//   return formValidationInstance;
// });



const formAddCardValidator = new FormValidation(validationConfig, cardPopup);
formAddCardValidator.enableValidation();

const formEditCardValidator = new FormValidation(validationConfig, profilePopup);
formEditCardValidator.enableValidation();

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
 
  openProfilePopup(profilePopup);
  formEditCardValidator();
});

profileCloseButton.addEventListener("click", () => closePopup(profilePopup));

function openProfilePopup(popup, formElement, inputElement) {
  const inputList = cardPopupForm.querySelectorAll(".popup__field-input");
  const buttonElement = cardPopupForm.querySelector(".popup__button");
  //заполняем поля формы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popup);
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

//2. обработчики функции закрытия/открытия модалки для добавления карточек
cardPopupOpen.addEventListener("click", () => {
  const inputElements = Array.from(cardPopupForm.querySelectorAll(".popup__field-input"));
  const buttonElement = cardPopupForm.querySelector(".popup__button");

  openPopup(cardPopup);
  formAddCardValidator();

  // formsObjects.forEach(item => item.reset())
  // inputElements.forEach((input) => {
  //   input.value = "";
  //   hideInputError(cardPopupForm, input, "popup__input-error_active");
  // });

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


