export default class Popup {
  constructor (popupSelector) {
   
    this._popupElement = document.querySelector(popupSelector);
    
    this.setEventListeners();
  }
  open() {
    this._popupElement.classList.add('popup_is-opened');
    document.addEventListener('keyup', this._handleEscClose);
    this.setEventListeners();
  };

  close() {
    this._popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', this._handleEscClose); 
    // сюда можно также добавить закртие на оверлей
  };

  _handleEscClose(evt) {
    if(evt.keyCode === 27) {
      this.close();
    }
  };

  setEventListeners() {
  
    this._popupElement
    .querySelector('.popup__close').addEventListener('click', () => {
      this.close() 
    })
  };
};