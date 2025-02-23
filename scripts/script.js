const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const profile = document.querySelector(".profile");
let currentName = profile.querySelector(".profile__name").textContent;
let currentJob = profile.querySelector(".profile__job").textContent;
let formElement = document.querySelector(".popup");
const saveButton = formElement.querySelector(".popup__save-button");

function handleEditButtonClick() {
  formElement.classList.add("popup__opened");
  formElement.querySelector("#nombre").value = currentName;
  formElement.querySelector("#profesion").value = currentJob;
}

function handleCloseButtonClick() {
  formElement.classList.remove("popup__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = formElement.querySelector("#nombre");
  let jobInput = formElement.querySelector("#profesion");
  currentName = nameInput.value;
  currentJob = jobInput.value;
  profile.querySelector(".profile__name").textContent = currentName;
  profile.querySelector(".profile__job").textContent = currentJob;
  formElement.classList.remove("popup__opened");
}

editButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
saveButton.addEventListener("click", handleProfileFormSubmit);
