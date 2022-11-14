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
import {setOnFilterChange} from './filter.js';
import {debounce} from './debounce.js';

const ADS_COUNT = 10;
const RERENDER_DELAY = 500;

getData(
  (ads) => setOnFilterChange(
    debounce(
      createAllMarkers(ads.slice(0, ADS_COUNT)), RERENDER_DELAY
    )
  ),
  () => showAlert('Не удалось загрузить объявления. Попробуйте перезагрузить страницу')
);
