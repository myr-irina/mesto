import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();

    this._popupElement.querySelector('.popup__caption').textContent = name;
    this._popupElement.querySelector('.popup__image').src = link;
    

    // imgPreviewTargetImg.src = card.link;
    // imgPreviewTargetImg.alt = card.name;
    // imgPreviewTargetCaption.textContent = card.name;
  }
}
