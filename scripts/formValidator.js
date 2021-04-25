export default class FormValidator {
  constructor(
    {
      formSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
    },
    formElement
  ) {
    this.formSelector = formSelector;
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.formElement = formElement;
  }

  _setEventListeners() {
    //вешаем события на саму форму и запрещаем отправку по умолчанию
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.inputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.submitButtonSelector
    );

    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        isValid(this.formElement, inputElement, this.inputErrorClass);
        toggleButtonState(inputList, buttonElement, this.inactiveButtonClass);
      };

      inputElement.addEventListener("input", handleInput);
    };

    // Обойдём все элементы на форме
    inputList.forEach(inputListIterator);
  }

  enableValidation() {
    _setEventListeners(
      this.formElement,
      this.inputSelector,
      this.submitButtonSelector,
      this.inactiveButtonClass,
      this.inputErrorClass
    );
  }

  // 3.Функция, которая проверяет валидность поля
  _isValid = (formElement, inputElement, inputErrorClass) => {
    const isInputNotValid = !this.inputElement.validity.valid;
    console.log(this.inputElement);

    if (isInputNotValid) {
      //для того, чтобы проверить валидность, получаем св-во validity.valid
      const errorMessage = getErrorMessage(this.inputElement); //в этой переменной будет лежать текст ошибки

      showInputError(
        this.formElement,
        this.inputElement,
        this.errorMessage,
        this.inputErrorClass
      ); //если получаем ошибку => показываем сообщение об ошибке
    } else {
      hideInputError(this.formElement, this.inputElement, this.inputErrorClass); //когда поле валидно => убираем сообщение об ошибке
    }
  };

  //4.Ф-ция, которая переключает кнопку submit
  _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const findAtLeastOneNotValid = (inputElement) =>
      !inputElement.validity.valid;
    const hasNotValidInput = Array.from(inputList).some(findAtLeastOneNotValid);

    if (hasNotValidInput) {
      buttonElement.toggleAttribute("disabled", true);
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.toggleAttribute("disabled", false);
      buttonElement.classList.remove(inactiveButtonClass);
    }
  };

  // Функция, которая добавляет класс с ошибкой (сообщение об ошибке)
  _showInputError = (
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass
  ) => {
    //ищем спан
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // inputElement.classList.add('popup__field-input_error');

    errorElement.textContent = "";
    errorElement.classList.remove(inputErrorClass);
  };
}

// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет один публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
