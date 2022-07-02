import {generateAds} from './data.js';
import {renderCard} from './create-card.js';
import {validateForm} from './form-validate.js';

const mapCanvas = document.querySelector('#map-canvas');

const ads = generateAds();
const card = renderCard(ads[0]);

mapCanvas.append(card);

validateForm();
