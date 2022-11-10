import './form.js';
import './filter-switcher.js';
import './form-switcher.js';
import './map.js';
import './slider.js';
import {createMarker} from './map.js';
import {showAlert} from './form.js';

// Количество выводимых с сервера объявлений
const ADS_COUNT = 10;

fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    const adsCount = ads.slice(0, ADS_COUNT);
    adsCount.forEach((popupCard) => {
      createMarker(popupCard);
    });
  })
  .catch(
    showAlert('Не удалось загрузить объявления. Попробуйте перезагрузить страницу')
  );
