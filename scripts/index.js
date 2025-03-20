const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profile = document.querySelector(".profile");
let currentName = profile.querySelector(".profile__name").textContent;
let currentJob = profile.querySelector(".profile__job").textContent;
let editProfileForm = document.querySelector("#edit-profile-form");
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

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("element__like__active");
}

function handleDeleteButtonClick(evt) {
  evt.target.closest(".element").remove();
}

function handleImageClick(evt) {
  const imagePopup = document.querySelector("#image-popup");
  const image = document.querySelector(".popup__image-photo");
  const closeImage = imagePopup.querySelector(".popup__close-button");
  const imageTitle = imagePopup.querySelector(".popup__image-title");
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageTitle.textContent = evt.target.alt;
  imagePopup.classList.add("popup__opened");
  closeImage.addEventListener("click", handleCloseButtonClick);
}

function handleEditButtonClick() {
  const closeEditForm = editProfileForm.querySelector(".popup__close-button");
  editProfileForm.classList.add("popup__opened");
  editProfileForm.querySelector("#nombre").value = currentName;
  editProfileForm.querySelector("#profesion").value = currentJob;
  closeEditForm.addEventListener("click", handleCloseButtonClick);
  saveButton.addEventListener("click", handleProfileFormSubmit);
}

function handleAddButtonClick() {
  const closeAddForm = newPlaceForm.querySelector(".popup__close-button");
  newPlaceForm.classList.add("popup__opened");
  closeAddForm.addEventListener("click", handleCloseButtonClick);
  createButton.addEventListener("click", handleNewCardFormSubmit);
}

function handleCloseButtonClick(evt) {
  let popup = evt.target.closest(".popup");
  popup.classList.remove("popup__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = editProfileForm.querySelector("#nombre");
  let jobInput = editProfileForm.querySelector("#profesion");
  currentName = nameInput.value;
  currentJob = jobInput.value;
  profile.querySelector(".profile__name").textContent = currentName;
  profile.querySelector(".profile__job").textContent = currentJob;
  editProfileForm.classList.remove("popup__opened");
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  let newCard = {
    name: newPlaceForm.querySelector("#titulo").value,
    link: newPlaceForm.querySelector("#enlace").value,
  };
  elements.prepend(showCards(newCard));
  newPlaceForm.classList.remove("popup__opened");
  newPlaceForm.querySelector("#titulo").value = "";
  newPlaceForm.querySelector("#enlace").value = "";
}

editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);
