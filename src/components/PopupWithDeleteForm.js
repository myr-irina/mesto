import Popup from "./Popup.js";

export default class PopupWithDeleteForm extends Popup {
  constructor({ popupSelector, deleteCard }) {
    super(popupSelector);
    this._deleteCard = deleteCard;
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._deleteCard();
      this.close();
    });
  }
}
