let showPopupButton = document.querySelector('#show-popup');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup .popup__field-form');
let popupInputName = document.querySelector('.popup__field-input-name');
let popupInputAbout = document.querySelector('.popup__field-input-about');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function showPopup() {
	popup.classList.add('popup_is-opened');
}

function closePopup() {
	popup.classList.remove('popup_is-opened');
}

function popupFormSubmitHandler(event) {
	event.preventDefault();

	let valueName = popupInputName.value;
	let valueAbout = popupInputAbout.value;

	profileTitle.innerHTML = valueName;
	profileSubtitle.innerHTML = valueAbout;

	popup.classList.remove('popup_is-opened');
	// console.log(valueName, 'valueName');
	// console.log(valueAbout, 'valueAbout');
}

function initUser(name, about) {
	// console.log(name);
	// console.log(about);

	profileTitle.innerHTML = name;
	profileSubtitle.innerHTML = about;

	popupInputName.value = name;
	popupInputAbout.value = about;
}

initUser('Жак-Ив Кусто', 'Исследователь океана');

showPopupButton.addEventListener('click', showPopup);
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

