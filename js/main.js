import './form.js';
import './filter-switcher.js';
import './form-switcher.js';
import './map.js';
import './slider.js';
import {createMarker} from './map.js';

fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    ads.forEach((popupCard) => {
      createMarker(popupCard);
    });
  });
