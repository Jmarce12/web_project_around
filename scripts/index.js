import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./Userinfo.js";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__job");
const profileNameInput = document.querySelector("#nombre");
const profileJobInput = document.querySelector("#profesion");
const editProfileForm = document.querySelector("#edit-profile-form");
const newPlaceForm = document.querySelector("#new-place-form");

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

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".element", (name, link) => {
        popupWithImage.open(name, link);
      });
      const cardElement = card.generateCard();
      cardList.setItem(cardElement);
    },
  },
  ".elements"
);

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileJob,
});

const popupWithImage = new PopupWithImage(".popup__image");
popupWithImage.setEventListeners();

const popupEditProfile = new PopupWithForm(
  "#edit-profile-form",
  ({ nombre, profesion }) => {
    userInfo.setUserInfo({ nombre, profesion });

    profileName.textContent = userInfo.getUserInfo().nombre;
    profileJob.textContent = userInfo.getUserInfo().profesion;
  }
);

const popupNewPlace = new PopupWithForm(
  "#new-place-form",
  ({ titulo, enlace }) => {
    const newCard = {
      name: titulo,
      link: enlace,
    };
    const card = new Card(newCard, ".element", (name, link) => {
      popupWithImage.open(name, link);
    });
    const newCardElement = card.generateCard();
    cardList.setItem(newCardElement);
  }
);

cardList.renderItems();

const editProfileFormValidator = new FormValidator(config, editProfileForm);
const newPlaceFormValidator = new FormValidator(config, newPlaceForm);
editProfileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

const handleEditButtonClick = () => {
  editProfileFormValidator.resetValidation();
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  popupEditProfile.open();
  popupEditProfile.setEventListeners();
};

const handleAddButtonClick = () => {
  newPlaceFormValidator.resetValidation();
  popupNewPlace.open();
  popupNewPlace.setEventListeners();
};

// Event Listeners for Edit and Add buttons
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", handleEditButtonClick);
document
  .querySelector(".profile__add-button")
  .addEventListener("click", handleAddButtonClick);
