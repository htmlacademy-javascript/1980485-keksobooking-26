import {Price} from './form-validate.js';

const sliderElement = document.querySelector('.ad-form__slider');
const priceFieldElement = document.querySelector('#price');
const typeFieldElement = document.querySelector('#type');

const onTypeChange = () => {
  priceFieldElement.value = Price.MIN[typeFieldElement.value];
  sliderElement.noUiSlider.set(priceFieldElement.value);
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: Price.MAX,
    },
    start: Price.MIN[typeFieldElement.value],
    step: 1,
    connect: 'lower',
    format: {
      to:  (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    priceFieldElement.value = sliderElement.noUiSlider.get();
  });

  priceFieldElement.addEventListener('change', onTypeChange);
  typeFieldElement.addEventListener('change', onTypeChange);
};

export {createSlider};
