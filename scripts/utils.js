export const handleSuperimposeClick = (evt) => {
  if (evt.target.classList.contains("popup__opened")) {
    evt.target.classList.remove("popup__opened");
  }
};

export const handleEscKeyClick = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup__opened");
    if (popup) {
      popup.classList.remove("popup__opened");
    }
  }
};

export const handleCloseButtonClick = (evt) => {
  const popup = evt.target.closest(".popup");
  popup.classList.remove("popup__opened");
};

export const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  let nameInput = editProfileForm.querySelector("#nombre");
  let jobInput = editProfileForm.querySelector("#profesion");
  currentName = nameInput.value;
  currentJob = jobInput.value;
  profile.querySelector(".profile__name").textContent = currentName;
  profile.querySelector(".profile__job").textContent = currentJob;

  editProfileForm.classList.remove("popup__opened");
};
