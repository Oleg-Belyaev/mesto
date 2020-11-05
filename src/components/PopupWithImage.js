import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector, popupImage, popupCaption) {
    super(popupSelector);
    this._popupImage = this._element.querySelector(popupImage);
    this._popupCaption = this._element.querySelector(popupCaption);
  }
    
  open(data) {
    super.open();
    this._popupImage.src = data.src;
    this._popupImage.alt = data.alt;
    this._popupCaption.textContent = data.alt;
  }
}