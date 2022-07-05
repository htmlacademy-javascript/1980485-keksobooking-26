const capacityMap = {
  1: {value: ['1'], error: 'комната для 1 гостя'},
  2: {value: ['1', '2'], error: 'комнаты для 1 или 2 гостей'},
  3: {value: ['1', '2', '3'], error: 'комнаты от 1 до 3 гостей'},
  100: {value: ['0'], error: 'комнат не предназначены для гостей'},
  getError: (room) => `${room} ${capacityMap[room].error}`
};

const MinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000
};

const form = document.querySelector('.ad-form');
const guestsNumber = form.querySelector('#capacity');
const roomsNumber = form.querySelector('#room_number');
const price = form.querySelector('#price');
const type = form.querySelector('#type');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
});

const getCapacityErrorMessage = () => {
  if (+roomsNumber.value === +Object.keys(capacityMap)[roomsNumber.value] - 1) {
    return capacityMap.getError(roomsNumber.value);
  }

  if (+roomsNumber.value === +Object.keys(capacityMap)[3]) {
    return capacityMap.getError(roomsNumber.value);
  }
};

const getPriceErrorMessage = () => {
  if (price.value < MinPrice[type.value]) {
    return `Минимальная цена ${MinPrice[type.value]}`;
  }
};

const  initValidation = () => {
  const validateCapacity = () => capacityMap[roomsNumber.value].value.includes(guestsNumber.value);

  pristine.addValidator(guestsNumber, validateCapacity, getCapacityErrorMessage);
  pristine.addValidator(roomsNumber, validateCapacity);

  const validatePrice = () => price.value >= MinPrice[type.value.toUpperCase()];

  pristine.addValidator(price, validatePrice, getPriceErrorMessage);

  const onPlaceholderChanges = () => {
    price.placeholder = MinPrice[type.value.toUpperCase()];
    price.min = MinPrice[type.value.toUpperCase()];
  };

  type.addEventListener ('change', onPlaceholderChanges);

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

export {initValidation};
