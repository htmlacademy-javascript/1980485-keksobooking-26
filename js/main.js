import {generateAds} from './data.js';
import {renderCard} from './create-card.js';
import {deactivateForms} from './form.js';

const mapCanvas = document.querySelector('#map-canvas');

const ads = generateAds();
const card = renderCard(ads[0]);

mapCanvas.append(card);

// deactivateForms();
