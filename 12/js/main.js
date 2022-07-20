import {createSlider} from './slider.js';
import {loadMap} from './map.js';
import {initValidation} from './form-validate.js';
import {deactivateForms, setFormListener} from './form.js';
import {setLoadImagesListener} from  './load-images.js';

deactivateForms();

createSlider();

initValidation();

setFormListener();

loadMap();

setLoadImagesListener();
