const cardTemplate = document.querySelector('#card').content;

const getType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const getNewCardElement = function (card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.addres;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  cardElement.querySelector('.popup__features').innerHTML = '';
  const features = card.offer.features || [];
  features.forEach((offerFeature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${offerFeature}`);
    cardElement.querySelector('.popup__features').appendChild(featureItem);
  });

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  cardElement.querySelector('.popup__photos').innerHTML = '';
  const photos = card.offer.photos || [];
  photos.forEach((offerPhoto) => {
    const photo = document.createElement('img');
    photo.src = offerPhoto;
    photo.classList.add('popup__photo');
    photo.setAttribute('width', '45');
    photo.setAttribute('height', '40');
    photo.setAttribute('alt', 'Фотография жилья');
    cardElement.querySelector('.popup__photos').appendChild(photo);
  });

  return cardElement;
};

export {getNewCardElement};

