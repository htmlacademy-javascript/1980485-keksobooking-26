import {generateAds} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const photo = cardTemplate.querySelector('.popup__photo');

const fragment = document.createDocumentFragment();
const fragment2 = document.createDocumentFragment();

const createAds = generateAds();

const getHousingType = (type) => {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'hotel':
      return 'Отель';
  }
};

const createFeatureElement = (element, container) => {
  element.forEach((item) => {
    const featuresItem = container.querySelector(`.popup__feature--${item}`);
    if (featuresItem) {
      fragment2.append(featuresItem);
    }
  });

  container.innerHTML = '';
  container.append(fragment2);
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

  createAds.forEach((element) => {
    const cardElement = cardTemplate.cloneNode(true);
    const containerPhotos = cardElement.querySelector('.popup__photos');
    const containerFeatures = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
    cardElement.querySelector('.popup__type').textContent =  getHousingType(element.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
    createFeatureElement(element.offer.features, containerFeatures);
    const description = cardElement.querySelector('.popup__description');
    if (element.offer.description === '' || element.offer.description === undefined) {
      description.classList.add('hidden');
    } else {
      description.textContent = element.offer.description;
    }
    createPhotoElement(element.offer.photos, containerPhotos);
    cardElement.querySelector('.popup__avatar').src = element.author.avatar;

    fragment.appendChild(cardElement);
  });
  mapCanvas.append(fragment);
};

export {getSimilarAds};
