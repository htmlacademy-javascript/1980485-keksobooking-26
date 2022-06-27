import {generateAds} from './data.js';
import {renderCard} from './create-card.js';

const mapCanvas = document.querySelector('#map-canvas');

const card = renderCard(generateAds()[0]);

mapCanvas.append(card);
