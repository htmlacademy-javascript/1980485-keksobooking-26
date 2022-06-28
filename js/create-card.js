import {getDeclensionWords} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const photo = cardTemplate.querySelector('.popup__photo');

const typeDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const declensionWordsMap = {
  rooms: ['комната', 'комнаты', 'комнат'],
  guests: ['гостя', 'гостей', 'гостей']
};

const createFeatures = (elements, container) => {
  elements.forEach((item) => {
    const featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature', `popup__feature--${item}`);
    container.append(featuresItem);
  });
};

const createPhotos = (elements, container) => {
  elements.forEach((item) => {
    const photoElement = photo.cloneNode(true);
    photoElement.src = item;
    container.append(photoElement);
  });
};

const renderCard = ({offer, author}) => {

  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos
  } = offer;

  const cardElement = cardTemplate.cloneNode(true);
  const containerPhotos = cardElement.querySelector('.popup__photos');
  const containerFeatures = cardElement.querySelector('.popup__features');
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').insertAdjacentHTML('afterbegin', `${price} `);
  cardElement.querySelector('.popup__type').textContent =  typeDictionary[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getDeclensionWords(rooms, declensionWordsMap.rooms)} для ${guests} ${getDeclensionWords(guests, declensionWordsMap.guests)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  const popupDescription = cardElement.querySelector('.popup__description');
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  if (!features) {
    containerFeatures.remove();
  } else {
    containerFeatures.innerHTML = '';
    createFeatures(features, containerFeatures);
  }

  if (!description) {
    popupDescription.remove();
  } else {
    popupDescription.textContent = description;
  }

  if (!photo) {
    containerPhotos.remove();
  } else {
    containerPhotos.innerHTML = '';
    createPhotos(photos, containerPhotos);
  }

  return cardElement;
};

export {renderCard};
