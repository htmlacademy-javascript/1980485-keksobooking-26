import {generateAds, FEATURES} from './data.js';
import {getRandomArrayElements} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const randomFeatures = getRandomArrayElements(FEATURES);
const containerFeatures = cardTemplate.querySelector('.popup__features');


const photo = cardTemplate.querySelector('.popup__photo');

const fragment = document.createDocumentFragment();

const createAds = generateAds();

const getTranslate = (type) => {
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'bungalow') {
    return 'Бунгало';
  }
  if (type === 'house') {
    return 'Дом';
  }
  if (type === 'palace') {
    return 'Дворец';
  }
  if (type === 'hotel') {
    return 'Отель';
  }
};

cardTemplate.querySelector('.popup__photos').innerHTML = '';

const createPhotoElement = (element, container) => {
  element.forEach((value) => {
    const photoElement = photo.cloneNode(true);
    photoElement.src = value;
    container.append(photoElement);
  });
};

const getSimilarAds = () => {

  randomFeatures.forEach((item) => {
    const featuresItem = containerFeatures.querySelector(`.popup__feature--${item}`);
    if (featuresItem) {
      fragment.append(featuresItem);
    }
  });

  containerFeatures.innerHTML = '';
  containerFeatures.append(fragment);

  createAds.forEach((element) => {
    const cardElement = cardTemplate.cloneNode(true);
    const containerPhotos = cardElement.querySelector('.popup__photos');

    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__type').textContent =  getTranslate(element.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
    cardElement.querySelector('.popup__description').textContent = element.offer.description;
    createPhotoElement(element.offer.photos, containerPhotos);
    cardElement.querySelector('.popup__avatar').src = element.author.avatar;

    fragment.appendChild(cardElement);
  });
  mapCanvas.append(fragment);
};

export {getSimilarAds};
