import {createSlider} from './slider.js';
import {loadMap} from './map.js';
import {deactivateForms} from './form.js';
import {initValidation} from './form-validate.js';

initValidation();

deactivateForms();

loadMap();

createSlider();
