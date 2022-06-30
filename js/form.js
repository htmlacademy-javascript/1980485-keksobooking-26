const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('fieldset, select');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = document.querySelectorAll('fieldset, select');

const toggleElements = (items, value) => {
  items.forEach((item) => {
    item.disabled = value;
  });
};

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  toggleElements(adFormFieldsets, true);
  toggleElements(mapFiltersFieldsets, true);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  toggleElements(adFormFieldsets, false);
};

const activateFormMap = () => {
  mapFilters.classList.remove('map__filters--disabled');
  toggleElements(mapFiltersFieldsets, false);
};

export {deactivateForm, activateForm, activateFormMap};
