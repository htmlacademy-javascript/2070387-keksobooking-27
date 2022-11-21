import {sliderReset} from './slider.js';
import {handlerResetMainMarker} from './map.js';
import {showSuccesMessage, showErrorMessage} from './message.js';
import {sendData} from './api.js';
import {resetAvatar} from './avatar.js';
import {resetPhoto} from './photo.js';
const adFormElement = document.querySelector('.ad-form');
const roomsElement = adFormElement.querySelector('#room_number');
const guestsElement = adFormElement.querySelector('#capacity');
const typeOfHousingElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');
const resetButtonElement = document.querySelector('.ad-form__reset');

const pristine = new Pristine(
  adFormElement, {
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
  return roomsCapacity[roomsElement.value].includes(guestsElement.value);
}

function validateRooms () {
  return guestsCapacity[guestsElement.value].includes(roomsElement.value);
}

function getGuestsErrorMessage () {
  return `Количество комнат (${roomsElement.value}) не позволяет разместить такое количество гостей (${guestsElement.value})`;
}

pristine.addValidator(guestsElement, validateGuests, getGuestsErrorMessage);
pristine.addValidator(roomsElement, validateRooms, getGuestsErrorMessage);

roomsElement.addEventListener('change', onRoomsGuestsChange);
guestsElement.addEventListener('change', onRoomsGuestsChange);

function onRoomsGuestsChange () {
  pristine.validate(roomsElement);
  pristine.validate(guestsElement);
}

const typeCosts = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

function setMinPrice () {
  priceElement.setAttribute('placeholder', typeCosts[typeOfHousingElement.value]);
  priceElement.setAttribute('min', typeCosts[typeOfHousingElement.value]);
}

typeOfHousingElement.addEventListener('change', setMinPrice);

function validatePrice () {
  return Number(priceElement.value) >= Number(typeCosts[typeOfHousingElement.value]);
}

function getPriceErrorMessage () {
  return `Цена выбранного типа жилья не менее ${typeCosts[typeOfHousingElement.value]} рублей за ночь`;
}

pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

typeOfHousingElement.addEventListener('change', onTypeOfHousingChange);

function onTypeOfHousingChange () {
  pristine.validate(priceElement);
}

function onSetTimeOut () {
  timeOutElement.value = timeInElement.value;
}

function onSetTimeIn () {
  timeInElement.value = timeOutElement.value;
}

timeInElement.addEventListener('change', onSetTimeOut);
timeOutElement.addEventListener('change', onSetTimeIn);

const onResetButton = () => {
  resetAvatar();
  resetPhoto();
  sliderReset();
  handlerResetMainMarker();
};

resetButtonElement.addEventListener('click', onResetButton);


const resetForm = () => {
  adFormElement.reset();
  sliderReset();
  resetAvatar();
  resetPhoto();
  handlerResetMainMarker();
};

const formUpdateOnSuccess = () => {
  resetForm();
  showSuccesMessage();
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

adFormElement.addEventListener('submit', (evt) => {
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
