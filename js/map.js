import {turnOnForm} from './form-switcher.js';
import {turnOnMapFilters} from './filter-switcher.js';
import {getNewCardElement} from './markup.js';

const LAT = 35.67325;
const LNG = 139.75908;
const MAP_SCALE = 11;

const adressElement = document.querySelector('#address');

//  СОЗДАНИЕ КАРТЫ И АКТИВАЦИЯ ФОРМЫ И ФИЛЬТРОВ
const map = L.map('map-canvas');
map.on('load', () => {
  turnOnForm();
  turnOnMapFilters();
})
  .setView({
    lat: LAT,
    lng: LNG,
  }, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// СОЗДАНИЕ ОСНОВНОГО МАРКЕРА
const mainPinIcon = L.icon({
  iconUrl: '..//img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
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
  adressElement.value = `${Lat}, ${Lan}`;
});

// СБРОС СОСТОЯНИЯ МАРКЕРА И КАРТЫ
const handlerResetMainMarker = () => {
  mainPinMarker.setLatLng({
    lat: LAT,
    lng: LNG,
  });

  map.setView({
    lat: LAT,
    lng: LNG,
  }, MAP_SCALE);
};

// СОЗДАНИЕ МАРКЕРОВ С ОБЪЯВЛЕНИЯМИ
const pinIcon = L.icon({
  iconUrl: '..//img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (popupCard) => {
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
    .bindPopup(getNewCardElement(popupCard))
    .addTo(markerGroup);

  marker.on('click', () => {
    marker
      .bindPopup(getNewCardElement(popupCard))
      .addTo(markerGroup);
  });
};



const createAllMarkers = (arr) => {
  arr.forEach((popupCard) => {
    createMarker(popupCard);
  });
};

// УДАЛЕНИЕ МАРКЕРОВ
const removeAllMarkers = () => {
  markerGroup.clearLayers();
};

export {createAllMarkers, removeAllMarkers, handlerResetMainMarker};
