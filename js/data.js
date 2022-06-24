import {
  getRandomNumber,
  getRandomFractional,
  getRandomArrayElement,
  getRandomArrayElements
} from './util.js';

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const Coordinates = {
  LAT_MIN: 35.65000,
  LAT_MAX: 35.70000,
  LNG_MIN: 139.70000,
  LNG_MAX: 139.80000
};

const ADS_COUNT = 1;

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

export {generateAds, ADS_COUNT, PHOTOS, FEATURES};
