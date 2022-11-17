const mapFilters = document.querySelector('.map__filters');
const selects = mapFilters.querySelectorAll('select');

const turnOffMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = true;
  });
};

const turnOnMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  selects.forEach((select) => {
    select.disabled = false;
  });
};

turnOffMapFilters();

export {turnOnMapFilters};
