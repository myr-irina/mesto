// Функция, которая добавляет класс с ошибкой (сообщение об ошибке)
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  //ищем спан
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // inputElement.classList.add('popup__field-input_error');

  errorElement.textContent = "";
  errorElement.classList.remove(inputErrorClass);
};


//5.Сделаем вывод ошибок кастомными
const getErrorMessage = (inputElement) => {
  const defaultErrorHandler = (inputElement) => inputElement.validationMessage;

  const linkErrorHandler = (inputElement) => {
    if (inputElement.validity.typeMismatch) {
      return "Это неверное значение. Здесь должна быть ссылка.";
    }

    if (inputElement.validity.valueMissing) {
      return "Пожалуйста, добавьте ссылку.";
    }
  };

  const errorHandlers = {
    link: linkErrorHandler,
    DEFAULT: defaultErrorHandler,
  };

  const inputName = inputElement.name;
  const errorHandler = errorHandlers[inputName] || errorHandlers.DEFAULT;

  return errorHandler(inputElement);
};

// 3.Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, inputErrorClass) => {
  const isInputNotValid = !inputElement.validity.valid;
  
  if (isInputNotValid) {
    //для того, чтобы проверить валидность, получаем св-во validity.valid
    const errorMessage = getErrorMessage(inputElement); //в этой переменной будет лежать текст ошибки
   
    showInputError(formElement, inputElement, errorMessage, inputErrorClass); //если получаем ошибку => показываем сообщение об ошибке
  } else {
    hideInputError(formElement, inputElement, inputErrorClass); //когда поле валидно => убираем сообщение об ошибке
  }
};

//4.Ф-ция, которая переключает кнопку submit
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = Array.from(inputList).some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.toggleAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.toggleAttribute("disabled", false);
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

//2.функция, которая вешает события
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass
) => {


  //вешаем события на саму форму и запрщаем отправку по умолчанию
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // const inputError = Array.from(formElement.querySelectorAll(inputErrorClass));

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      isValid(formElement, inputElement, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    };

    inputElement.addEventListener("input", handleInput);
  };

  // Обойдём все элементы на форме
  inputList.forEach(inputListIterator);

  // toggleButtonState(inputList, buttonElement);
};

//1.Эта функция проходит по всем формам и включает валидацию т.е. навешивает обработчики событий на формы
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,  
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); //вернем массив из этих элементов

  // пройдемся по массиву методом forEach и добавим слушатель на форму
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass);
  });
};

enableValidation({
  formSelector: ".popup__field-form",
  inputSelector: ".popup__field-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error_active",
  // errorClass: "popup__error_visible",
  // popupClose: "popup__close",
});
