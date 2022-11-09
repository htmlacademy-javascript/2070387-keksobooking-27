import './form.js';
import './map.js';
import {createMarker} from './map.js';
import './slider.js';


fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    ads.forEach((popupCard) => {
      createMarker(popupCard);
    });
  });

// dataList.forEach((popupCard) => {
//   createMarker(popupCard);
// });
