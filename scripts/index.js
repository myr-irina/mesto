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
const cardPopupForm = document.querySelector("popup__field-form-card");

// Попап изображений
const imgPreviewTargetCaption = imgPopup.querySelector(".popup__caption");
const templateElement = document
  .querySelector("#template")
  .content.querySelector(".elements__list-item"); //выберем элемент, который потом будем клонировать

//функция открытия модалки
function openPopup(modal) {
  modal.classList.add("popup_is-opened"); //добавим класс для открытия попапа
}

// функция закрытия модалки
function closePopup(modal) {
  modal.classList.remove("popup_is-opened");
}

//функция-обработчик на закрытия попапа по esc
document.addEventListener("keydown", keyHandler);

function keyHandler(evt) {
  if (evt.keyCode === 27) {
    const openedPopup = document.querySelector("popup_is-opened");
    openedPopup.classList.remove("popup_is-opened");
  }
}

//функция- обработчик закрытияя попапа по оверлей
document.addEventListener("click", overlayHandler);

function overlayHandler(e) {
  if (e.target.classList.contains("popup")) {
    const openedPopup = document.querySelector("popup_is-opened");
    openedPopup.classList.remove("popup_is-opened");
  }
}

// 1. навешиваем обработчики событий на кнопки открытия и закрытия модалки редактирования
profileOpenButton.addEventListener("click", () =>
  openProfilePopup(profilePopup)
);
profileCloseButton.addEventListener("click", () => closePopup(profilePopup));

function openProfilePopup(popup) {
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

// 2. обработчики функции закрытия/открытия модалки для добавления карточек
cardPopupOpen.addEventListener("click", () => openPopup(cardPopup));
cardPopupClose.addEventListener("click", () => closePopup(cardPopup));

//функция создания карточки
function createCard(obj, templateElement) {
  //функция открытия модалки с 'проброшенными' значениями из полей формы
  function imageClickHandler() {
    imgPreviewTargetImg.src = obj.link;
    imgPreviewTargetImg.alt = obj.name;
    imgPreviewTargetCaption.textContent = obj.name;

    openPopup(imgPopup);
  }

  //клонируем темплейт
  const cardElement = templateElement.cloneNode(true);
  //ищем элементы темплейта
  const cardElementTitle = cardElement.querySelector(".elements__title");
  const cardImage = cardElement.querySelector(".elements__image");

  //навешиваем обработчик для открытия модалки
  cardImage.addEventListener("click", imageClickHandler);

  //присваиваем значения строк из массива
  cardElementTitle.textContent = obj.name;
  cardImage.src = obj.link;
  cardImage.alt = obj.name;

  //навешиваем обработчики на кнопку удаления
  const deleteButton = cardElement.querySelector(".elements__button-trash");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //навешиваем обработчики на кнопку лайка
  const likeButton = cardElement.querySelector(".elements__button");
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("elements__button_active");
  });

  return cardElement;
}

//пройдемся по массиву методом forEach и добавим полученные элементы в контейнер
initialCards.forEach((item) => {
  const cardElement = createCard(item, templateElement);
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
