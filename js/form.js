import {sliderReset} from './slider.js';
import {handlerResetMainMarker} from './map.js';
import {showSuccesMessage, showErrorMessage} from './message.js';
import {sendData} from './api.js';
import {resetAvatar} from './avatar.js';
import {resetFoto} from './foto.js';
const adForm = document.querySelector('.ad-form');
const rooms = adForm.querySelector('#room_number');
const guests = adForm.querySelector('#capacity');
const typeOfHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

const pristine = new Pristine(
  adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
  },
  true
);

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

function onSetTimeOut () {
  timeOut.value = timeIn.value;
}

function onSetTimeIn () {
  timeIn.value = timeOut.value;
}

timeIn.addEventListener('change', onSetTimeOut);
timeOut.addEventListener('change', onSetTimeIn);

const onResetButton = function () {
  resetAvatar();
  resetFoto();
  sliderReset();
  handlerResetMainMarker();
};

resetButton.addEventListener('click', onResetButton);

const resetForm = function () {
  adForm.reset();
  sliderReset();
  resetAvatar();
  resetFoto();
  handlerResetMainMarker();
};

const formUpdateOnSuccess = function () {
  resetForm();
  showSuccesMessage();
};

const blockSubmitButton = function () {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = function () {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        formUpdateOnSuccess();
        unblockSubmitButton();
      },
      () => {
        showErrorMessage();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});
