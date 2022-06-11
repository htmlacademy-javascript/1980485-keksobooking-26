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

const ADS_COUNT = 10;

const getRandomNumber = (min, max) => {
  if (min > max || min < 0) {
    throw new RangeError('Задан неверный диапазон! Укажите другие числа.');
  }

  return Math.round(Math.random() * (max - min) + min);
};

const getRandomFractional = (min, max, digits = 5) => {
  if (min > max || min < 0) {
    throw new RangeError('Задан неверный диапазон! Укажите другие числа.');
  }

  const result = ((Math.random() * (max - min) + min).toFixed(digits));

  return Number(result);
};

// Функция для получения случайного элемента из массива

const getRandomArrayElement = (element) => element[getRandomNumber(0, element.length - 1)];

// Функция для перемешивания массива по алгоритму Фишера-Йетса

const getShuffledArray = (elementsArray) => {
  const copy = elementsArray.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];

    return copy;
  }
};

// Функция для получения нескольких случайных элементов из массива

const getRandomArrayElements = (elements) => {
  const mixedArray = getShuffledArray(elements);

  return mixedArray.slice(0, getRandomNumber(1, mixedArray.length));
};

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

const generateAds = () => Array.from({ length: 10 }, (_, index) => createAds(index));

generateAds(ADS_COUNT);

console.log(generateAds(ADS_COUNT));
