export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    this.data = {}
    this.data.name = this._name.textContent
    this.data.about = this._job.textContent

    return this.data;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._name.textContent = UserInfo.name
    this._job.textContent = UserInfo.job
  }
}