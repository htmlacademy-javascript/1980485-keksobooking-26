import {showAlert} from './util.js';

const API_URL = 'https://26.javascript.pages.academy/keksobooking';
const LOAD_ERROR_MESSAGE = 'Ошибка загрузки данных. Попробуйте перезагрузить страницу.';
const SEND_ERROR_MESSAGE = 'Ошибка отправки данных. Попробуйте ещё раз';

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      showAlert(LOAD_ERROR_MESSAGE);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert(LOAD_ERROR_MESSAGE);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body: body
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      showAlert(SEND_ERROR_MESSAGE);
    });
};

export {getData, sendData};
