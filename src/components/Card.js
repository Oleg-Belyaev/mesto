export default class Card {
  constructor({data, handleCardClick, handleRemoveClick, handleLikeClick, userInfo}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes.length;
    this._id = userInfo.id;
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
  
  createCard (data) { 
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__button-like');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners(data);

    const cardImage = this._element.querySelector('.element__image');
    const cardDelete = this._element.querySelector('.element__button-remove');
    
    if (this._id !== this._owner) {
      cardDelete.classList.add('element__button-remove_hidden');
    }
    this._element.id = this._cardId;
    this._element.querySelector('.element__name').textContent = this._name;
    this._likeCounter.textContent = this._like;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    
    return this._element
  }

  isLiked () {
    if (!this._likeButton.classList.contains('element__button-like_active')) {
      return true
    } else {
      return false
    }
  }

  setLikesInfo (data) {
    this._likeCounter.textContent = data.likes.length;
  }

  _setEventListeners (data) {
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('element__button-like_active');
      this._handleLikeClick(data);
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