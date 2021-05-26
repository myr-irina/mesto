export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    });
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    });
  }

  setUserData({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    });
  }

  updateAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link
      })
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    });
  }

  createCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    });
  }

  toggleLikeCard(cardId, like) {
    return fetch(`${this._address}/cards/like/${cardId}`, {
      method: like ? "PUT" : "DELETE",     
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`${res.status}`);
    });
  }
}


// fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards)

// fetch('https://nomoreparties.co/v1/cohort-24/users/me', {
//   headers: {
//     authorization: '4efae440-5715-4ca9-8417-962742ac588e'
//   }
// })

//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//       console.log(data.user.name); // если мы попали в этот then, data — это объект
//   })
//   .catch((err) => {
//     console.log('Ошибка. Запрос не выполнен: ', err);
//   });

//   fetch('https://nomoreparties.co/v1/cohort-24/cards', {
//   headers: {
//     authorization: '4efae440-5715-4ca9-8417-962742ac588e'
//   }
// })

//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//       console.log(data.user.name); // если мы попали в этот then, data — это объект
//   })
//   .catch((err) => {
//     console.log('Ошибка. Запрос не выполнен: ', err);
//   });

//   fetch('https://nomoreparties.co/v1/cohort-24/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: '4efae440-5715-4ca9-8417-962742ac588e',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Василиса',
//     about: 'Путешествую'
//   })
// });

// fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards', {
//   method: 'POST',
//   headers: {
//     authorization: '4efae440-5715-4ca9-8417-962742ac588e',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   })
// });

// fetch('https://mesto.nomoreparties.co/v1/cohort-24/users/me/avatar ', {
//   method: 'PATCH',
//   headers: {
//     authorization: '4efae440-5715-4ca9-8417-962742ac588e',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     avatar: 'https://unsplash.com/photos/FzhjlbQXre0',
//   })
// });
