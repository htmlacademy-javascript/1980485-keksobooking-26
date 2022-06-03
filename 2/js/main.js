// Ссылка на источник - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomNumber(min, max) {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  return Math.floor(Math.random() * (max - min) + min);
}
getRandomNumber(1, 4);

// Функция для Кексобукинга. Ссылка на источник - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

function getRandomFractional(min, max, digits) {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  const result = ((Math.random() * (max - min) + min).toFixed(digits));

  return Number(result);
}
getRandomFractional(1, 4, 5);

// И еще один вариант, найденный на просторах интернета.

function getRandomArbitrary(min, max, maxDigits = 0) {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  const digitsDegree = 10 ** maxDigits;
  return Math.floor(((Math.random() * (max - min) + min) * digitsDegree)) / digitsDegree;
}
getRandomArbitrary(1, 5, 5);

