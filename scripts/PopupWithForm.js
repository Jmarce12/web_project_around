import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, buttonText = "Guardar") {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._submitButton = this._form.querySelector(".popup__save-button");
    this.buttonText = buttonText;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.id] = input.value;
    });
    return this._inputValues;
  }

  _resetEventListeners() {
    this._form.removeEventListener("submit", this._handleFormSubmit);
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        this.setLoading(true);
        this._handleFormSubmit(this._getInputValues()).then(() => {
          this.close();
          this.setLoading(false);
        });
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

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this.buttonText;
    }
  }
}
