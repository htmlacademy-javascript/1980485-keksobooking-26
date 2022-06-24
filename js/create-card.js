import {generateAds, PHOTOS, FEATURES} from './data.js';
import {getRandomArrayElements} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const randomPhotos = getRandomArrayElements(PHOTOS);
const containerPhotos = cardTemplate.querySelector('.popup__photos');
const photo = containerPhotos.querySelector('.popup__photo');

const randomFeatures = getRandomArrayElements(FEATURES);
const containerFeatures = cardTemplate.querySelector('.popup__features');

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

const getSimilarAds = () => {


  randomFeatures.forEach((item) => {
    const featuresItem = containerFeatures.querySelector(`.popup__feature--${item}`);
    if (featuresItem) {
      fragment.append(featuresItem);
    }
  });

  containerFeatures.innerHTML = '';
  containerFeatures.append(fragment);

  randomPhotos.forEach((value) => {
    photo.remove();
    const photoElement = photo.cloneNode(true);
    photoElement.src = value;
    containerPhotos.append(photoElement);
  });

  createAds.forEach((element) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__type').textContent =  getTranslate(element.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
    cardElement.querySelector('.popup__description').textContent = element.offer.description;
    cardElement.querySelector('.popup__avatar').src = element.author.avatar;
    fragment.appendChild(cardElement);
  });
  mapCanvas.append(fragment);
};

export {getSimilarAds};
