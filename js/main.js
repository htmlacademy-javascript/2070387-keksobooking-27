import './form.js';
import './filter-switcher.js';
import './form-switcher.js';
import './map.js';
import './slider.js';
import {createAllMarkers} from './map.js';
import {showAlert} from './message.js';
import {getData} from './api.js';
import './avatar.js';
import './foto.js';
import {setOnFiltersChange} from './filter.js';

const OFFER_COUNT = 10;

getData(
  (ads) => {
    createAllMarkers(ads.slice(0, OFFER_COUNT));
    setOnFiltersChange(createAllMarkers, ads);
  },
  () => showAlert('Не удалось загрузить объявления. Попробуйте перезагрузить страницу')
);
