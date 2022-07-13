import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      showAlert('Ошибка загрузки данных. Попробуйте перезагрузить страницу.');
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('Ошибка загрузки данных. Попробуйте перезагрузить страницу.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Ошибка отправки данных. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Ошибка отправки данных. Попробуйте ещё раз');
    });
};

export {getData, sendData};
