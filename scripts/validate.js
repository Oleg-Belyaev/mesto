const showInputError = (formElement, inputElement, errorMessage, params) => {
    params.inputErrorClass
    params.errorClass
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.classList.add(params.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, params) => {
    params.inputErrorClass
    params.errorClass
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, params) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else {
        hideInputError(formElement, inputElement, params);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
};

const toggleButtonState = (inputList, buttonElement, params) => {
    params.inactiveButtonClass
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(params.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(params.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
};

const setEventListeners = (formElement, params) => {
    params.inputSelector
    params.submitButtonSelector
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, params);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, params);
            toggleButtonState(inputList, buttonElement, params);
        });
    });
};

const enableValidation = (params) => {
    params.formSelector
    const formList = Array.from(document.querySelectorAll(params.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, params);
    });
};

enableValidation({
    formSelector: ".popup__container",
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
});