const ALERT_SHOW_TIME = 5000;

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

// Функция для склонения слов
const getDeclensionWords = (value, words) => {
  const lastDigit = value % 10;
  if (value > 10 && value < 20) {
    return words[2];
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return words[1];
  }
  if (lastDigit === 1) {
    return words[0];
  }
  return words[2];
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.width = '100%';
  alertContainer.style.padding = '15px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ff0000';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {
  getRandomNumber,
  getRandomFractional,
  getRandomArrayElement,
  getShuffledArray,
  getRandomArrayElements,
  getDeclensionWords,
  showAlert,
  debounce
};
