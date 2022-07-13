const capacityMap = {
  1: {value: ['1'], error: 'комната для 1 гостя'},
  2: {value: ['1', '2'], error: 'комнаты для 1 или 2 гостей'},
  3: {value: ['1', '2', '3'], error: 'комнаты для 1, 2 или 3 гостей'},
  100: {value: ['0'], error: 'комнат не предназначены для гостей'}
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
const timeSelects = form.querySelector('.ad-form__element--time');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');


const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
});

const getErrorMessage = (roomCount) => `${roomCount} ${capacityMap[roomCount].error}`;

const getPriceErrorMessage = () => `Минимальная цена ${MinPrice[type.value.toUpperCase()]}`;

const  initValidation = () => {
  const validateCapacity = () => capacityMap[roomsNumber.value].value.includes(guestsNumber.value);

  pristine.addValidator(guestsNumber, validateCapacity);
  pristine.addValidator(roomsNumber, validateCapacity, getErrorMessage);

  const validatePrice = () => price.value >= MinPrice[type.value.toUpperCase()];

  pristine.addValidator(price, validatePrice, getPriceErrorMessage);

  const onPlaceholderChanges = () => {
    price.placeholder = MinPrice[type.value.toUpperCase()];
    price.min = MinPrice[type.value.toUpperCase()];
  };

  type.addEventListener ('change', onPlaceholderChanges);

  const synchronizesFields = (evt) => {
    timein.value = evt.target.value;
    timeout.value = evt.target.value;
  };

  timeSelects.addEventListener('change', synchronizesFields);

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

export {initValidation};