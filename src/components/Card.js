export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      const cardImage = this._element.querySelector('.element__image');
      this._handleCardClick(cardImage);
    });
  }
  
  _handleLikeClick () {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  _handleRemoveClick () {
    this._element.remove()
    this._element = null;
  }
}