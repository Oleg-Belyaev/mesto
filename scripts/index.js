const popup = document.querySelector('#popup-profile');
const popupOpenButton = document.querySelector('.profile__button-edit');
const popupCloseButton = popup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formElement = popup.querySelector('.popup__container');
const nameInput = popup.querySelector('input[name=name]');
const jobInput = popup.querySelector('input[name=profession]');
const elementContainer = document.querySelector('.elements');
const cardElement = document.querySelector('#elementTemplate').content;
const popupCards = document.querySelector('#popup-card');
const popupCardOpenButton = document.querySelector('.profile__button-add');
const popupCardCloseButton = popupCards.querySelector('.popup__close');
const nameCardInput = popupCards.querySelector('input[name=title]');
const linkCardInput = popupCards.querySelector('input[name=link]');
const cardSubmit = popupCards.querySelector('.popup__container');
const popupImageContainer = document.querySelector('#popup-image');
const popupImageContainerCloseButton = popupImageContainer.querySelector('.popup__close');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupCaption = popupImageContainer.querySelector('.popup__caption');

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

const addElementToContainer = element => {
  const newCard = cardElement.cloneNode(true);
  
  newCard.querySelector('.element__name').textContent = element.name;
  
  newCard.querySelector('.element__image').src = element.link;

  newCard.querySelector('.element__image').alt = element.name;

  newCard.querySelector('.element__heart').addEventListener('click', event => {
  event.target.classList.toggle('element__heart_dark')
  });

  newCard.querySelector('.element__button-remove').addEventListener('click', event => {
    const element = event.target.closest('.element')

    element.remove()

  });

  newCard.querySelector('.element__image').addEventListener('click', event => {
    const element = event.target.closest('.element')
    const image = element.querySelector('.element__image')
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupCaption.textContent = image.alt;
    popupImageContainer.classList.add('popup_opened')
  });

  elementContainer.append(newCard);

};

initialCards.forEach(addElementToContainer);

const popupOpen = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

const popupClose = function () {
  popup.classList.remove('popup_opened');
}

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

const popupCardOpenClose = () => {
  popupCards.classList.toggle('popup_opened');

  cardSubmit.reset();
};

const popupImageClose = () => {
  popupImageContainer.classList.remove('popup_opened');
};

const addCardToContainer = (evt) => {
  evt.preventDefault();
  const cardAdd = cardElement.cloneNode(true);

  cardAdd.querySelector('.element__name').textContent = nameCardInput.value;

  cardAdd.querySelector('.element__image').src = linkCardInput.value;

  cardAdd.querySelector('.element__image').alt = nameCardInput.value;

  cardAdd.querySelector('.element__heart').addEventListener('click', event => {
    event.target.classList.toggle('element__heart_dark')
  })

  cardAdd.querySelector('.element__button-remove').addEventListener('click', event => {
    const element = event.target.closest('.element')
  
    element.remove()
  })

  cardAdd.querySelector('.element__image').addEventListener('click', event => {
    const element = event.target.closest('.element')
    const image = element.querySelector('.element__image')
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupCaption.textContent = image.alt;
    popupImageContainer.classList.add('popup_opened')
  });

  elementContainer.prepend(cardAdd);

  popupCards.classList.remove('popup_opened');

  cardSubmit.reset();
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
popupCardOpenButton.addEventListener('click', popupCardOpenClose);
popupCardCloseButton.addEventListener('click', popupCardOpenClose);
popupImageContainerCloseButton.addEventListener('click', popupImageClose);
cardSubmit.addEventListener('submit', addCardToContainer);