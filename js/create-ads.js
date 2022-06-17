import {getRandomNumber, getRandomFractional, getRandomArrayElement, getRandomArrayElements} from './util.js';
import {TYPES, TIMES, FEATURES, PHOTOS, Coordinates, ADS_COUNT} from './data.js';

// Функция для создания объекта (объявления)

const createAds = (index) => {
  const location = {
    lat: getRandomFractional(Coordinates.LAT_MIN, Coordinates.LAT_MAX),
    lng: getRandomFractional(Coordinates.LNG_MIN, Coordinates.LNG_MAX)
  };

  return {
    author: {
      avatar: `img/avatars/user${String(index + 1).padStart(2, '0')}.png`,
    },
    offer: {
      title: 'Аренда недвижимости',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(10000, 400000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 8),
      guests: getRandomNumber(1, 8),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayElements(FEATURES),
      description: 'Лучшее предложение по доступной цене',
      photos: getRandomArrayElements(PHOTOS),
    },
    location
  };
};

// Функция для создания массива из объектов (объявлений)

const generateAds = () => Array.from({ length: ADS_COUNT }, (_, index) => createAds(index));

generateAds(ADS_COUNT);
