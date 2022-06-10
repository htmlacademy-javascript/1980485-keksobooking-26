// Массивы из доступных данных

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const COORDINATES = {
  latMin: 35.65000,
  latMax: 35.70000,
  lngMin: 139.70000,
  lngMax: 139.80000
};

const ADS_COUNT = 10;

const getRandomNumber = (min, max) => {
  if (min > max || min < 0) {
    throw new RangeError('Задан неверный диапазон! Укажите другие числа.');
  }

  return Math.round(Math.random() * (max - min) + min);
};

// Функция генерации случайных чисел с плавающей точкой.

const getRandomFractional = (min, max, digits = 5) => {
  if (min > max || min < 0) {
    throw new RangeError('Задан неверный диапазон! Укажите другие числа.');
  }

  const result = ((Math.random() * (max - min) + min).toFixed(digits));

  return Number(result);
};

// Функция для получения случайного элемента из массива

const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length - 1)];

// Функция для получения нескольких случайных элементов из массива

const getRandomArrayElements = (elements) => {
  const getShuffledArray = (elementsArray) => { // Функция для перемешивания массива по алгоритму Фишера-Йетса
    for (let i = elementsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [elementsArray[i], elementsArray[j]] = [elementsArray[j], elementsArray[i]];
      return elementsArray;
    }
  };

  const mixedArray = getShuffledArray(elements);
  const getElements = mixedArray.slice(0, getRandomNumber(1, mixedArray.length)); // Получение случайных элементов из массива

  return getElements;
};

// Функция для создания объекта (объявления)

const createAds = (index) => {
  const location = {
    lat: getRandomFractional(COORDINATES.latMin, COORDINATES.latMax),
    lng: getRandomFractional(COORDINATES.lngMin, COORDINATES.lngMax)
  };

  return {
    author: {
      avatar: `img/avatars/user${String(index + 1).padStart(2, '0')}.png`, // Подстановка нуля
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

const generateAds = () => {
  const result = Array.from({ length: 10 }, (item, index) => createAds(index));

  return result;
};

generateAds(ADS_COUNT);
