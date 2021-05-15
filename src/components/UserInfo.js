export default class UserInfo {
  constructor({name, about}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const data = {}
    data.name = this._name.textContent;
    data.about = this._about.textContent;

    return data;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameInfo, aboutInfo) {
    this._name.textContent = nameInfo;
    this._about.textContent = aboutInfo;
  }
}