const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profile = document.querySelector(".profile");
let currentName = profile.querySelector(".profile__name").textContent;
let currentJob = profile.querySelector(".profile__job").textContent;
const editProfileForm = document.querySelector("#edit-profile-form");
const saveButton = editProfileForm.querySelector(".popup__save-button");
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

const handleSuperimposeClick = (evt) => {
  if (evt.target.classList.contains("popup__opened")) {
    evt.target.classList.remove("popup__opened");
  }
};

const clickSuperimpose = () => {
  window.addEventListener("click", handleSuperimposeClick);
};

const handleEscKeyClick = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup__opened");
    if (popup) {
      popup.classList.remove("popup__opened");
    }
  }
};

const handleEscClose = () => {
  document.addEventListener("keydown", handleEscKeyClick, { once: true });
};

const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("element__like__active");
};

const handleDeleteButtonClick = (evt) => {
  evt.target.closest(".element").remove();
};

const handleImageClick = (evt) => {
  const imagePopup = document.querySelector("#image-popup");
  const image = document.querySelector(".popup__image-photo");
  const closeImage = imagePopup.querySelector(".popup__close-button");
  const imageTitle = imagePopup.querySelector(".popup__image-title");
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageTitle.textContent = evt.target.alt;
  imagePopup.classList.add("popup__opened");
  closeImage.addEventListener("click", handleCloseButtonClick);
  clickSuperimpose();
  handleEscClose();
};

function showCards(card) {
  const cardTemplate = document.querySelector("#element-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__title").textContent = card.name;
  cardElement.querySelector(".element__photo").src = card.link;
  cardElement.querySelector(".element__photo").alt = card.name;
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", handleLikeButtonClick);
  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", handleDeleteButtonClick);
  cardElement
    .querySelector(".element__photo")
    .addEventListener("click", handleImageClick);
  return cardElement;
}

initialCards.forEach((card) => {
  elements.append(showCards(card));
});

const handleEditButtonClick = () => {
  const closeEditForm = editProfileForm.querySelector(".popup__close-button");
  editProfileForm.classList.add("popup__opened");
  editProfileForm.querySelector("#nombre").value = currentName;
  editProfileForm.querySelector("#profesion").value = currentJob;
  closeEditForm.addEventListener("click", handleCloseButtonClick);
  saveButton.addEventListener("click", handleProfileFormSubmit);
  clickSuperimpose();
  handleEscClose();
};

const handleAddButtonClick = () => {
  const closeAddForm = newPlaceForm.querySelector(".popup__close-button");
  newPlaceForm.classList.add("popup__opened");
  closeAddForm.addEventListener("click", handleCloseButtonClick);
  createButton.addEventListener("click", handleNewCardFormSubmit);
  clickSuperimpose();
  handleEscClose();
};

const handleCloseButtonClick = (evt) => {
  const popup = evt.target.closest(".popup");
  popup.classList.remove("popup__opened");
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  let nameInput = editProfileForm.querySelector("#nombre");
  let jobInput = editProfileForm.querySelector("#profesion");
  currentName = nameInput.value;
  currentJob = jobInput.value;
  profile.querySelector(".profile__name").textContent = currentName;
  profile.querySelector(".profile__job").textContent = currentJob;
  editProfileForm.classList.remove("popup__opened");
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: newPlaceForm.querySelector("#titulo").value,
    link: newPlaceForm.querySelector("#enlace").value,
  };
  elements.prepend(showCards(newCard));
  newPlaceForm.classList.remove("popup__opened");
  newPlaceForm.querySelector("#titulo").value = "";
  newPlaceForm.querySelector("#enlace").value = "";
};

editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);

// <---------------Validation of forms--------------->

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__save-button_disabled");
    buttonElement.disabled = false;
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const eventPreventDefault = (evt) => {
  evt.preventDefault();
};

const enableValidation = (configList) => {
  const formList = Array.from(
    document.querySelectorAll(configList.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    formElement.addEventListener("submit", eventPreventDefault);
  });
};

const popupActive = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    if (popup.classList.contains("popup__opened")) {
      hideInputError(popup, popup.querySelector(config.inputSelector));
      enableValidation(config);
    } else {
      formElement.removeEventListener("submit", eventPreventDefault);
    }
  });
};

window.addEventListener("click", popupActive);

// <---------------End of validation of forms--------------->
