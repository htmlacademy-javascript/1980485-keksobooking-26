const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('fieldset, select');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = document.querySelectorAll('fieldset, select');

const enableInactiveMode = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  adFormFieldsets.forEach((item) => {
    item.disabled = true;
  });
  mapFiltersFieldsets.forEach((item) => {
    item.disabled = true;
  });
};

const enableActiveModeForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((item) => {
    item.disabled = false;
  });
};

const enableActiveModeMap = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersFieldsets.forEach((item) => {
    item.disabled = false;
  });
};

export {enableInactiveMode, enableActiveModeForm, enableActiveModeMap};
