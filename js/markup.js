const cardTemplateElement = document.querySelector('#card').content;

const getType = (type) => {
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

const getNewCardElement = (card) => {
  const cardElement = cardTemplateElement.cloneNode(true);

  if (card.author.avatar !== 'img/avatars/default.png') {
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (card.offer.title !== undefined) {
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
  } else {
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }

  if (card.offer.address !== undefined) {
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  } else {
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (card.offer.price !== undefined) {
    cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  } else {
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (card.offer.type !== undefined) {
    cardElement.querySelector('.popup__type').textContent = getType(card.offer.type);
  } else {
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (card.offer.rooms !== undefined && card.offer.guests !== undefined) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  } else if (card.offer.rooms === undefined && card.offer.guests !== undefined) {
    cardElement.querySelector('.popup__text--capacity').textContent = `Подходит для ${card.offer.guests} гостей`;
  } else if (card.offer.rooms !== undefined && card.offer.guests === undefined) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты`;
  } else {
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (card.offer.features !== undefined) {
    cardElement.querySelector('.popup__features').innerHTML = '';
    const features = card.offer.features || [];
    features.forEach((offerFeature) => {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature');
      featureItem.classList.add(`popup__feature--${offerFeature}`);
      cardElement.querySelector('.popup__features').appendChild(featureItem);
    });
  } else {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }

  if (card.offer.description !== undefined) {
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (card.offer.photos !== undefined) {
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
  } else {
    cardElement.querySelector('.popup__photos').classList.add('hidden');
  }

  return cardElement;
};

export {getNewCardElement};

