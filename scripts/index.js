let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.button_function_edit');
let popupCloseButton = popup.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formElement = document.querySelector('.popup__container');
let nameInput = popup.querySelector('input[name=name]');
let jobInput = popup.querySelector('input[name=profession]');

let popupOpen = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
}

let popupClose = function () {
  popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

let formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileProfession.textContent = `${jobInput.value}`;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);