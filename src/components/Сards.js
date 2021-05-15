export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    // добавили вторым параметром селектор template-элемента
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = this._cardSelector.cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._setEventListeners(); // добавим обработчики

    // Добавим данные
    this._element.querySelector(".elements__image").src = this.link;
    this._element.querySelector(".elements__image").alt = this.name;
    this._element.querySelector(".elements__title").textContent = this.name;

    // Вернём элемент наружу
    return this._element;
  }

  _likeButtonClick() {
    this._element
      .querySelector(".elements__button")
      .classList.toggle("elements__button_active");
  }

  _deleteButtonClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__button")
      .addEventListener("click", (event) => {
        this._likeButtonClick(event);
      });

    this._element
      .querySelector(".elements__button-trash")
      .addEventListener("click", (event) => {
        this._deleteButtonClick(event);
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () =>
        this._handleCardClick(this._name, this._link)
      );
  }
}
