export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this.userName = userNameSelector;
    this.userJob = userJobSelector;
    this.userAvatar = document.querySelector(".profile__photo");
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

  editAvatar({ avatar }) {
    this.userAvatar.src = avatar;
  }
}
