import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  handleSuperimposeClick,
  handleEscKeyClick,
  handleCloseButtonClick,
  handleProfileFormSubmit,
} from "./utils.js";

const profile = document.querySelector(".profile");
let currentName = profile.querySelector(".profile__name").textContent;
let currentJob = profile.querySelector(".profile__job").textContent;
const editProfileForm = document.querySelector("#edit-profile-form");
const newPlaceForm = document.querySelector("#new-place-form");
const createButton = newPlaceForm.querySelector(".popup__save-button");
const elements = document.querySelector(".elements");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const clickSuperimpose = () => {
  window.addEventListener("click", handleSuperimposeClick);
};

const handleEscClose = () => {
  document.addEventListener("keydown", handleEscKeyClick, { once: true });
};

initialCards.forEach((card) => {
  const newCard = new Card(card, ".element");
  const cardElement = newCard.generateCard();
  document.querySelector(".elements").append(cardElement);
});

const handleEditButtonClick = () => {
  editProfileForm.classList.add("popup__opened");

  editProfileForm.querySelector("#nombre").value = currentName;
  editProfileForm.querySelector("#profesion").value = currentJob;

  const closeEditForm = editProfileForm.querySelector(".popup__close-button");
  closeEditForm.addEventListener("click", handleCloseButtonClick);

  const formElement = new FormValidator(config, editProfileForm);
  formElement.enableValidation();

  const saveButton = editProfileForm.querySelector(".popup__save-button");
  saveButton.addEventListener("click", handleProfileFormSubmit);
  clickSuperimpose();
  handleEscClose();
};

const handleAddButtonClick = () => {
  newPlaceForm.classList.add("popup__opened");

  const closeAddForm = newPlaceForm.querySelector(".popup__close-button");
  closeAddForm.addEventListener("click", handleCloseButtonClick);

  const formElement = new FormValidator(config, newPlaceForm);
  formElement.enableValidation();

  createButton.addEventListener("click", handleNewCardFormSubmit);
  clickSuperimpose();
  handleEscClose();
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {
    name: newPlaceForm.querySelector("#titulo").value,
    link: newPlaceForm.querySelector("#enlace").value,
  };

  const card = new Card(newCard, ".element");
  const cardElement = card.generateCard();
  elements.prepend(cardElement);

  newPlaceForm.classList.remove("popup__opened");
  newPlaceForm.querySelector("#titulo").value = "";
  newPlaceForm.querySelector("#enlace").value = "";
};

// Event Listeners for Edit and Add buttons
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", handleEditButtonClick);
document
  .querySelector(".profile__add-button")
  .addEventListener("click", handleAddButtonClick);
