import {generateData} from './data.js';
import {turnOnForm} from './form-switcher.js';
import {turnOnMapFilters} from './filter-switcher.js';
import {getNewCardElement} from './markup.js';

const resetButton = document.querySelector('.ad-form__reset');
const adress = document.querySelector('#address');

//  СОЗДАНИЕ КАРТЫ И АКТИВАЦИЯ ФОРМЫ И ФИЛЬТРОВ
const map = L.map('map-canvas')
  .setView({
    lat: 35.67325,
    lng: 139.75908,
  }, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

map.on('load', turnOnForm());
map.on('load', turnOnMapFilters());

// СОЗДАНИЕ ОСНОВНОГО МАРКЕРА
const mainPinIcon = L.icon({
  iconUrl: '..//img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.67325,
    lng: 139.75908,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// ПЕРЕДАЕМ КООРДИНАТЫ МАРКЕРА В АДРЕС
mainPinMarker.on('moveend', (evt) => {
  const latLang = evt.target.getLatLng().toString();
  const arr = latLang.split('');
  const Lat = arr.slice(7, 15).join('');
  const Lan = arr.slice(18, 27).join('');
  adress.value = `Lat: ${Lat}, Lan: ${Lan}`;
});

// СБРОС СОСТОЯНИЯ МАРКЕРА И КАРТЫ
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.67325,
    lng: 139.75908,
  });

  map.setView({
    lat: 35.67325,
    lng: 139.75908,
  }, 11);
});

// СОЗДАНИЕ МАРКЕРОВ С ОБЪЯВЛЕНИЯМИ
const dataList = generateData();
console.log(dataList);

const pinIcon = L.icon({
  iconUrl: '..//img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = function (popupCard) {
  const {location} = popupCard;
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: pinIcon,
    }
  );

  marker
    .addTo(markerGroup)
    .bindPopup(getNewCardElement(popupCard));
};

export {createMarker};

// dataList.forEach((popupCard) => {
//   createMarker(popupCard);
// });

