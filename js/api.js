import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academ/keksobooking/data')
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

export {getData};
