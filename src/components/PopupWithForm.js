import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    
    this._form = this._popupElement.querySelector('.popup__field-form');
    this._inputs = Array.from(this._form.querySelectorAll(".popup__field-input"));
    this._submitHandler = submitHandler;
  }

  // собирает данные всех полей формы
  _getInputValues() {
    this._values = {};
  
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value;
    });
    
    return this._values;
  }

  // добавляет обработчик клика иконке закрытия и обработчик сабмита формы
  setEventListeners() {
    this._form 
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const data = this._getInputValues();
        this._submitHandler(data);
      });
   
    super.setEventListeners();
  }

  // setInputValues(values) {
  //   this._inputs = Array.from(this._form.querySelectorAll(".popup__field-input"));
  //   this._inputs.forEach((input) => {
  //     input.value = values[input.name] || '';    
  //   })
  // }

  close() {
    super.close();
    this._form.reset();
  }
}
