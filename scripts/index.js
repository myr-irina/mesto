// Форма Редактирования
// Находим форму редактирования в DOM
const popup = document.querySelector(".popup_type_edit");
const showPopupButton = document.querySelector("#show-popup");
const closePopupButton = document.querySelector(".popup__close");
// Находим поля формы в DOM
const popupForm = document.querySelector(".popup .popup__field-form");
const popupInputName = document.querySelector(".popup__field-input-name");
const popupInputAbout = document.querySelector(".popup__field-input-about");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupImage = document.querySelector(".popup_type_image");

// ---Создание функций открытия и закрытия попапа
function openPopup(popup, classActivePopup) {
  popup.classList.add(classActivePopup);
  document.body.classList.add("overflow");
}

function closePopup(popup, classActivePopup) {
  popup.classList.remove(classActivePopup);
  document.body.classList.remove("overflow");
}

// Обработчик «отправки» формы
function popupFormSubmitHandler(event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получили значение полей из свойства value
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputAbout.value;

  closePopup(popup, "popup_is-opened");
}

// Вставляем новые значения с помощью textContent
function updatePopupForm() {
  popupInputName.value = profileTitle.textContent;
  popupInputAbout.value = profileSubtitle.textContent;
}

showPopupButton.addEventListener("click", (event) => {
  openPopup(popup, "popup_is-opened");
  updatePopupForm();
});

closePopupButton.addEventListener("click", (event) => {
  closePopup(popup, "popup_is-opened");
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener("submit", popupFormSubmitHandler);


//---Создаем карточки-----
//----Вызовем и инцаилизируем переменные---------

// получаем template
const templateElement = document.querySelector("#template");

// сюда будем вставлять строки массива
const elementsContainer = document.querySelector(".elements__list");

//получим кнопку добавления карточек
const profileButton = document.querySelector(".profile__button");

// создаем DOM Node
function createCardDomNode(item) {

	function addCardListeners(card, cardInfo) {
    const deleteButton = card.querySelector(".elements__button-trash");
    const likeButton = card.querySelector(".elements__button");
    const imgCard = card.querySelector(".elements__image"); // объявим переменную для открытия попапа с картинкой

		const popupObj = {
			popup: popupImage,
			name: popupImage.querySelector(".popup__caption"),
			img: popupImage.querySelector(".popup__image"),
			closeBtn: popupImage.querySelector(".popup__close")
		};

    imgCard.addEventListener("click", (event) => {
      openPopupImage(popupObj, cardInfo);
    });

    likeButton.addEventListener("click", (event) => {
      event.target.classList.toggle("elements__button_active");
    });

    deleteButton.addEventListener("click", (event) => {
      event.target.closest(".elements__list-item").remove();
      card.remove();
    });
  }

  const cardElement = templateElement.content.cloneNode(true); //через свойство content получаем доступ к содержимому template, клонируем рекурсивно элменты из template => создаем DOM Node

  const cardImage = cardElement.querySelector(".elements__image");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector(".elements__title").textContent = item.name;

  addCardListeners(cardElement, item);

  return cardElement;
}

// Отрендерим список с задачами
function renderList() {
  const cards = initialCards.map(createCardDomNode);

  // elementsContainer.append(...result) //добавляем полученный результат в контейнер
  elementsContainer.append(...cards);
}
renderList();

// ----- функция для слушателей события карточек -----

function openPopupImage(popupObj, options) {
  const classActive = "image-popup_is-opened";

  popupObj.img.src = options.link;
  popupObj.img.alt = options.name;
  popupObj.name.textContent = options.name;

  openPopup(popupObj.popup, classActive);

  popupObj.closeBtn.addEventListener(
    "click",
    (event) => {
      closePopup(popupObj.popup, classActive);
    },
    { once: true }
  );
}

// -----Вызываем функции для попапа карточек---

//Находим форму для попапа карточек
const cardPopup = document.querySelector(".popup_type_new-card");
const showCardPopupButton = document.querySelector("#show-card-popup");
const closeCardPopupButton = document.querySelector(".card-popup-close");

// Находим поля формы попапа карточек в DOM
const cardPopupForm = document.querySelector(
  ".popup_type_new-card .card-popup__field-form"
);

//Находим input в форме
const cardPopupInputDescription = cardPopupForm.querySelector(
  ".card-popup__field-input-description"
);
const cardPopupInputLink = cardPopupForm.querySelector(
  ".card-popup__field-input-link"
);


// // Обработчик «отправки» формы
function cardPopupFormSubmitHandler(event) {
  event.preventDefault();
	
  const card = createCardDomNode({
    name: cardPopupInputDescription.value,
    link: cardPopupInputLink.value,
  });

  cardPopupInputDescription.value = "";
  cardPopupInputLink.value = "";

  elementsContainer.prepend(card);

  closePopup(cardPopup, "card-popup_is-opened");
}

cardPopupForm.addEventListener("submit", cardPopupFormSubmitHandler);

showCardPopupButton.addEventListener("click", (event) => {
  openPopup(cardPopup, "card-popup_is-opened");
});

closeCardPopupButton.addEventListener("click", (event) => {
  closePopup(cardPopup, "card-popup_is-opened");
});


