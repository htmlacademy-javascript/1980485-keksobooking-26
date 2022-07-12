import {createSlider} from './slider.js';
import {loadMap} from './map.js';
import {deactivateForms} from './form.js';
import {initValidation} from './form-validate.js';
import {getData} from './api.js';

const ADS_COUNT = 10;

initValidation();

deactivateForms();

createSlider();

getData ((data) => {
  loadMap(data.slice(0, ADS_COUNT));
});
