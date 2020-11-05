export default class Popup {
  constructor (popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupClose = this._element.querySelector('.popup__close');
    this._popupOverlay = this._element.querySelector('.popup__overlay');
    
    this._popupClose.addEventListener('click', () => {
      this.close();
    });

    this._popupOverlay.addEventListener('click', () => {
      this.close();
    });
  }
}