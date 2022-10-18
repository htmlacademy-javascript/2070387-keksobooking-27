import {getRandomPositiveInteger} from './util.js';
import {getRandomPositiveFloat} from './util.js';
import {getRandomArrayElement} from './util.js';
import {getRand} from './util.js';

const DIGITS = 5;

const COUNT = 10;

const AUTOR_LIST = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png'
];

const TITLE = [
  'Дом ничей! Живите кто хотите',
  'Домик на опушке',
  'Spa Resort *****',
  'Трешка',
  'Двушка в центре',
  'Евро-однушка',
  'Бунгало',
  'Дом-2',
  'Дворец в Подмосковье',
  'Комната в коммуналке'
];

const PRICE = {
  min: 100,
  max: 1000,
};

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const ROOMS = {
  min: 1,
  max: 10,
};

const GUESTS = {
  min: 1,
  max: 10,
};

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Бабушкин ремонт',
  'Квартира со всеми удобствами',
  'Есть дверь',
  'Окна вставим перед заселением',
  'В наличии аквадискотека',
  'Халупа на окраине за небольшие деньги',
  'У нас ночевала Ивлеева',
  'Уютная студия',
  'Неуютная студия',
  'Без кошек и детей'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const LATITUDE = {
  min: 35.65000,
  max: 35.70000,
};

const LONGITUDE = {
  min: 139.70000,
  max: 139.80000,
};

function getNewData (index) {
  const randLat = getRandomPositiveFloat(LATITUDE.min, LATITUDE.max, DIGITS);
  const randLng = getRandomPositiveFloat(LONGITUDE.min, LONGITUDE.max, DIGITS);
  return {
    autor: {
      avatar: AUTOR_LIST[index],
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      addres: `${randLat}, ${randLng}`,
      price: getRandomPositiveInteger (PRICE.min, PRICE.max),
      type: getRandomArrayElement (TYPE),
      rooms: getRandomPositiveInteger (ROOMS.min, ROOMS.max),
      guests: getRandomPositiveInteger (GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement (CHECKIN),
      checkout: getRandomArrayElement (CHECKOUT),
      features: FEATURES.slice().sort(getRand).slice(getRandomPositiveInteger(0, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: PHOTOS.slice().sort(getRand).slice(getRandomPositiveInteger(0, PHOTOS.length)),
    },
    location: {
      lat: randLat,
      lng: randLng,
    }
  };
}

function generateData () {
  const dataList = [];
  for (let i = 0; i < COUNT; i++) {
    dataList.push(getNewData(i));
  }

  return dataList;
}

export {generateData};
