export default class Card {
  constructor(data, cardTemplate, { handleCardClick }) {
    // добавили вторым параметром селектор template-элемента
    console.log(data)
    this.name = data.name;
    this.link = data.link;
    // this._cardImage = document.querySelector(".elements__image");
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = this._cardTemplate.cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");    
    this._likeButton = this._element.querySelector(".elements__button");
    this._trashButton =  this._element.querySelector(".elements__button-trash");
    // Добавим данные
    this._cardImage.src = this.link;   
    this._cardImage.alt = this.name;
    this._element.querySelector(".elements__title").textContent = this.name;
    this._setEventListeners(); // добавим обработчики

    // Вернём элемент наружу
    return this._element;
  }

  _likeButtonClick() {
    this._likeButton
      .classList.toggle("elements__button_active");
  }

  _deleteButtonClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton
      .addEventListener("click", (event) => {
        this._likeButtonClick(event);
      });

      this._trashButton
      .addEventListener("click", (event) => {
        this._deleteButtonClick(event);
      });

      this._cardImage
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );
  }
}
