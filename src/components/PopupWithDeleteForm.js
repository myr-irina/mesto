import Popup from "./Popup.js";

export default class PopupWithDeleteForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popupElement.querySelector('.popup__button');
  }

  open(deleteCard) {
    super.open();
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", (e) => {
      e.preventDefault();
      this._deleteCard();      
    });
  }
}
