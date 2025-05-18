import Api from "./Api.js";
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

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "811785a2-de15-4b25-a503-1867df4610d5",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userJobSelector: profileJob,
});

const popupWithImage = new PopupWithImage("#image-popup");
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

api
  .getUserData()
  .then((res) => {
    profileName.textContent = res.name;
    profileJob.textContent = res.about;
    profile.querySelector(".profile__photo").src = res.avatar;

    return api.getInitialCards();
  })
  .then((cards) => {
    const cardList = new Section(
      {
        data: cards,
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
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

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
