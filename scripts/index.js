let showPopupButton = document.querySelector('#show-popup');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup .popup__field-form');
let popupInputName = document.querySelector('.popup__field-input-name');
let popupInputAbout = document.querySelector('.popup__field-input-about');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_is-opened');
  updatePopupForm();
}

function closePopup() {
	popup.classList.remove('popup_is-opened');
}

function updatePopupForm() {
  popupInputName.value = profileTitle.textContent;
  popupInputAbout.value = profileSubtitle.textContent;
}

function popupFormSubmitHandler(event) {
	event.preventDefault();

	profileTitle.textContent = popupInputName.value;
	profileSubtitle.textContent = popupInputAbout.value;

	closePopup();
}

showPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', popupFormSubmitHandler);



// Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
// function formSubmitHandler (evt) {
// 	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// 												// Так мы можем определить свою логику отправки.
// 												// О том, как это делать, расскажем позже.

// 	// Находим поля формы в DOM
// 	let nameInput = // Воспользуйтесь инструментом .querySelector()
// 	let jobInput = // Воспользуйтесь инструментом .querySelector()

// 	// Получите значение полей из свойства value

// 	// Выберите элементы, куда должны быть вставлены значения полей

// 	// Вставьте новые значения с помощью textContent
// }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);

