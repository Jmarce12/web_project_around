export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this.userName = userNameSelector;
    this.userJob = userJobSelector;
  }

  getUserInfo() {
    return {
      nombre: this.userName.textContent,
      profesion: this.userJob.textContent,
    };
  }

  setUserInfo({ nombre, profesion }) {
    this.userName.textContent = nombre;
    this.userJob.textContent = profesion;
  }
}
