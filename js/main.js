import {createSlider} from './slider.js';
import {loadMap} from './map.js';
import {initValidation} from './form-validate.js';
import {deactivateForms, setFormListener} from './form.js';

deactivateForms();

createSlider();

initValidation();

setFormListener();

loadMap();

setFormListener();

