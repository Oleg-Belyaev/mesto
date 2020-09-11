let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button-edit');
let popupCloseButton = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('input[name=name]');
let jobInput = popup.querySelector('input[name=profession]');
const ElementContainer = document.querySelector('.elements');
const cardElement = document.querySelector('#elementTemplate').content;
const popupCards = document.querySelector('.popup:nth-child(5)');
const popupCardOpenButton = document.querySelector('.profile__button-add');
const popupCardCloseButton = popupCards.querySelector('.popup__close');
const nameCardInput = popupCards.querySelector('input[name=title]');
const linkCardInput = popupCards.querySelector('input[name=link]');
const cardSabmit = popupCards.querySelector('.popup__container');

let popupOpen = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

let popupClose = function () {
  popup.classList.remove('popup_opened');
}

let formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

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
  const cardsInitial = cardElement.cloneNode(true);
  
  cardsInitial.querySelector('.element__name').textContent = element.name;
  
  cardsInitial.querySelector('.element__image').src = element.link;

  cardsInitial.querySelector('.element__image').alt = element.name;

  cardsInitial.querySelector('.element__figure > .element__image').src = element.link;

  cardsInitial.querySelector('.element__figure > .element__image').alt = element.name;

  cardsInitial.querySelector('.element__imagecaption').textContent = element.name;

  cardsInitial.querySelector('.element__heart').addEventListener('click', event => {
  event.target.classList.toggle('element__heart_dark')
  });

  cardsInitial.querySelector('.element__button-remove').addEventListener('click', event => {
    const element = event.target.closest('.element')

    element.remove()

  });

  cardsInitial.querySelector('.element__image').addEventListener('click', event => {
    const element = event.target.closest('.element')
    const popup = element.querySelector('.popup')
    
    popup.classList.add('popup_opened')
  });

  cardsInitial.querySelector('.popup__close').addEventListener('click', event => {
    const element = event.target.closest('.element')
    const popup = element.querySelector('.popup')
      
    popup.classList.remove('popup_opened')
  });

  ElementContainer.append(cardsInitial);

};

initialCards.forEach(addElementToContainer);

const popupCardOpenClose = () => {
  popupCards.classList.toggle('popup_opened');

  cardSabmit.reset();
};

popupCardOpenButton.addEventListener('click', popupCardOpenClose);
popupCardCloseButton.addEventListener('click', popupCardOpenClose);

const addCardToContainer = (evt) => {
  evt.preventDefault();
  const cardAdd = cardElement.cloneNode(true);

  cardAdd.querySelector('.element__name').textContent = nameCardInput.value;

  cardAdd.querySelector('.element__image').src = linkCardInput.value;

  cardAdd.querySelector('.element__image').alt = nameCardInput.value;

  cardAdd.querySelector('.element__figure > .element__image').src = linkCardInput.value;

  cardAdd.querySelector('.element__figure > .element__image').alt = nameCardInput.value;

  cardAdd.querySelector('.element__imagecaption').textContent = nameCardInput.value;

  cardAdd.querySelector('.element__heart').addEventListener('click', event => {
    event.target.classList.toggle('element__heart_dark')
  })

  cardAdd.querySelector('.element__button-remove').addEventListener('click', event => {
    const element = event.target.closest('.element')
  
    element.remove()
  })

  cardAdd.querySelector('.element__image').addEventListener('click', event => {
    const element = event.target.closest('.element')
    const popup = element.querySelector('.popup')
    
    popup.classList.add('popup_opened')
  });

  cardAdd.querySelector('.popup__close').addEventListener('click', event => {
    const element = event.target.closest('.element')
    const popup = element.querySelector('.popup')
      
    popup.classList.remove('popup_opened')
  });

  ElementContainer.prepend(cardAdd);

  popupCards.classList.remove('popup_opened');

  cardSabmit.reset();
}

cardSabmit.addEventListener('submit', addCardToContainer);