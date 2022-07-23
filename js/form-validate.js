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

const formElement = document.querySelector('.ad-form');
const guestsNumberElement = formElement.querySelector('#capacity');
const roomsNumberElement = formElement.querySelector('#room_number');
const priceElement = formElement.querySelector('#price');
const typeElement = formElement.querySelector('#type');
const timeSelectElement = formElement.querySelector('.ad-form__element--time');
const timeinElement = formElement.querySelector('#timein');
const timeoutElement = formElement.querySelector('#timeout');


const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
});

const getErrorMessage = (roomCount) => `${roomCount} ${capacityMap[roomCount].error}`;

const getPriceErrorMessage = () => `Минимальная цена ${Price.MIN[typeElement.value]}`;

const onPlaceholderChanges = () => {
  priceElement.placeholder = Price.MIN[typeElement.value];
  priceElement.min = Price.MIN[typeElement.value];
};

const onFieldsSynchronizes = (evt) => {
  timeinElement.value = evt.target.value;
  timeoutElement.value = evt.target.value;
};

const validateCapacity = () => capacityMap[roomsNumberElement.value].value.includes(guestsNumberElement.value);

const validatePrice = () => priceElement.value >= Price.MIN[typeElement.value];

const  initValidation = () => {
  pristine.addValidator(guestsNumberElement, validateCapacity);
  pristine.addValidator(roomsNumberElement, validateCapacity, getErrorMessage);
  pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

  typeElement.addEventListener ('change', onPlaceholderChanges);
  timeSelectElement.addEventListener('change', onFieldsSynchronizes);
};

const validateForm = () => pristine.validate();
const resetValidation = () => pristine.reset();

export {initValidation, Price, validateForm, resetValidation};
