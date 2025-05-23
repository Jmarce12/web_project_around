import Api from "./Api.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./Userinfo.js";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__job");
const profileNameInput = document.querySelector("#nombre");
const profileJobInput = document.querySelector("#profesion");
const editProfileForm = document.querySelector("#edit-profile-form");
const newPlaceForm = document.querySelector("#new-place-form");
const profileAvatar = document.querySelector(".profile__photo");
const editProfileAvatar = document.querySelector(".profile__overlay");
const editAvatarForm = document.querySelector("#edit-avatar");

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

const popupEditProfileAvatar = new PopupWithForm(
  "#edit-avatar",
  ({ avatar }) => {
    return api.editAvatar({ avatar }).then((res) => {
      userInfo.editAvatar({ avatar: res.avatar });
    });
  }
);

const popupEditProfile = new PopupWithForm(
  "#edit-profile-form",
  ({ nombre, profesion }) => {
    return api.setUserData({ nombre, profesion }).then((res) => {
      userInfo.setUserInfo({ nombre: res.name, profesion: res.about });

      profileName.textContent = userInfo.getUserInfo().nombre;
      profileJob.textContent = userInfo.getUserInfo().profesion;
    });
  }
);

const popupNewPlace = new PopupWithForm(
  "#new-place-form",
  ({ titulo, enlace }) => {
    return api.addNewCard({ titulo, enlace }).then((res) => {
      const card = new Card(
        res,
        ".element",
        (name, link) => {
          popupWithImage.open(name, link);
        },
        (_id) => {
          popupDeleteCard.open();
          popupDeleteCard.setEventListeners(_id);
        }
      );
      const cardElement = card.generateCard();
      document.querySelector(".elements").prepend(cardElement);
    });
  },
  "Crear"
);

const popupDeleteCard = new PopupWithConfirmation(
  "#confirm-delete",
  (cardId) => {
    return api
      .deleteCard(cardId)
      .then(() => {
        document.querySelector(`#a${cardId}`).closest(".element").remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

api
  .getUserData()
  .then((res) => {
    profileName.textContent = res.name;
    profileJob.textContent = res.about;
    profileAvatar.src = res.avatar;
    profileAvatar.alt = res.name;

    return api.getInitialCards();
  })
  .then((cards) => {
    const cardList = new Section(
      {
        data: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            ".element",
            (name, link) => {
              popupWithImage.open(name, link);
            },
            (_id) => {
              popupDeleteCard.open();
              popupDeleteCard.setEventListeners(_id);
            },
            (cardId, isLiked) => {
              api
                .cardLike(cardId, isLiked)
                .then((res) => {
                  console.log(res);
                  card.updateLikes();
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          );
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
const profileAvatarFormValidator = new FormValidator(config, editAvatarForm);
const newPlaceFormValidator = new FormValidator(config, newPlaceForm);
editProfileFormValidator.enableValidation();
profileAvatarFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

const handleEditAvatarButtonClick = () => {
  editProfileAvatar.classList.remove("profile__overlay_active");
  profileAvatarFormValidator.resetValidation();
  editAvatarForm.querySelector(".popup__input").value = profileAvatar.src;
  popupEditProfileAvatar.open();
  popupEditProfileAvatar.setEventListeners();
};

const handleEditProfileButtonClick = () => {
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

const handleAvatarClick = () => {
  editProfileAvatar.addEventListener("click", handleEditAvatarButtonClick);
};

const handleAvatarHover = () => {
  editProfileAvatar.classList.add("profile__overlay-active");
  editProfileAvatar.addEventListener("mouseleave", () => {
    editProfileAvatar.classList.remove("profile__overlay-active");
  });
  handleAvatarClick();
  editProfileAvatar.removeEventListener("mouseleave", () => {
    editProfileAvatar.classList.remove("profile__overlay-active");
  });
};

// Event Listeners for Edit and Add buttons
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", handleEditProfileButtonClick);
document
  .querySelector(".profile__add-button")
  .addEventListener("click", handleAddButtonClick);
profileAvatar.addEventListener("mouseover", handleAvatarHover);
