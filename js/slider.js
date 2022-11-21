const sliderPriceElement = document.querySelector('.ad-form__slider');
const priceElement = document.querySelector('#price');
const typeOfHousingElement = document.querySelector('#type');
const typeCost = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

noUiSlider.create(sliderPriceElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderPriceElement.noUiSlider.on('update', () => {
  priceElement.value = sliderPriceElement.noUiSlider.get();
});

typeOfHousingElement.addEventListener('change', () => {
  const startPrice = typeCost[typeOfHousingElement.value];
  sliderPriceElement.noUiSlider.updateOptions({
    start: startPrice,
  });
});

const sliderReset = () => {
  sliderPriceElement.noUiSlider.set(typeCost[typeOfHousingElement.value]);
};

export {sliderReset};
