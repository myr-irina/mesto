export default class FormValidation {
  constructor(validationConfig, form) {
    this._form = form;
    this._buttonElement = this._form.querySelector(
      validationConfig.submitButtonSelector
    );
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(validationConfig.inputSelector)
    );
    this._errorOutline = validationConfig.errorOutline;
  }

  _showInputError = (input, errorMessage) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._inputErrorClass);
    input.classList.add(this._errorOutline);
  };

  // Этот метод удаляет класс с ошибкой
  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.textContent = "";
    errorElement.classList.remove(this._inputErrorClass);
    input.classList.remove(this._errorOutline);
  };

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

  //Этот метод переключает кнопку submit
  _toggleButtonState = () => {
    if (this._hasNotValidInput()) {
      this._buttonElement.toggleAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.toggleAttribute("disabled", false);
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _hasNotValidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  //Этот метод проверяет валидность поля
  _isValid = (input) => {
    const isInputNotValid = !input.validity.valid;

    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(input); //в этой переменной будет лежать текст ошибки
      this._showInputError(input, errorMessage); //если получаем ошибку => показываем сообщение об ошибке
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
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // Обойдём все элементы на форме
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => this._onInput(input));
    });

    this._inputList.forEach((input) => {
      this._onInput(input);
    });
  }

  reset() {
    this._inputList.forEach(this._hideInputError);
    this._toggleButtonState();   
  }

  enableValidation() {
    this._setEventListeners();
  }
}
