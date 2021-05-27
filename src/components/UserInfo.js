export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const data = {}
    data.name = this._name.textContent;
    data.about = this._about.textContent;
    data.avatar = this._avatar.src;

    return data;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameInfo, aboutInfo, avatarInfo) {
    this._name.textContent = nameInfo;
    this._about.textContent = aboutInfo;
    this._avatar.src = avatarInfo;
  }
}