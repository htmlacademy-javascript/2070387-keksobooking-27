const mapFilters = document.querySelector('.map__filters');
const selects = mapFilters.querySelectorAll('select');

const turnOffMapFilters = function () {
  mapFilters.classList.add('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = true;
  });
};

const turnOnMapFilters = function () {
  mapFilters.classList.remove('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = false;
  });
};

export {turnOffMapFilters};
export {turnOnMapFilters};
