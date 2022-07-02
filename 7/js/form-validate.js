const Capacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const rooms = [1, 2, 3, 100];

const form = document.querySelector('.ad-form');
const guestsNumber = form.querySelector('#capacity');
const roomsNumber = form.querySelector('#room_number');
const price = form.querySelector('#price');
const type = form.querySelector('#type');

const validator = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
});

const validateForm = () => {
  const validateCapacity = () => Capacity[roomsNumber.value].includes(guestsNumber.value);

  const getCapacityErrorMessage = () => {
    if (Number(roomsNumber.value) === rooms[0]) {
      return `${roomsNumber.value} комната для 1 гостя`;
    }

    if (Number(roomsNumber.value) === rooms[1]) {
      return `${roomsNumber.value} комнаты для 1 или 2 гостей`;
    }

    if (Number(roomsNumber.value) === rooms[2]) {
      return `${roomsNumber.value} комнаты от 1 до 3 гостей`;
    }

    if (Number(roomsNumber.value) === rooms[3]) {
      return `${roomsNumber.value} комнат не предназначены для гостей`;
    }
  };

  validator.addValidator(guestsNumber, validateCapacity, getCapacityErrorMessage);
  validator.addValidator(roomsNumber, validateCapacity);

  const validatePrice = () => price.value >= MinPrice[type.value];

  const getPriceErrorMessage = () => {
    if (price.value < MinPrice[type.value]) {
      return `Минимальная цена ${MinPrice[type.value]}`;
    }
  };

  validator.addValidator(price, validatePrice, getPriceErrorMessage);

  const changesPlaceholder = () => {
    price.placeholder = MinPrice[type.value];
  };

  type.addEventListener ('change', changesPlaceholder);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    validator.validate();
  });
};

export {validateForm};
