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

export {getRandomNumber, getRandomFractional, getRandomArrayElement, getShuffledArray, getRandomArrayElements};
