const mapFilters = document.querySelector('.map__filters');

const turnOffMapFilters = function () {
  mapFilters.classList.add('map__filters--disabled');
  const selects = mapFilters.querySelectorAll('select');
  selects.forEach((select) => {
    select.disabled = true;
  });
};

const turnOnMapFilters = function () {
  mapFilters.classList.remove('map__filters--disabled');
  const selects = mapFilters.querySelectorAll('select');
  selects.forEach((select) => {
    select.disabled = false;
  });
};

export {turnOffMapFilters};
export {turnOnMapFilters};
