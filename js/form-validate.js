const Capacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const form = document.querySelector('.ad-form');
const capacityGuests = form.querySelector('#capacity');
const roomsNumber = form.querySelector('#room_number');

const validator = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error'
});

const validateForm = () => {
  const validateCapacity = () => Capacity[roomsNumber.value].includes(capacityGuests.value);

  const getCapacityErrorMessage = () => {
    if (Number(roomsNumber.value) === 1) {
      return `${roomsNumber.value} комната для 1 гостя`;
    }

    if (Number(roomsNumber.value) === 2) {
      return `${roomsNumber.value} комнаты для 1 или 2 гостей`;
    }

    if (Number(roomsNumber.value) === 3) {
      return `${roomsNumber.value} комнаты от 1 до 3 гостей`;
    }

    if (Number(roomsNumber.value) === 100) {
      return `${roomsNumber.value} комнат не предназначены для гостей`;
    }
  };

  validator.addValidator(capacityGuests, validateCapacity, getCapacityErrorMessage);
  validator.addValidator(roomsNumber, validateCapacity);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    validator.validate();
  });
};

export {validateForm};
