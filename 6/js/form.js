const adForm = document.querySelector('.ad-form');
const adFormFieldset = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');

const enablesInactiveMode = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  adFormFieldset.setAttribute('disabled', 'disabled');
  mapFiltersFieldset.setAttribute('disabled', 'disabled');
};

const enablesActiveMode = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  adFormFieldset.removeAttribute('disabled');
  mapFiltersFieldset.removeAttribute('disabled');
};

export {enablesInactiveMode, enablesActiveMode};
