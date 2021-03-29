// Находим модальные окна
const popup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imgPopup = document.querySelector(".popup_type_image");

// Находим кнопки открытия модальных окон
const showPopupButton = document.querySelector("#show-popup");
const cardPopupOpen = document.querySelector(".profile__button");
const imgPreviewTargetImg = imgPopup.querySelector(".popup__image");

// Находим кнопки закрытия модальных окон
const closePopupButton = popup.querySelector(".popup__close");
const cardPopupClose = cardPopup.querySelector(".popup__close");
const imgPopupClose = imgPopup.querySelector(".popup__close");

//Находим форму в DOM
const formElement = document.querySelector(".popup__field-form");
const nameInput = formElement.querySelector(".popup__field-input-name");
const jobInput = formElement.querySelector(".popup__field-input-about");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

//Находим форму для добавления карточек в DOM
const cardPopupInputName = cardPopup.querySelector(".popup__field-input-description");
const cardPopupInputLink = cardPopup.querySelector(".popup__field-input-link");

const cardPopupButton = document.querySelector(".popup__button");
const container = document.querySelector(".elements__list");
const cardPopupForm = document.querySelector("popup__field-form-card");

// Попап изображений
const imgPreviewTargetCaption = imgPopup.querySelector(".popup__caption");
const templateElement = document.querySelector("#template").content.querySelector(".elements__list-item");

//функция открытия модалки
function openPopup(modal) {
  modal.classList.add("popup_is-opened"); //добавим класс для открытия попапа
}

// функция закрытия модалки
function closePopup(modal) {
  modal.classList.remove("popup_is-opened");
}

// 1. навешиваем обработчики событий на кнопки открытия и закрытия модалки редактирования
showPopupButton.addEventListener("click", () => openPopup(popup));
closePopupButton.addEventListener("click", () => closePopup(popup));

//Вставляем значения полей в модалку редактирования с помощью textContent
function updatePopupForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

updatePopupForm(popup);

//Обработчик отправки формы для модалки редактирования
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popup);
}

//Прикрепляем обработчик к форме
formElement.addEventListener("submit", formSubmitHandler);

// 2. обработчики функции закрытия/открытия модалки для добавления карточек
cardPopupOpen.addEventListener("click", () => openPopup(cardPopup));
cardPopupClose.addEventListener("click", () => closePopup(cardPopup));

//функция создания карточки
function insertCardItem(str) {
  const cardElement = templateElement.cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".elements__title");
  const cardImage = cardElement.querySelector(".elements__image");

  cardElementTitle.textContent = str.name;
  cardImage.src = str.link;

  const deleteButton = cardElement.querySelector(".elements__button-trash");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".elements__button");
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("elements__button_active");
  });

  container.prepend(cardElement);
}

const cardSubmitHandler = (evt) => {
  evt.preventDefault();
  const cardPopupInputNameValue = cardPopupInputName.value;
  const cardPopupInputLinkSrc = cardPopupInputLink.value;


  // const cardElement = templateElement.cloneNode(true);
  // const cardElementTitle = cardElement.querySelector(".elements__title");
  // const cardImage = cardElement.querySelector(".elements__image");

  // cardElementTitle.textContent = cardPopupInputNameValue;
  // cardImage.src = cardPopupInputLinkSrc;

  // container.prepend(cardElement);

  insertCardItem();

  closePopup(cardPopup);

  // const deleteButton = cardElement.querySelector(".elements__button-trash");
  // deleteButton.addEventListener("click", () => {
  //   cardElement.remove();
  // });

  // const likeButton = cardElement.querySelector(".elements__button");
  // likeButton.addEventListener("click", (event) => {
  //   event.target.classList.toggle("elements__button_active");
  // });

  cardPopupInputName.value = "";
  cardPopupInputLink.value = "";
};


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

  function imageClickHandler() {
    imgPreviewTargetImg.src = item.link;
    imgPreviewTargetImg.alt = item.name;
    imgPreviewTargetCaption.textContent = item.name;

    imgPopup.classList.add("image-popup_is-opened");
    // openPopup(imgPopup);
  }

  cardImage.addEventListener("click", imageClickHandler);
  
  function closeImageCardPopup() {
    imgPopup.classList.remove("image-popup_is-opened");
  }

  imgPopupClose.addEventListener("click", closeImageCardPopup);

  // cardImage.addEventListener('click', () => openPopup(imgPopup));
  // imgPopupClose.addEventListener("click", () => closePopup(imgPopup));

  container.prepend(cardElement);
});
