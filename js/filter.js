const filtersForm = document.querySelector('.map__filters');
const housingType = filtersForm.querySelector('#housing-type');
// const housingPrice = filtersForm.querySelector('#housing-price');
// const housingRooms = filtersForm.querySelector('#housing-rooms');
// const housingGuests = filtersForm.querySelector('#housing-guests');
// const housingFeatures = filtersForm.querySelector('#housing-features');

const getFilteredAds = function (arr) {
  const filteredArr = arr.filter(() => housingType.value === arr.offer.type);
  return filteredArr;
};

export {getFilteredAds};
