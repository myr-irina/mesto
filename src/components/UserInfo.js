export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const data = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };

    return data;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, about, avatar, id}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._userID = id;
  }

  getUserId() {
    return this._userID;
  }
}