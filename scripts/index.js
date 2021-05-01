import Card from "./cards.js";
import initialCards from "./initial-cards.js";
import FormValidation from "./formValidator.js";
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
  profileFormElement
} from "./variables.js";


const formAddCardValidator = new FormValidation(validationConfig, cardPopupForm);
formAddCardValidator.enableValidation();

const formEditCardValidator = new FormValidation(validationConfig, profileFormElement);
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

function overlayHandler(e) {
  if (e.target.classList.contains("popup")) {
    closePopup(e.target);
  }
}


// 1. навешиваем обработчики событий на кнопки открытия и закрытия модалки редактирования
profileOpenButton.addEventListener("click", () => {
 
  openProfilePopup(profilePopup);  
});

profileCloseButton.addEventListener("click", () => closePopup(profilePopup));

function openProfilePopup(popup) {
  // //заполняем поля формы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  formEditCardValidator.reset();
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
 
  formAddCardValidator.reset();
  openPopup(cardPopup);

  cardPopupInputName.value = '';
  cardPopupInputLink.value = ''; 
});

cardPopupClose.addEventListener("click", () => closePopup(cardPopup));

function handleCardClick(card) {
  imgPreviewTargetImg.src = card.link;
  imgPreviewTargetImg.alt = card.name;
  imgPreviewTargetCaption.textContent = card.name;

  openPopup(imgPopup);
}

function createCard(data, cardSelector, handleCardClick) {

  const card = new Card(data, cardSelector, handleCardClick);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  return cardElement;
}

function renderList() {
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const cardElement = createCard(item, "#template", handleCardClick);
    container.prepend(cardElement);
  });  
}

renderList();

//функция добавления карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault();

  const obj = {
    link: cardPopupInputLink.value,
    name: cardPopupInputName.value,
  };

  const addElements = createCard(obj, "#template", handleCardClick)

  container.prepend(addElements);

  closePopup(cardPopup);

  cardPopupInputLink.value = "";
  cardPopupInputName.value = "";
};

cardPopup.addEventListener("submit", handleCardSubmit);
imgPopupClose.addEventListener("click", () => closePopup(imgPopup));

profilePopup.addEventListener("click", overlayHandler); 
cardPopup.addEventListener("click", overlayHandler); 
imgPopup.addEventListener("click", overlayHandler); 


