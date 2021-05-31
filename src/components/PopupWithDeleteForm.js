// import Popup from "./Popup.js";
import Popup from "./Popup.js";

export default class PopupWithDeleteForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__field-form');
    this._button = this._popupElement.querySelector('.popup__button');
  }

  getId() {
    return this._id;
  }
  
  open(deleteCard) {
    super.open();
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._deleteCard();
    });
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Удаление...";
    } else {
      this._button.textContent = this._button.ariaLabel;
    }
  }
}
