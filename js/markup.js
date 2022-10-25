import {generateData} from './data.js';
const data = generateData();

console.log(data);

function getType (newData) {
  let type;
  newData.forEach((card) => {
    switch (card.offer.type) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalow':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
      case 'hotel':
        type = 'Отель';
        break;
    }
  });
  return type;
}

const map = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;

data.forEach((card) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = card.autor.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.addres;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночьe';

  // В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями: - ПОЛУЧИЛОСЬ НЕВЕРНО
  cardElement.querySelector('.popup__type').textContent = getType(data);

  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  cardElement.querySelector('.popup__features').innerHTML = '';
  card.offer.features.forEach((offerFeature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add('popup__feature--' + offerFeature);
    cardElement.querySelector('.popup__features').appendChild(featureItem);
  });

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  cardElement.querySelector('.popup__photos').innerHTML = '';
  card.offer.photos.forEach((offerPhoto) => {
    const photo = document.createElement('img');
    photo.src = offerPhoto;
    photo.classList.add('popup__photo');
    photo.setAttribute('width', '45');
    photo.setAttribute('height', '40');
    photo.setAttribute('alt', 'Фотография жилья');
    cardElement.querySelector('.popup__photos').appendChild(photo);
  });

  map.appendChild(cardElement);
});

