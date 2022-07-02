const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset, select');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset, select');

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

export {deactivateForms, activateForm, activateFilters};
