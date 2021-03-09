// Форма Редактирования
// Находим форму редактирования в DOM
let popup = document.querySelector('.popup');
let showPopupButton = document.querySelector('#show-popup');
let closePopupButton = document.querySelector('.popup__close');
// Находим поля формы в DOM
let popupForm = document.querySelector('.popup .popup__field-form');
let popupInputName = document.querySelector('.popup__field-input-name');
let popupInputAbout = document.querySelector('.popup__field-input-about');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const popupImage = document.querySelector('.image-popup');


// ---Создание popup для редактирования title

function openPopup() {
  popup.classList.add('popup_is-opened');
  updatePopupForm();
}

function closePopup() {
	popup.classList.remove('popup_is-opened');
}

// Обработчик «отправки» формы
function popupFormSubmitHandler(event) {
	event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												
// Получили значение полей из свойства value
	profileTitle.textContent = popupInputName.value;
	profileSubtitle.textContent = popupInputAbout.value;

	closePopup();
}

// Вставляем новые значения с помощью textContent
function updatePopupForm() {
  popupInputName.value = profileTitle.textContent;
  popupInputAbout.value = profileSubtitle.textContent;
}

showPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', popupFormSubmitHandler);


// ---Создание popup для редактирования title


//---Создаем карточки-----
//----Вызовем и инцаилизируем переменные---------

const container = document.querySelector('.elements__list');

// получаем template
const templateElement = document.querySelector('#template');

// сюда будем вставлять строки массива
const elementsContainer = document.querySelector('.elements__list');

//получим кнопку добавления карточек
const profileButton = document.querySelector('.profile__button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// создаем DOM Node
function createCardDomNode(item) {
	const cardElement = templateElement.content.cloneNode(true); //через свойство content получаем доступ к содержимому template, клонируем рекурсивно элменты из template => создаем DOM Node 

	cardElement.querySelector('.elements__image').src = item.link;
	cardElement.querySelector('.elements__image').alt = item.name;
	cardElement.querySelector('.elements__title').textContent = item.name;
	
	
	
	addCardListeners(cardElement, item);
	
	return cardElement;
}


// Отрендерим список с задачами
function renderList() {
	const result = initialCards.map((item) => {
		return createCardDomNode(item);
	}); // в колбэке на каждом объекте будем возвращать шаблонную строку, полученный массив передадим в result

	// elementsContainer.append(...result) //добавляем полученный результат в контейнер
	elementsContainer.append(...result);
}
renderList();


// ----- функция для слушателей события карточек -----

function addCardListeners(card, cardInfo) {
	const deleteButton = card.querySelector('.elements__button-trash');
	const likeButton = card.querySelector('.elements__button');
	const imgCard = card.querySelector('.elements__image'); // объявим переменную для открытия попапа с картинкой

	imgCard.addEventListener('click', (event) => {
		event.preventDefault();

		openPopupImage(popupImage, cardInfo);
	});


	likeButton.addEventListener('click', (event) => {
		event.preventDefault();

		const target = event.target;
		target.classList.toggle('elements__button_active');
	});
	
	deleteButton.addEventListener('click', (event) => {
		event.preventDefault();

		const target = event.target;
		const card = target.closest('.elements__list-item');
		card.remove();
	});

}


function openPopupImage(popup, options) {
	// console.log(popup, options);

	const popupName = popup.querySelector('.image-popup__figcaption');
	const popupImg = popup.querySelector('.image-popup__pic');
	
	popupImg.src = options.link;
	popupImg.alt = options.name;
	popupName.textContent = options.name;


	const classActivePopup = 'image-popup_is-opened';
	const classActiveBody = 'overflow';

	popup.classList.add(classActivePopup);
	document.body.classList.add(classActiveBody);
	

	const popupDelete = popup.querySelector('.image-popup__close');

	popupDelete.addEventListener('click', (event) => {
		event.preventDefault();

		popup.classList.remove(classActivePopup);
		document.body.classList.remove(classActiveBody);
	}, {once: true});

}


// -----Вызываем функции для попапа карточек---

//Находим форму для попапа карточек
const cardPopup = document.querySelector('.card-popup');
const showCardPopupButton = document.querySelector('#show-card-popup');
const closeCardPopupButton = document.querySelector('.card-popup__close')

// Находим поля формы попапа карточек в DOM
const cardPopupForm = document.querySelector('.card-popup .card-popup__field-form');

//Находим input в форме
const cardPopupInputDescription = cardPopupForm.querySelector('.card-popup__field-input-description');
const cardPopupInputLink = cardPopupForm.querySelector('.card-popup__field-input-link');

function openCardPopup() {
  cardPopup.classList.add('card-popup_is-opened');
}

function closeCardPopup() {
	cardPopup.classList.remove('card-popup_is-opened');
}

// // Обработчик «отправки» формы
function cardPopupFormSubmitHandler(event) {
	event.preventDefault(); 
	
// Получили значение полей из свойства value
	const name = cardPopupInputDescription.value;
	const link = cardPopupInputLink.value;

	const card = createCardDomNode({'name': name, 'link': link});

	
	elementsContainer.prepend(card);

	closeCardPopup();
}

cardPopupForm.addEventListener('submit', cardPopupFormSubmitHandler);


showCardPopupButton.addEventListener('click', openCardPopup);
closeCardPopupButton.addEventListener('click', closeCardPopup);

