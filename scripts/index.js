import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {initialCards, data} from "./data.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCardOpenButton = document.querySelector('.profile__button-add');

const userInfo = new UserInfo('.profile__name', '.profile__profession');

const popupImage = new PopupWithImage('#popup-image');

popupImage.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card({
      data, 
      handleCardClick: (data) => {
      popupImage.open(data);
      }
    }, '#elementTemplate');
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
},
'.elements');

const popupCards = new PopupWithForm (
  '#popup-card',
  (data) => {
    const card = new Card({
      data, 
      handleCardClick: (data) => {
      popupImage.open(data);
      }
    }, '#elementTemplate');
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  });

popupCards.setEventListeners();

cardList.renderItems();

const popupProfile = new PopupWithForm (
  '#popup-profile',
  (data) => {
    userInfo.setUserInfo({
      name: data.name,
      profession: data.profession
    });
  }
);

popupProfile.setEventListeners();

const formValidatorCard = new FormValidator(data, 'form[name=Card]');
formValidatorCard.enableValidation();

const formValidatorProfile = new FormValidator(data, 'form[name=Info]');
formValidatorProfile.enableValidation();

popupOpenButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  document.querySelector('input[name=name]').value = info.name;
  document.querySelector('input[name=profession]').value = info.profession;
  popupProfile.open();
});

popupCardOpenButton.addEventListener('click', () => {
  popupCards.open();
});