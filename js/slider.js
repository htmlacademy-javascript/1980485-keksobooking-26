import {Price} from './form-validate.js';

const slider = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');
const typeField = document.querySelector('#type');

const onTypeChange = () => {
  slider.noUiSlider.set(priceField.value);
};

const createSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: Price.MAX,
    },
    start: Price.MIN[typeField.value],
    step: 1,
    connect: 'lower',
    format: {
      to:  (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });

  slider.noUiSlider.on('update', () => {
    priceField.value = slider.noUiSlider.get();
  });

  priceField.addEventListener('change', onTypeChange);
  typeField.addEventListener('change', onTypeChange);
};

export {createSlider};
