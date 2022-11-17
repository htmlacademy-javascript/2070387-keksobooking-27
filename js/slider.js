const sliderPrice = document.querySelector('.ad-form__slider');
const price = document.querySelector('#price');
const typeOfHousing = document.querySelector('#type');
const typeCost = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000'
};

noUiSlider.create(sliderPrice, {
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

sliderPrice.noUiSlider.on('update', () => {
  price.value = sliderPrice.noUiSlider.get();
});

typeOfHousing.addEventListener('change', () => {
  const startPrice = typeCost[typeOfHousing.value];
  sliderPrice.noUiSlider.updateOptions({
    start: startPrice,
  });
});

const sliderReset = () => {
  sliderPrice.noUiSlider.set(typeCost[typeOfHousing.value]);
};

export {sliderReset};
