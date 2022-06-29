const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

const enablesInactiveMode = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  adFormFieldsets.setAttribute('disabled', 'disabled');
  mapFiltersFieldsets.setAttribute('disabled', 'disabled');
};

const enablesActiveMode = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  adFormFieldsets.removeAttribute('disabled');
  mapFiltersFieldsets.removeAttribute('disabled');
};

export {enablesInactiveMode, enablesActiveMode};
