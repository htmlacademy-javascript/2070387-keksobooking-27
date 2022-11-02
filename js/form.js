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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
