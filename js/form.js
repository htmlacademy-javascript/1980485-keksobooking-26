import {resetValidation, validateForm} from './form-validate.js';
import {sendData} from './api.js';
import {resetMap} from './map.js';
import {resetPreview} from './load-images.js';
import {resetFilters} from './form-filters.js';

const formElement = document.querySelector('.ad-form');
const aFormFieldsetsElement = formElement.querySelectorAll('fieldset, select');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersFieldsetsElement = mapFiltersElement.querySelectorAll('fieldset, select');
const formSubmitElement = formElement.querySelector('.ad-form__submit');
const successElement = document.querySelector('#success').content.querySelector('.success');
const errorElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const toggleElements = (items, value) => {
  items.forEach((item) => {
    item.disabled = value;
  });
};

const deactivateForms = () => {
  formElement.classList.add('ad-form--disabled');
  mapFiltersElement.classList.add('map__filters--disabled');
  toggleElements(aFormFieldsetsElement, true);
  toggleElements(mapFiltersFieldsetsElement, true);
};

const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  toggleElements(aFormFieldsetsElement, false);
};

const activateFilters = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  toggleElements(mapFiltersFieldsetsElement, false);
};

const setSubmitButtonState = (value) => {
  formSubmitElement.disabled = value;
};

const reset = () => {
  formElement.reset();
  resetMap();
  resetValidation();
};

const showSuccessMessage = () => {
  const successMessage = successElement.cloneNode(true);
  bodyElement.appendChild(successMessage);

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
  const errorMessage = errorElement.cloneNode(true);
  bodyElement.appendChild(errorMessage);

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
  formSubmitElement.disabled = false;
  showErrorMessage();
};

const onFormReset = () => {
  reset();
  resetPreview();
  resetFilters();
};

const setFormListener = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      formSubmitElement.disabled = true;
      sendData(onSendSuccess, onSendFailure, new FormData(evt.target));
    }
  });
};

formElement.addEventListener('reset', onFormReset);

export {deactivateForms, activateForm, activateFilters, setFormListener};
