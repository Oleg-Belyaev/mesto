export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo () {
    const info = {}
    info.name = this._name.textContent;
    info.about = this._about.textContent;
    return info;
  }

  setUserInfo (data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this._avatar.src = data.avatar;
  }
}
