import {removeAllMarkers} from './map.js';
import {debounce} from './debounce.js';

const OFFER_COUNT = 10;
const RERENDER_DELAY = 500;

const priceLevel = {
  middle: 10000,
  high: 50000,
};

const filtersFormElement = document.querySelector('.map__filters');
const housingTypeElement = filtersFormElement.querySelector('#housing-type');
const housingPriceElement = filtersFormElement.querySelector('#housing-price');
const housingRoomsElement = filtersFormElement.querySelector('#housing-rooms');
const housingGuestsElement = filtersFormElement.querySelector('#housing-guests');
const housingFeaturesElement = filtersFormElement.querySelectorAll('.map__checkbox');

const filterType = (offer, type) =>
  type === 'any' || offer.offer.type === type;


const filterPrice = (offer, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return offer.offer.price < priceLevel.middle;
    case 'middle':
      return offer.offer.price >= priceLevel.middle && offer.offer.price < priceLevel.high;
    case 'high':
      return offer.offer.price >= priceLevel.high;
  }
};

const filterRooms = (offer, rooms) =>
  rooms === 'any' || offer.offer.rooms === Number(rooms);

const filterGuests = (offer, guests) =>
  guests === 'any' || offer.offer.guests === Number(guests);

const filterFeatures = (offer, features) => {
  if (!features.length) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }
  return features.every((feature) => offer.offer.features.includes(feature));
};

const getFilteredOffersByType = (offers) => {
  const filteredOffers = [];
  const selectedType = housingTypeElement.value;
  const selectedPrice = housingPriceElement.value;
  const selectedRooms = housingRoomsElement.value;
  const selectedGuests = housingGuestsElement.value;
  const selectedFeatures = [];
  housingFeaturesElement.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFeatures.push(checkbox.value);
    }
    return selectedFeatures;
  });

  for (const offer of offers) {
    if (filteredOffers.length > OFFER_COUNT) {
      break;
    }
    if (
      filterType(offer, selectedType) &&
      filterPrice(offer, selectedPrice) &&
      filterRooms(offer, selectedRooms) &&
      filterGuests(offer, selectedGuests) &&
      filterFeatures(offer, selectedFeatures)
    ) {
      filteredOffers.push(offer);
    }
  }

  return filteredOffers;
};

const setOnFiltersChange = (cb, arr) => {
  filtersFormElement.addEventListener('change', debounce(() => {
    removeAllMarkers();
    cb(getFilteredOffersByType(arr));
  }
  , RERENDER_DELAY)
  );
};

export {setOnFiltersChange};
