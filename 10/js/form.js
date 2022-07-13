import {initValidation, pristine} from './form-validate.js';
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
const buttonError = error.querySelector('.error__button');

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

const getSuccessMessage = () => {
  const successMessage = success.cloneNode(true);
  body.appendChild(successMessage);

  document.addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });

  pristine.reset();
  adForm.reset();
  resetMap();
  adFormSubmit.disabled = false;
};

const getErrorMessage = () => {
  const errorMessage = error.cloneNode(true);
  body.appendChild(errorMessage);
  document.addEventListener('click', () => {
    errorMessage.remove();
  });
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
  });
  buttonError.querySelector('click', () => {
    errorMessage.remove();
  });
  adFormSubmit.disabled = false;
};

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = initValidation();
    if (isValid) {
      adFormSubmit.disabled = true;
      sendData(() => onSuccess(), getErrorMessage, new FormData(evt.target),);
    }
  });
};

const onFormReset = () => {
  adForm.reset();
  resetMap();
  pristine.reset();
};

adForm.addEventListener('reset', onFormReset);

export {deactivateForms, activateForm, activateFilters, setUserFormSubmit, getSuccessMessage};
