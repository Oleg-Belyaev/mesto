import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(data) {
    super.open();
    const popupImage = this._element.querySelector('.popup__image');
    popupImage.src = data.src;
    popupImage.alt = data.alt;
    this._element.querySelector('.popup__caption').textContent = data.alt;
  }
}