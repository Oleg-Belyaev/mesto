import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const popupProfile = document.querySelector('#popup-profile');
const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCloseButton = popupProfile.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = popupProfile.querySelector('.popup__container');
const nameInput = popupProfile.querySelector('input[name=name]');
const jobInput = popupProfile.querySelector('input[name=profession]');
const popupProfileOverlay = popupProfile.querySelector('.popup__overlay');
const elementContainer = document.querySelector('.elements');
const popupCards = document.querySelector('#popup-card');
const popupCardOpenButton = document.querySelector('.profile__button-add');
const popupCardCloseButton = popupCards.querySelector('.popup__close');
const popupCardOverlay = popupCards.querySelector('.popup__overlay');
const nameCardInput = popupCards.querySelector('input[name=title]');
const linkCardInput = popupCards.querySelector('input[name=link]');
const cardSubmit = popupCards.querySelector('.popup__container');
const popupImageContainer = document.querySelector('#popup-image');
const popupImageContainerCloseButton = popupImageContainer.querySelector('.popup__close');
const popupImageContainerOverlay = popupImageContainer.querySelector('.popup__overlay');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const data = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
};

const openPopup = (evt) => {
  evt.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

const closePopup = (evt) => {
  evt.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popupOpen);
  }
}

const addCard = (item) => {
  const card = new Card(item, '#elementTemplate', '#popup-image', openPopup);
  const cardElement = card.createCard();
  elementContainer.prepend(cardElement);
}

initialCards.forEach(addCard);

const addNewCard = (evt) => {
  evt.preventDefault();

  const card = {
    name: nameCardInput.value,
    link: linkCardInput.value
  }

  addCard(card);
  
  closePopup(popupCards);
  
  nameCardInput.value = "";
  linkCardInput.value = "";
}

const editPopupForm = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  jobInput.dispatchEvent(new Event('input', { bubbles: true }));
  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  openPopup(popupProfile);
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfile);
}

const formValidatorCard = new FormValidator(data, 'form[name=Card]');
formValidatorCard.enableValidation();

const formValidatorProfile = new FormValidator(data, 'form[name=Info]');
formValidatorProfile.enableValidation();

popupOpenButton.addEventListener('click', editPopupForm);
popupCloseButton.addEventListener('click', function(){closePopup(popupProfile)});
formElement.addEventListener('submit', formSubmitHandler);
popupCardOpenButton.addEventListener('click', function(){openPopup(popupCards)});
popupCardCloseButton.addEventListener('click', function(){closePopup(popupCards)});
popupImageContainerCloseButton.addEventListener('click', function(){closePopup(popupImageContainer)});
cardSubmit.addEventListener('submit', addNewCard);
popupProfileOverlay.addEventListener('click', function(){closePopup(popupProfile)});
popupCardOverlay.addEventListener('click', function(){closePopup(popupCards)});
popupImageContainerOverlay.addEventListener('click', function(){closePopup(popupImageContainer)});