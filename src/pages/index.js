import Card from "../../src/components/Сards.js";
import FormValidation from "../components/FormValidator.js";
import {
  profilePopup,
  profileAvatar,
  cardPopup,
  imgPopup,
  profileOpenButton,
  cardPopupOpen,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  container,
  cardPopupForm,
  validationConfig,
  profileFormElement,
  templateElement,
  deletePopup,
  avatarUpdatePopup,
  profileAvatarButton,
  avatarFormElement,
} from "../utils/variables.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";
import PopupWithDeleteForm from "../components/PopupWithDeleteForm.js";

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-24",
  token: "4efae440-5715-4ca9-8417-962742ac588e",
});

const createCard = (data) => {
  const card = new Card({
    data: data,
    cardTemplate: templateElement,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleCardDelete: () => {
      deleteCardPopup.open(()=> {
        deleteCardPopup.setLoading(true);
        api.deleteCard(data._id)
        .then(() => {
          card.deleteButtonClick();
          deleteCardPopup.close();
          deleteCardPopup.setLoading(false);
        })
        .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
      })
    },
    userId: userinfo.getUserId(),
    api: api,
  });

  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    renderer: (data) => {
      cardsList.addItem(createCard(data));
    },
  },
  container
);

const userinfo = new UserInfo({
  name: profileTitle,
  about: profileSubtitle,
  avatar: profileAvatar,
});

// Пп 1 и 2: загрузка инфо пользователя с сервера и карточек
Promise.all([api.getUserData(), api.getInitialCards()]).then(
  ([userData, initialCards]) => {
    userinfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      id: userData._id,
    });
    cardsList.renderItems(initialCards);
  }
);

const popupWithImage = new PopupWithImage(imgPopup);
const addCardPopup = new PopupWithForm(cardPopup, addCardSubmitHandler);
const editProfilePopup = new PopupWithForm(profilePopup, editFormSubmitHandler);
const deleteCardPopup = new PopupWithDeleteForm(deletePopup);

const formAddCardValidator = new FormValidation(
  validationConfig,
  cardPopupForm
);

const formEditCardValidator = new FormValidation(
  validationConfig,
  profileFormElement
);

const formUpdateAvatarValidator = new FormValidation(
  validationConfig,
  avatarFormElement
);

//  п.9 Обновление аватара
const updateAvatarPopup = new PopupWithForm(
  avatarUpdatePopup,
  avatarPopupSubmitHandler
);

function avatarPopupSubmitHandler(data) {
  updateAvatarPopup.setLoading(true);
  api
    .updateAvatar(data.avatar)
    .then((res) => {
      userinfo.setUserAvatar(res.avatar);
      updateAvatarPopup.close();
    })
    .catch((err) => console.log(`Ошибка при загрузке фотографии: ${err}`))
    .finally(() => {
      updateAvatarPopup.setLoading(false);
    });
}

// 3. редактирование профиля
function editFormSubmitHandler(data) {
  editProfilePopup.setLoading(true);
  api
    .setUserData(data)
    .then(({ name, about, avatar }) => {
      userinfo.setUserInfo({ name, about, avatar });
      editProfilePopup.close();
    })
    .catch((err) => console.log(`Ошибка при обновлении профиля: ${err}`))
    .finally(() => {
      editProfilePopup.setLoading(false);
    });
}

// п.4 добавление новой карточки
function addCardSubmitHandler(data) {
  addCardPopup.setLoading(true);
  api
    .createCard(data)
    .then((res) => {
      cardsList.addItem(createCard(res));
      addCardPopup.close();
    })
    .catch((err) => console.log(`Ошибка при загрузке карточки: ${err}`))
    .finally(() => {
      addCardPopup.setLoading(false);
    });
}

// // // ф-ция коллбэк для удаления карточки
function deleteCardSubmitHandler() {
  deleteCardPopup.open(()=> {
    api.deleteCard(card.getId())
    .then(() => {
      card.deleteButtonClick();
      deleteCardPopup.close();
    })
    .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
  })
}

profileOpenButton.addEventListener("click", () => {
  nameInput.value = userinfo.getUserInfo().name;
  jobInput.value = userinfo.getUserInfo().about;
  editProfilePopup.open();
  formEditCardValidator.reset();
});

cardPopupOpen.addEventListener("click", () => {
  addCardPopup.open();
  formAddCardValidator.reset();
});

profileAvatarButton.addEventListener("click", () => {
  updateAvatarPopup.open();
  formUpdateAvatarValidator.reset();
});

updateAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
popupWithImage.setEventListeners();
deleteCardPopup.setEventListeners();
formAddCardValidator.enableValidation();
formEditCardValidator.enableValidation();
formUpdateAvatarValidator.enableValidation();
