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
const cardElement = document.querySelector('#elementTemplate').content;
const popupCards = document.querySelector('#popup-card');
const popupCardOpenButton = document.querySelector('.profile__button-add');
const popupCardCloseButton = popupCards.querySelector('.popup__close');
const popupCardOverlay = popupCards.querySelector('.popup__overlay');
const nameCardInput = popupCards.querySelector('input[name=title]');
const linkCardInput = popupCards.querySelector('input[name=link]');
const cardSubmit = popupCards.querySelector('.popup__container');
const popupImageContainer = document.querySelector('#popup-image');
const popupImageContainerCloseButton = popupImageContainer.querySelector('.popup__close');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupCaption = popupImageContainer.querySelector('.popup__caption');
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

const openPopup = (evt) => {
  evt.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

const closePopup = (evt) => {
  evt.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

const createCard = card => {
  const newCard = cardElement.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');

  newCard.querySelector('.element__name').textContent = card.name;
  
  cardImage.src = card.link;
  cardImage.alt = card.name;

  newCard.querySelector('.element__heart').addEventListener('click', event => {
    event.target.classList.toggle('element__heart_dark')
  });

  newCard.querySelector('.element__button-remove').addEventListener('click', event => {
    event.target.closest('.element').remove()
  });

  cardImage.addEventListener('click', () => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
    openPopup(popupImageContainer);
  });
  return newCard
}

const addCard = card => {
  elementContainer.prepend(createCard(card));
}

initialCards.forEach(addCard);

const closePopupEsc = (evt) => {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popupOpen);
  }
}

const editPopupForm = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  jobInput.dispatchEvent(new Event('input', { bubbles: true }));
  nameInput.dispatchEvent(new Event('input', { bubbles: true }));
  openPopup(popupProfile);
}

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup(popupProfile);
}

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