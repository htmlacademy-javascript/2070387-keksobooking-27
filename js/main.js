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
import {debounce} from './debounce.js';

const OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

getData(
  (ads) => {
    createAllMarkers(ads.slice(0, OFFER_COUNT));
    debounce(
      setOnFiltersChange(createAllMarkers, ads), RERENDER_DELAY,
    );
  },
  () => showAlert('Не удалось загрузить объявления. Попробуйте перезагрузить страницу')
);
