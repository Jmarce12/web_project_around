import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  setEventListeners(cardId) {
    super.setEventListeners();
    this._form.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        this._handleSubmit(cardId);
        this.close();
        this._resetEventListeners();
      },
      { once: true }
    );
  }

  open() {
    this._popup.classList.add("popup__opened");
    super.setEventListeners();
  }

  close() {
    super.close();
  }

  _resetEventListeners() {
    this._form.removeEventListener("submit", this._handleSubmit);
  }
}
