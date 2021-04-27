export default class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
    },
    form
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this.form = form;
    this.inputs = [];
    this.submitButton = {};
  }

  // Этот метод добавляет класс с ошибкой (сообщение об ошибке)
  _getErrorMessage(input) {
    const defaultErrorHandler = () => input.validationMessage;
  
    const linkErrorHandler = () => {
      if (input.validity.typeMismatch) {
        return "Это неверное значение. Здесь должна быть ссылка.";
      }
  
      if (input.validity.valueMissing) {
        return "Пожалуйста, добавьте ссылку.";
      }
    };
  
    const errorHandlers = {
      link: linkErrorHandler,
      DEFAULT: defaultErrorHandler,
    };
  
    const errorHandler = errorHandlers[input.name] || errorHandlers.DEFAULT;
  
    return errorHandler(input);
  }

  _showInputError = (errorMessage, input) => {
    const errorElement = this.form.querySelector(`#${input.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorClass);
  };

  // Этот метод удаляет класс с ошибкой
  _hideInputError = (input) => {
    if (input) {
      const errorElement = this.form.querySelector(`#${input.id}-error`);
      input.textContent = "";
      errorElement.classList.remove(this._inputErrorClass);
      return;
    }
    this.inputs.forEach(input => {
      const errorElement = this.form.querySelector(`#${input.id}-error`);
      input.textContent = "";
      errorElement.classList.remove(this._inputErrorClass);
    })
  };

  //Этот метод переключает кнопку submit
  _toggleButtonState = () => {
    const findAtLeastOneNotValid = input => !input.validity.valid;
    const hasNotValidInput = this.inputs.some(findAtLeastOneNotValid);

    if (hasNotValidInput) {
      this.submitButton.toggleAttribute("disabled", true);
      this.submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this.submitButton.toggleAttribute("disabled", false);
      this.submitButton.classList.remove(this._inactiveButtonClass);
    }
  };

  //Этот метод проверяет валидность поля
  _isValid = (input) => {
    const isInputNotValid = !input.validity.valid;

    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(input); //в этой переменной будет лежать текст ошибки
      this._showInputError(errorMessage, input); //если получаем ошибку => показываем сообщение об ошибке
    } else {
      this._hideInputError(input); //когда поле валидно => убираем сообщение об ошибке
    }
  };

  _onInput(input) {
    this._isValid(input);
    this._toggleButtonState();
  }

  _setEventListeners() {
    //вешаем события на саму форму и запрещаем отправку по умолчанию

    this.inputs = Array.from(this.form.querySelectorAll(this._inputSelector));
    this.submitButton = this.form.querySelector(this._submitButtonSelector);

    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // Обойдём все элементы на форме
    this.inputs.forEach(input => {
      input.addEventListener("input", () => this._onInput(input));
    });
  }

  reset() {
    this._hideInputError();
    this._toggleButtonState();

  }
  enableValidation() {
    this._setEventListeners();
  }
}

// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет один публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
