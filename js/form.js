import {sliderReset} from './slider.js';
import {handlerResetMainMarker} from './map.js';
import {showSuccesMessage, showErrorMessage} from './message.js';
const adForm = document.querySelector('.ad-form');
const rooms = adForm.querySelector('#room_number');
const guests = adForm.querySelector('#capacity');
const typeOfHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

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
  return Number(price.value) >= Number(typeCosts[typeOfHousing.value]);
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
function onSetTimeOut () {
  timeOut.value = timeIn.value;
}

function onSetTimeIn () {
  timeIn.value = timeOut.value;
}

timeIn.addEventListener('change', onSetTimeOut);
timeOut.addEventListener('change', onSetTimeIn);
// конец условия по времени въезда и выезда

// ОТПРАВКА ФОРМЫ
// При удачной отправке формы ее нужно отчистить и вывести сообщение пользователю
// При неудачной отправке формы нужно вывести сообщение пользователю

const resetForm = function () {
  adForm.reset();
  sliderReset();
  handlerResetMainMarker();
  showSuccesMessage();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    fetch(
      'https://27.javascript.pages.academy/keksobooking ',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          resetForm();
        } else {
          showErrorMessage();
        }
      })
      .catch(() => {
        showErrorMessage();
      });
  }
});
