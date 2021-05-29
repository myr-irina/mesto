export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse)
  }

  setUserData({ name, about, avatar }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
        avatar,
      }),
    })
    .then(this._checkResponse)
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
    })
    .then(this._checkResponse)
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
        link
      }),
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
     
    })
    .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "PUT",     
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    })
    .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "DELETE",     
      headers: {
        authorization: this._token,       
      },
    })
    .then(this._checkResponse)
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
