const formElement = document.querySelector('.ad-form');
const fieldsets = formElement.querySelectorAll('fieldset');

const turnOffForm = function () {
  formElement.classList.add('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const turnOnForm = function () {
  formElement.classList.remove('ad-form--disabled');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

turnOffForm();

export {turnOnForm};
