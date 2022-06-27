import {getDeclensionWords} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const photo = cardTemplate.querySelector('.popup__photo');

const fragment = document.createDocumentFragment();

const typeDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const createFeatures = (element, container) => {
  element.forEach((item) => {
    const featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature');
    featuresItem.classList.add(`popup__feature--${item}`);
    container.append(featuresItem);
  });
};

const createPhotos = (element, container) => {
  element.forEach((value) => {
    const photoElement = photo.cloneNode(true);
    photoElement.src = value;
    container.append(photoElement);
  });
};

const renderCard = (offer) => {
  const cardElement = cardTemplate.cloneNode(true);
  const containerPhotos = cardElement.querySelector('.popup__photos');
  const containerFeatures = cardElement.querySelector('.popup__features');

  const {
    author: {
      avatar
    },
    offer: {
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
    }
  } = offer;

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').insertAdjacentHTML('afterbegin', price);
  cardElement.querySelector('.popup__type').textContent =  typeDictionary[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getDeclensionWords(rooms, ['комната', 'комнаты', 'комнат'])} для ${guests} ${getDeclensionWords(guests, ['гостя', 'гостей', 'гостей'])}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  const popupFeatures = cardElement.querySelector('.popup__features');

  if (!features) {
    popupFeatures.remove();
  } else {
    containerFeatures.innerHTML = '';
    createFeatures(features, containerFeatures);
  }

  const popupDescription = cardElement.querySelector('.popup__description');

  if (!description) {
    popupDescription.remove();
  } else {
    popupDescription.textContent = description;
  }

  const popupPhotos =  cardElement.querySelector('.popup__photos');

  if (!photo) {
    popupPhotos.remove();
  } else {
    containerPhotos.innerHTML = '';
    createPhotos(photos, containerPhotos);
  }

  cardElement.querySelector('.popup__avatar').src = avatar;

  fragment.appendChild(cardElement);

  return cardElement;
};

export {renderCard};
