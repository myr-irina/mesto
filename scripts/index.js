// Форма Редактирования
// Находим форму редактирования в DOM
const popup = document.querySelector(".popup_type_edit"); //попап редактирования
const showPopupButton = document.querySelector("#show-popup"); // кнопка попапа редактирования
const closePopupButton = document.querySelector(".popup__close");
const formElement = document.querySelector(".popup__field-form"); //Находим форму в DOM
const nameInput = formElement.querySelector(".popup__field-input-name");
const jobInput = formElement.querySelector(".popup__field-input-about");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
//Находим форму для добавления карточек в DOM
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupInputName = cardPopup.querySelector(
  ".popup__field-input-description"
);
const cardPopupInputLink = cardPopup.querySelector(".popup__field-input-link");

const cardPopupOpen = document.querySelector(".profile__button");
const cardPopupClose = document.querySelector(".card-popup-close");
const cardPopupButton = document.querySelector(".popup__button");
const container = document.querySelector(".elements__list");
const cardPopupForm = document.querySelector("popup__field-form-card");
// Попап изображений
const imgPopup = document.querySelector(".popup_type_image");
const imgPreviewTargetImg = imgPopup.querySelector(".popup__image");
const imgPreviewTargetCaption = imgPopup.querySelector(".popup__caption");
const imgPopupClose = imgPopup.querySelector(".popup__close");

const templateElement = document
  .querySelector("#template")
  .content.querySelector(".elements__list-item");

//1.Попап для редактирования
//функция открытия попапа карточки редактирования
function showPopup() {
  popup.classList.add("popup_is-opened"); //добавим класс для открытия попапа
  updatePopupForm();
}

// функция закрытия попапа
function closePopup() {
  popup.classList.remove("popup_is-opened");
}

// делаем функцию обработчиком событий
showPopupButton.addEventListener("click", showPopup); //при клике на кнопку, слушатель перехватит событие и вызовет функцию showPopup
closePopupButton.addEventListener("click", closePopup);

//Вставляем значения полей с помощью textContent
function updatePopupForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

//Обработчик отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup();
}

//Прикрепляем обработчик к форме
formElement.addEventListener("submit", formSubmitHandler);

// //2.Попап для добавления карточек
function openCardPopup() {
  cardPopup.classList.add("popup_is-opened"); //добавим класс для открытия попапа
}

// функция закрытия попапа
function closeCardPopup() {
  cardPopup.classList.remove("popup_is-opened");
}

cardPopupOpen.addEventListener("click", openCardPopup);
cardPopupClose.addEventListener("click", closeCardPopup);

const cardSubmitHandler = (evt) => {
  evt.preventDefault();
  const cardPopupInputNameValue = cardPopupInputName.value;
  const cardPopupInputLinkSrc = cardPopupInputLink.value;

  const cardElement = templateElement.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".elements__title");
  const cardImage = cardElement.querySelector(".elements__image");

  cardElementTitle.textContent = cardPopupInputNameValue;
  cardImage.src = cardPopupInputLinkSrc;

  container.append(cardElement);

  // insertCardItem(cardPopupInputNameValue, cardPopupInputLinkSrc);

  closeCardPopup();

  const deleteButton = cardElement.querySelector(".elements__button-trash");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".elements__button");
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("elements__button_active");
  });

  cardPopupInputName.value = "";
  cardPopupInputLink.value = "";
};

// function insertCardItem(str) {
//   const cardElement = templateElement.cloneNode(true);
//   const cardElementTitle = cardElement.querySelector('.elements__title');
//   const cardImage = cardElement.querySelector('.elements__image');

//   cardElementTitle.textContent = str.name;
//   cardImage.src = str.link;

//   container.append(cardElement);
// }

cardPopup.addEventListener("submit", cardSubmitHandler);

const createCardDomNode = initialCards.forEach((item) => {
  const cardElement = templateElement.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".elements__title");
  const cardImage = cardElement.querySelector(".elements__image");

  cardElementTitle.textContent = item.name;
  cardImage.src = item.link;

  const deleteButton = cardElement.querySelector(".elements__button-trash");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".elements__button");
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("elements__button_active");
  });

  function imageClickHandler(evt) {
    imgPreviewTargetImg.src = item.link;
    imgPreviewTargetImg.alt = item.name;
    imgPreviewTargetCaption.textContent = item.name;

    imgPopup.classList.add("popup_is-opened");
  }

  cardImage.addEventListener("click", imageClickHandler);
    
  container.append(cardElement);

  // insertCardItem(item);
});

//добавим содержимое в список через попап карточек
