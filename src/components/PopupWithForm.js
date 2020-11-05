import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__item');

    this._formValues = {};

    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._element.querySelector('.popup__container');
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    
      this._handleFormSubmit(this._getInputValues());
    
      this._popupForm.reset();
    });
  }

  close() {
    super.close();
    this._inputList = this._element.querySelectorAll('.popup__item');
    this._inputList.forEach(input => {
        input.value = '';
    });
    this._buttonSubmit = this._element.querySelector('.popup__submit');
    this._buttonSubmit.classList.add('popup__submit_inactive');
    this._buttonSubmit.setAttribute("disabled", true);
  }
}