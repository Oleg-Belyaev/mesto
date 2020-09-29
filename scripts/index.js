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
    const element = event.target.closest('.element')

    element.remove()

  });

  cardImage.addEventListener('click', event => {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
    popupImageContainer.classList.add('popup_opened')
    document.addEventListener('keydown', popupCloseEsc);
  });
  elementContainer.prepend(newCard);

};

initialCards.forEach(createCard);

const popupCloseEsc = (evt) => {
  if (evt.key === "Escape") {
    if (popupProfile.classList.contains('popup_opened')) {
      popupToggle();
    }
    popupImageClose();
    if (popupCards.classList.contains('popup_opened')) {
      popupCardToggle();
    }
  }
}

const popupToggle = function () {
  if (!popupProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    jobInput.dispatchEvent(new Event('input', { bubbles: true }));
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    popupProfile.classList.add('popup_opened');
    document.addEventListener('keydown', popupCloseEsc);
  } else {
    popupProfile.classList.remove('popup_opened');
    document.removeEventListener('keydown', popupCloseEsc);
  }
}

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popupProfile.classList.remove('popup_opened');
}

const popupCardToggle = () => {
  popupCards.classList.toggle('popup_opened');
  if (!popupProfile.classList.contains('popup_opened')) {
    document.addEventListener('keydown', popupCloseEsc);
  } else {
    document.removeEventListener('keydown', popupCloseEsc);
  cardSubmit.reset();
  }
};

const popupImageClose = () => {
  popupImageContainer.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseEsc);
};

const addCardToContainer = (evt) => {
  evt.preventDefault();

  const card = {
    name: nameCardInput.value,
    link: linkCardInput.value
  }

  createCard(card);
  
  popupCards.classList.remove('popup_opened');

  cardSubmit.reset();
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);
popupCardOpenButton.addEventListener('click', popupCardToggle);
popupCardCloseButton.addEventListener('click', popupCardToggle);
popupImageContainerCloseButton.addEventListener('click', popupImageClose);
cardSubmit.addEventListener('submit', addCardToContainer);
popupProfileOverlay.addEventListener('click', popupToggle);
popupCardOverlay.addEventListener('click', popupCardToggle);
popupImageContainerOverlay.addEventListener('click', popupImageClose);