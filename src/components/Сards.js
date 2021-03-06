export default class Card {
  constructor({ data, cardTemplate, handleCardClick, handleCardDelete, api, userId }) {
    // добавили вторым параметром селектор template-элемента
    this.name = data.name;
    this.link = data.link;
    this._like = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._myId = userId;
    this._api = api;
    this._handleCardDelete = handleCardDelete;
  }

  //создаем DOM разметку
  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = this._cardTemplate.cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  // добавляем содержимое карточки
  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
    this._likeButton = this._element.querySelector(".elements__button");
    this._trashButton = this._element.querySelector(".elements__button-trash");
    this._likeCounter = this._element.querySelector(".elements__like-count");

    // Добавим данные
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._element.querySelector(".elements__title").textContent = this.name;
    // заберем в textcontent кол-во лайков
    this._likeCounter.textContent = this._like.length;

    // убираем корзину, если не наша карточка
    if (this._ownerId === this._myId) {
      this._trashButton.classList.remove("elements__button-trash_hidden");
    }
    // закрасим сердечко, если поставила я (мой Id)
    this._like.forEach((item) => {
      if (item._id === this._myId) {
        this._likeButton.classList.add("elements__button_active");
      } else {
        this._likeButton.classList.remove("elements__button_active");
      }
    });
    
    // добавим обработчики
    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  getId() {
    return this._id;
  }


  _setLikes() {
    const activeBtnLike = this._likeButton.classList.contains(
      "elements__button_active"
    );

    if (!activeBtnLike) {
      this._api
        .addLike(this.getId())
        .then((res) => {
          const likeQuantity = res.likes.length;
          this._likeCounter.textContent = likeQuantity;
          this._likeButtonClick();
        })
        .catch((err) => console.log(`Ошибка при добавлении лайка: ${err}`));
    } else {
      this._api
        .deleteLike(this.getId())
        .then((res) => {
          this._likeCounter.textContent = res.likes.length;
          this._likeButtonClick();
        })
        .catch((err) => console.log(`Ошибка при удалении лайка: ${err}`));
    }
  }

  _likeButtonClick() {
    this._likeButton.classList.toggle("elements__button_active");
  }

  deleteButtonClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._setLikes();
    });

    this._trashButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleCardDelete();
    });
    // this._handleCardClick
    this._cardImage.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleCardClick();
    });
  }
}
