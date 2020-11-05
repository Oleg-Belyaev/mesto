import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {initialCards, data} from "../utils/data.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCardOpenButton = document.querySelector('.profile__button-add');
const inputName = document.querySelector('input[name=name]');
const inputProfession = document.querySelector('input[name=profession]');

const userInfo = new UserInfo('.profile__name', '.profile__profession');

const popupImage = new PopupWithImage('#popup-image', '.popup__image', '.popup__caption');

popupImage.setEventListeners();

const addCard = (data) => {
  const card = new Card({
    data, 
    handleCardClick: (data) => {
    popupImage.open(data);
    }
  }, '#elementTemplate');
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
}

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    addCard(data);
  }
},
'.elements');

const popupCards = new PopupWithForm (
  '#popup-card',
  (data) => {
    addCard(data);
    popupCards.close();
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
    popupProfile.close();
  }
);

popupProfile.setEventListeners();

const formValidatorCard = new FormValidator(data, 'form[name=Card]');
formValidatorCard.enableValidation();

const formValidatorProfile = new FormValidator(data, 'form[name=Info]');
formValidatorProfile.enableValidation();

popupOpenButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputProfession.value = info.profession;
  inputProfession.dispatchEvent(new Event('input', { bubbles: true }));
  inputName.dispatchEvent(new Event('input', { bubbles: true }));
  popupProfile.open();
});

popupCardOpenButton.addEventListener('click', () => {
  popupCards.open();
});