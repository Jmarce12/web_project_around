export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteButtonClick,
    _handleLikeButtonClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = _handleLikeButtonClick;
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
    this._element.querySelector(".element__photo").id = `a${this._id}`;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._isLiked = !this._isLiked;
        this._handleLikeButtonClick(this._id, this._isLiked);
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick(this._id);
        this._resetDeleteListener();
      });
  }

  updateLikes() {
    this._likeButton = document
      .querySelector(`#a${this._id}`)
      .closest(".element")
      .querySelector(".element__like");
    this._likeButton.classList.toggle("element__like__active");
  }

  _resetDeleteListener() {
    this._element
      .querySelector(".element__delete")
      .removeEventListener("click", this._handleDeleteButtonClick);
  }
}
