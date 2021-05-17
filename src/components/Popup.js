export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupActiveSelector = "popup_is-opened";
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popupElement.classList.add(this._popupActiveSelector);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove(this._popupActiveSelector);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.keyCode === 27) {
      console.log(this)
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
  
}
