// Массивы из доступных данных

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

// Количество генерируемых объектов

const OBJECT_COUNT = 10;

// Функция генерации случайных чисел. Ссылка на источник - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomNumber = (min, max) => {
  if (min > max || min < 0) {
    throw new RangeError('Задан неверный диапазон! Укажите другие числа.');
  }

  return Math.floor(Math.random() * (max - min) + min);
};

// Функция генерации случайных чисел с плавающей точкой. Ссылка на источник - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

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
  const getShuffledArray = (elements).sort(()=>Math.random()-0.5); // Перемешивание массива
  const getElements = getShuffledArray.slice(0, getRandomNumber(0, getShuffledArray.length)); // Получение случайных элементов из массива
  const сonvertArrayToString = getElements.join(', '); // Преобразование массива в строку

  return сonvertArrayToString;
};

// Функция для создания объекта (объявления)

const createObject = (index) => {
  const checkInOutTime = getRandomArrayElement(TIMES);

  return {
    author: {
      avatar: `img/avatars/user${index < 10 ? `${'0'}${index + 1}` : index}.png`, // Тернарный оператор для подстановки нуля и увеличения числа на единицу
    },
    offer: {
      title: 'Аренда недвижимости',
      address: `${getRandomFractional(35.65000, 35.70000)}, ${getRandomFractional(139.70000, 139.80000)}`,
      price: getRandomNumber(10000, 400000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 8),
      guests: getRandomNumber(1, 8),
      checkin: checkInOutTime,
      checkout: checkInOutTime,
      features: getRandomArrayElements(FEATURES),
      description: 'Лучшее предложение по доступной цене',
      photos: getRandomArrayElements(PHOTOS),
    },
    location: {
      lat: getRandomFractional(35.65000, 35.70000),
      lng: getRandomFractional(139.70000, 139.80000),
    }
  };
};

// Функция для создания массива из объектов (объявлений)

const generateOffers = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(createObject(i));
  }
  return result;
};

generateOffers(OBJECT_COUNT);

// console.log(generateOffers(OBJECT_COUNT));
