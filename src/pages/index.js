import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {data} from "../utils/data.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithAccept from '../components/PopupWithAccept';

const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCardOpenButton = document.querySelector('.profile__button-add');
const inputName = document.querySelector('input[name=name]');
const inputAbout = document.querySelector('input[name=about]');
const avatar = document.querySelector('.profile__avatar');
const avatarEdit = avatar.querySelector('.profile__avatar-edit');

const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__foto');

function renderLoading(isLoading, popupSelector, text) {
  const popup = document.querySelector(popupSelector)
  const submitButton = popup.querySelector('button[type=submit]')
  if(isLoading) {
    submitButton.textContent = `${text}...`;
  } else {
    submitButton.textContent = text;
  }
}

const api = new Api({
  headers: {
    authorization: 'faa09cc7-7270-48b0-804c-b072edafec63',
    'Content-Type': 'application/json'
  },
  url: 'https://mesto.nomoreparties.co/v1/cohort-17'
});


const popupImage = new PopupWithImage('#popup-image', '.popup__image', '.popup__caption');

popupImage.setEventListeners();

const popupAccept = new PopupWithAccept (
  '#popup-delete',
  (id) => {
    const card = document.getElementById(`${id}`)
    api.deleteCard(id)
    .then ((res) => {
      card.remove();
      popupAccept.close();
    })
    .catch((err) => {
      console.log(err);
    })
  }
)

popupAccept.setEventListeners();

const addCard = (data) => {
  const card = new Card({
    data, 
    handleCardClick: (data) => {
      popupImage.open(data);
    },
    handleRemoveClick: () => {
      popupAccept.open(data);
    },
    handleLikeClick: (data) => {
      if (card.isLiked()) {
        api.removeLike(data._id)
        .then ((data) => card.setLikesInfo(data))
        .catch((err) => {
          console.log(err);
        })
      } else {
        api.addLike(data._id)
        .then ((data) => card.setLikesInfo(data))
        .catch((err) => {
          console.log(err);
        })
      }
    },
    userInfo
  }, '#elementTemplate');
  const cardElement = card.createCard(data);
  return cardElement;
}

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(addCard(data));
  },
  containerSelector:'.elements'
})

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([data,items]) => {
  userInfo.setUserInfo(data);
  cardList.renderItems(items);
})
.catch((err) => {
  console.log(err);
});

const popupCards = new PopupWithForm (
  '#popup-card',
  (data) => {
    renderLoading(true, '#popup-card', 'Создать');
    api.createCard(data)
    .then((data) => {
    cardList.addItem(addCard(data));
    popupCards.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, '#popup-card', 'Создать');
    });
  }
);

popupCards.setEventListeners();

const popupProfile = new PopupWithForm (
  '#popup-profile',
  (data) => {
    renderLoading(true, '#popup-profile', 'Сохранить');
    api.editUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => {
    renderLoading(false, '#popup-profile', 'Сохранить');
    });
  }
);

popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm (
  '#popup-avatar',
  (data) => {
    renderLoading(true, '#popup-avatar', 'Сохранить');
    api.editAvatar(data)
    .then((data) => {
      avatar.querySelector('.profile__foto').src = data.avatar;
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally (() => {
      renderLoading(false, '#popup-avatar', 'Сохранить');
    });
  }
)
popupAvatar.setEventListeners();

const formValidatorCard = new FormValidator(data, 'form[name=Card]');
formValidatorCard.enableValidation();

const formValidatorProfile = new FormValidator(data, 'form[name=Info]');
formValidatorProfile.enableValidation();

const formValidatorAvatar = new FormValidator(data, 'form[name=avatar]');
formValidatorAvatar.enableValidation();

popupOpenButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputAbout.value = info.about;
  inputAbout.dispatchEvent(new Event('input', { bubbles: true }));
  inputName.dispatchEvent(new Event('input', { bubbles: true }));
  popupProfile.open();
});

popupCardOpenButton.addEventListener('click', () => {
  formValidatorCard.inactiveButtonState();
  popupCards.open();
});

avatar.addEventListener('mouseover', () => {
  avatarEdit.classList.add('profile__avatar-edit_active');
});

avatar.addEventListener('mouseout', () => {
  avatarEdit.classList.remove('profile__avatar-edit_active');
})

avatar.addEventListener('click', () => {
  formValidatorAvatar.inactiveButtonState();
  popupAvatar.open();
})