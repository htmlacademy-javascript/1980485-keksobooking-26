import {getDeclensionWords} from './util.js';

const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
const photo = balloonTemplate.querySelector('.popup__photo');

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

const renderPopup = ({offer, author}) => {

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

  const popupElement = balloonTemplate.cloneNode(true);
  const containerPhotos = popupElement.querySelector('.popup__photos');
  const containerFeatures = popupElement.querySelector('.popup__features');
  popupElement.querySelector('.popup__title').textContent = title;
  popupElement.querySelector('.popup__text--address').textContent = address;
  popupElement.querySelector('.popup__text--price').insertAdjacentHTML('afterbegin', `${price} `);
  popupElement.querySelector('.popup__type').textContent =  typeDictionary[type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getDeclensionWords(rooms, declensionWordsMap.rooms)} для ${guests} ${getDeclensionWords(guests, declensionWordsMap.guests)}`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  const popupDescription = popupElement.querySelector('.popup__description');
  popupElement.querySelector('.popup__avatar').src = author.avatar;

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

  return popupElement;
};

export {renderPopup};
