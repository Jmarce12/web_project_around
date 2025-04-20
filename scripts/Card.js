export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#element-template`)
      .content.querySelector(this._templateSelector)
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__photo").alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeButtonClick();
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });
    const imagePopup = document.querySelector("#image-popup");
    imagePopup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this._handleCloseButtonClick();
      });
  }

  _handleImageClick = () => {
    const imagePopup = document.querySelector("#image-popup");
    imagePopup.classList.add("popup__opened");
    const image = imagePopup.querySelector(".popup__image-photo");
    image.src = this._link;
    image.alt = this._name;
    imagePopup.querySelector(".popup__image-title").textContent = this._name;
  };

  _handleLikeButtonClick = () => {
    this._likeButton = this._element.querySelector(".element__like");
    this._likeButton.classList.toggle("element__like__active");
  };

  _handleDeleteButtonClick = () => {
    this._deleteButton = this._element.querySelector(".element__delete");
    this._deleteButton.closest(".element").remove();
  };

  _handleCloseButtonClick = () => {
    const imagePopup = document.querySelector("#image-popup");
    imagePopup.classList.remove("popup__opened");
    const closeImage = imagePopup.querySelector(".popup__close-button");
    closeImage.removeEventListener("click", this._handleCloseButtonClick);
    imagePopup.querySelector(".popup__image-photo").src = "";
    imagePopup.querySelector(".popup__image-title").textContent = "";
  };
}
