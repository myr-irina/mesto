import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  // собирает данные всех полей формы
  _getInputValues() {
    this._values = {};
    this._inputs = Array.from.this._form.querySelectorAll('.popup__field-input');
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    
    return this._values;
  }

  // добавляет обработчик клика иконке закрытия и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();

    this._form = this._popupElement.querySelector('.popup__field-form');
    this._form.addEventListener('submit', () => {
      const data = this._getInputValues();
      this._submitHandler(data);      
    })  
  }

  close() {
    super.close();
    this._form.reset();    
  }
}

