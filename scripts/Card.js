export default class Card {
  constructor(data, cardSelector, popupImageSelector, openPopup) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._popupImageSelector = popupImageSelector;
    this._popupImageContainer = document.querySelector(this._popupImageSelector);
    this._openPopup = openPopup;
  }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    
    return cardElement;
  }  
  
  createCard () { 
    this._element = this._getTemplate();

    this._setEventListeners();

    const cardImage = this._element.querySelector('.element__image');

    this._element.querySelector('.element__name').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element
  }

  _setEventListeners () {
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    
    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._handleRemoveClick();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }
  
  _handleLikeClick () {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active')
  }

  _handleRemoveClick () {
    this._element.querySelector('.element__button-remove').closest('.element').remove()
  }
  
  _handleImageClick () {
    const cardImage = this._element.querySelector('.element__image');
    const popupImage = this._popupImageContainer.querySelector('.popup__image');
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    this._popupImageContainer.querySelector('.popup__caption').textContent = cardImage.alt;
    this._openPopup(this._popupImageContainer);
  }
}