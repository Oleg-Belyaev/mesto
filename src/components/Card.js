export default class Card {
  constructor({data, handleCardClick, handleRemoveClick, handleLikeClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes.length;
    this._id = "aa691abbf3228b1167ad8440";
    this._cardId = data._id;
    this._owner = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
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
    const cardDelete = this._element.querySelector('.element__button-remove');
    
    if (this._id !== this._owner) {
      cardDelete.classList.add('element__button-remove_hidden');
    }
    this._element.id = this._cardId;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__like-counter').textContent = this._like;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    
    return this._element
  }

  _setEventListeners () {
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      const cardElement = this._element;
      this._handleLikeClick({element: cardElement, id: this._cardId});
    });
    
    this._element.querySelector('.element__button-remove').addEventListener('click', () => {
      this._handleRemoveClick();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      const cardImage = this._element.querySelector('.element__image');
      this._handleCardClick(cardImage);
    });
  }
}