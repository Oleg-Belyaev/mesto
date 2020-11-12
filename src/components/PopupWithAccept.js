import Popup from "./Popup.js";

export default class PopupWithAccept extends Popup {
  constructor (popupSelector, handleButtonClick) {
      super(popupSelector);
      this._handleButtonClick = handleButtonClick;
  }
  
  open(data) {
    super.open();
    this._id = data._id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupAccept = this._element.querySelector('.popup__submit');
    this._popupAccept.addEventListener('click', () => {
      this._handleButtonClick(this._id);
    });
  }
}