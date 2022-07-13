import {createSlider} from './slider.js';
import {loadMap} from './map.js';
import {deactivateForms, setUserFormSubmit, getSuccessMessage} from './form.js';
import {getData} from './api.js';

const ADS_COUNT = 10;

deactivateForms();

createSlider();

getData ((data) => {
  loadMap(data.slice(0, ADS_COUNT));
});

setUserFormSubmit(getSuccessMessage);

