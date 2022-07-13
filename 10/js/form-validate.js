const capacityMap = {
  1: {value: ['1'], error: 'комната для 1 гостя'},
  2: {value: ['1', '2'], error: 'комнаты для 1 или 2 гостей'},
  3: {value: ['1', '2', '3'], error: 'комнаты для 1, 2 или 3 гостей'},
  100: {value: ['0'], error: 'комнат не предназначены для гостей'}
};

const Price = {
  MIN: {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000
  },
  MAX: 100000
};

const form = document.querySelector('.ad-form');
const guestsNumber = form.querySelector('#capacity');
const roomsNumber = form.querySelector('#room_number');
const price = form.querySelector('#price');
const type = form.querySelector('#type');
const timeSelects = form.querySelector('.ad-form__element--time');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
});

const getErrorMessage = (roomCount) => `${roomCount} ${capacityMap[roomCount].error}`;

const getPriceErrorMessage = () => `Минимальная цена ${Price.MIN[type.value]}`;

const onPlaceholderChanges = () => {
  price.placeholder = Price.MIN[type.value];
  price.min = Price.MIN[type.value];
};

const onFieldsSynchronizes = (evt) => {
  timein.value = evt.target.value;
  timeout.value = evt.target.value;
};

const validateCapacity = () => capacityMap[roomsNumber.value].value.includes(guestsNumber.value);

const validatePrice = () => price.value >= Price.MIN[type.value];

const  initValidation = () => {
  pristine.addValidator(guestsNumber, validateCapacity);
  pristine.addValidator(roomsNumber, validateCapacity, getErrorMessage);
  pristine.addValidator(price, validatePrice, getPriceErrorMessage);

  type.addEventListener ('change', onPlaceholderChanges);
  timeSelects.addEventListener('change', onFieldsSynchronizes);

  return pristine.validate();
};

export {initValidation, Price, pristine};
