import {resetValidation, validateForm} from './form-validate.js';
import {sendData} from './api.js';
import {resetMap} from './map.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset, select');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset, select');
const adFormSubmit = adForm.querySelector('.ad-form__submit');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const toggleElements = (items, value) => {
  items.forEach((item) => {
    item.disabled = value;
  });
};

const deactivateForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  toggleElements(adFormFieldsets, true);
  toggleElements(mapFiltersFieldsets, true);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  toggleElements(adFormFieldsets, false);
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleElements(mapFiltersFieldsets, false);
};

const setSubmitButtonState = (value) => {
  adFormSubmit.disabled = value;
};

const reset = () => {
  adForm.reset();
  resetMap();
  resetValidation();
};

const showSuccessMessage = () => {
  const successMessage = success.cloneNode(true);
  body.appendChild(successMessage);

  const onDocumentClick = () => {
    successMessage.remove();
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }

    document.removeEventListener('keydown', onDocumentKeydown);
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showErrorMessage = () => {
  const errorMessage = error.cloneNode(true);
  body.appendChild(errorMessage);

  const onDocumentClick = () => {
    errorMessage.remove();
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }

    document.removeEventListener('keydown', onDocumentKeydown);
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  setSubmitButtonState(false);
};

const onSendSuccess = () => {
  setSubmitButtonState(false);
  showSuccessMessage();
  reset();
};

const onSendFailure = () => {
  adFormSubmit.disabled = false;
  showErrorMessage();
};

const onFormReset = () => {
  reset();
};

const setFormListener = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      adFormSubmit.disabled = true;
      sendData(onSendSuccess, onSendFailure, new FormData(evt.target));
    }
  });
};

adForm.addEventListener('reset', onFormReset);

export {deactivateForms, activateForm, activateFilters, setFormListener};
