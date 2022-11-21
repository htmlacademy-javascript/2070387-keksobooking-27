const mapFiltersElement = document.querySelector('.map__filters');
const selectElements = mapFiltersElement.querySelectorAll('select');

const turnOffMapFilters = () => {
  mapFiltersElement.classList.add('map__filters--disabled');
  selectElements.forEach((select) => {
    select.disabled = true;
  });
};

const turnOnMapFilters = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  selectElements.forEach((select) => {
    select.disabled = false;
  });
};

turnOffMapFilters();

export {turnOnMapFilters};
