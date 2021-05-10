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
  imgPopupClose,
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
} from "../utils/variables.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';

import "./index.css";


// --создадим экземпляр класса Section 
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (data, cardsList) => {
      const card = new Card(data, templateElement, () => {});

      // Создаём карточку и возвращаем наружу
      const cardElement = card.generateCard();
    
    cardsList.addItem(cardElement);
    },
  },
  container
);

// отрисовка карточек
cardsList.renderItems();


// function renderList() {
//   initialCards.forEach((item) => {
//     // Создадим экземпляр карточки
//     const cardElement = cardsList(item, "#template", cardImageClickhandler);
//     container.prepend(cardElement);
//   });
// }


// // инстанс класса PopupWithImage
// const popupWithImage = new PopupWithImage(".popup_type_image");

// popupWithImage.setEventListeners();

// function addCardSubmitHandler(data, cardSelector, handleCardClick) {
//   const card = new Card(data, cardSelector, handleCardClick);
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();
//   container.prepend(cardElement);
// }

// ----инстанс класса PopupWithForm

function editCardSubmitHandler() {
  nameInput.value = profileTitle.textContent;

  jobInput.value = profileSubtitle.textContent;
  formEditCardValidator.reset();
}

// const addCardPopup = new PopupWithForm('.popup_type_new-card', addCardSubmitHandler);
// const editProfilePopup = new PopupWithForm('.popup_type_edit', editCardSubmitHandler);

const editProfilePopup = new PopupWithForm(
  ".popup_type_edit",
  editFormSubmitHandler
);

function editFormSubmitHandler(data) {
  userinfo.setUserInfo(data); // еще нужно написать getUserInfo, который возвращает данные пользователя(setUserInfo - меняет данные пользователя)
}

function cardImageClickHandler(name, link) {
  popupWithImage.open(name, link);
}

cardPopupOpen.addEventListener('click', () =>{
  editProfilePopup.open();
})



// ----инстанс класса UserInfo

const userinfo = new UserInfo({
  name: ".popup__field-input-name",
  job: ".popup__field-input-about",
});


// -----валидация форм---------
const formAddCardValidator = new FormValidation(
  validationConfig,
  cardPopupForm
);

formAddCardValidator.enableValidation();

const formEditCardValidator = new FormValidation(
  validationConfig,
  profileFormElement
);

formEditCardValidator.enableValidation();

// //функция открытия модалки
// function openPopup(modal) {
//   modal.classList.add("popup_is-opened");
//   document.addEventListener("keydown", keyHandler);
// }

// // функция закрытия модалки
// function closePopup(modal) {
//   modal.classList.remove("popup_is-opened");
//   document.removeEventListener("keydown", keyHandler);
// }

// //функция-обработчик на закрытия попапа по esc
// function keyHandler(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_is-opened");

//     closePopup(openedPopup);
//   }
// }

function overlayHandler(e) {
  if (e.target.classList.contains("popup")) {
    closePopup(e.target);
  }
}

// // навешиваем обработчики событий на кнопки открытия и закрытия модалки редактирования
// profileOpenButton.addEventListener("click", () => {
//   openProfilePopup(profilePopup);
// });

// profileCloseButton.addEventListener("click", () => closePopup(profilePopup));

// function openProfilePopup(popup) {
//   // //заполняем поля формы
//   nameInput.value = profileTitle.textContent;

//   jobInput.value = profileSubtitle.textContent;
//   formEditCardValidator.reset();
//   openPopup(popup);
// }

// //Обработчик отправки формы для модалки редактирования
// function handleProfileSubmit(evt) {
//   evt.preventDefault();

//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;

//   closePopup(profilePopup);
// }

// //Прикрепляем обработчик к форме
// profileFormElement.addEventListener("submit", handleProfileSubmit);

// //обработчики функции закрытия/открытия модалки для добавления карточек
// cardPopupOpen.addEventListener("click", () => {
//   formAddCardValidator.reset();
//   openPopup(cardPopup);

//   cardPopupInputName.value = "";
//   cardPopupInputLink.value = "";
// });

// cardPopupClose.addEventListener("click", () => closePopup(cardPopup));

// function handleCardClick(card) {
//   imgPreviewTargetImg.src = card.link;
//   imgPreviewTargetImg.alt = card.name;
//   imgPreviewTargetCaption.textContent = card.name;

//   openPopup(imgPopup);
// }

// function createCard(data, cardSelector, handleCardClick) {
//   const card = new Card(data, cardSelector, handleCardClick);
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();

//   return cardElement;
// }

// function renderList() {
//   initialCards.forEach((item) => {
//     // Создадим экземпляр карточки
//     const cardElement = createCard(item, "#template", cardImageClickhandler);
//     container.prepend(cardElement);
//   });
// }

// renderList();

// ------------------



// //функция добавления карточки
// const handleCardSubmit = (evt) => {
//   evt.preventDefault();

//   const obj = {
//     link: cardPopupInputLink.value,
//     name: cardPopupInputName.value,
//   };

//   const addElements = createCard(obj, "#template", handleCardClick);

//   container.prepend(addElements);

//   closePopup(cardPopup);

//   cardPopupInputLink.value = "";
//   cardPopupInputName.value = "";
// };

// cardPopup.addEventListener("submit", handleCardSubmit);
// imgPopupClose.addEventListener("click", () => closePopup(imgPopup));

profilePopup.addEventListener("click", overlayHandler);
cardPopup.addEventListener("click", overlayHandler);
imgPopup.addEventListener("click", overlayHandler);


 

