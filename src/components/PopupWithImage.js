import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupCaption = this._popupElement.querySelector('.popup__caption');
  }

  open({ name, link }) {    
    super.open();
    
    this._popupCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}
