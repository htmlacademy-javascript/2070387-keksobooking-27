const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(
  adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
  },
  true
);

// УСЛОВИЯ КОЛИЧЕТСВА КОМНАТ И ГОСТЕЙ
// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

const rooms = adForm.querySelector('#room_number');
const guests = adForm.querySelector('#capacity');
const roomsCapacity = {
  1 : ['1'],
  2 : ['1', '2'],
  3 : ['1', '2', '3'],
  100 : ['0']
};

const guestsCapacity = {
  0 : ['100'],
  1 : ['1', '2', '3'],
  2 : ['1', '2'],
  3 : ['3']
};

function validateGuests () {
  return roomsCapacity[rooms.value].includes(guests.value);
}

function validateRooms () {
  return guestsCapacity[guests.value].includes(rooms.value);
}

function getGuestsErrorMessage () {
  return `Количество комнат (${rooms.value}) не позволяет разместить такое количество гостей (${guests.value})`;
}

pristine.addValidator(guests, validateGuests, getGuestsErrorMessage);
pristine.addValidator(rooms, validateRooms, getGuestsErrorMessage);

rooms.addEventListener('change', onRoomsGuestsChange);
guests.addEventListener('change', onRoomsGuestsChange);

function onRoomsGuestsChange () {
  pristine.validate(rooms);
  pristine.validate(guests);
}

// УСЛОВИЕ ТИПА ЖИЛЬЯ И ЦЕНЫ ЗА НОЧЬ
// «Бунгало» — минимальная цена за ночь 0;
// «Квартира» — минимальная цена за ночь 1 000;
// «Отель» — минимальная цена за ночь 3 000;
// «Дом» — минимальная цена 5 000;
// «Дворец» — минимальная цена 10 000.

const typeOfHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const typeCosts = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

function setMinPrice () {
  price.setAttribute('placeholder', typeCosts[typeOfHousing.value]);
  price.setAttribute('min', typeCosts[typeOfHousing.value]);
}

typeOfHousing.addEventListener('change', setMinPrice);

function validatePrice () {
  return price.value <= typeCosts[typeOfHousing.value];
}

function getPriceErrorMessage () {
  return `Цена выбранного типа жилья не менее ${typeCosts[typeOfHousing.value]} рублей за ночь`;
}

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

typeOfHousing.addEventListener('change', onTypeOfHousingChange);

function onTypeOfHousingChange () {
  pristine.validate(price);
}
// конец условия по типу жилья и цены

// ВРЕМЯ ЗАЕЗДА И ВЫЕЗДА
// въезд после 12 = выезду до 12
// въезд после 13 = выезду до 13
// въезд после 14 = выезду до 14

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const timeInOptions = timeIn.querySelectorAll('option');
const timeOutOptions = timeOut.querySelectorAll('option');

function setTimeOut () {
  for (let i = 0; i < timeOutOptions.length; i++) {
    if (timeOutOptions[i].value === timeInOptions[i].value) {
      timeOutOptions[i].selected = true;
    }
  }
}

function setTimeIn () {
  for (let i = 0; i < timeInOptions.length; i++) {
    if (timeInOptions[i].value === timeOutOptions[i].value) {
      timeInOptions[i].selected = true;
    }
  }
}

timeIn.addEventListener('change', setTimeOut);
timeOut.addEventListener('change', setTimeIn);

// конец условия по времени въезда и выезда

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
