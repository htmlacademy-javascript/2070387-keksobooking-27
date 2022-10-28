const formElement = document.querySelector('.ad-form');

const turnOffForm = function () {
  formElement.classList.add('ad-form--disabled');
  const fieldsets = formElement.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const turnOnForm = function () {
  formElement.classList.remove('ad-form--disabled');
  const fieldsets = formElement.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export {turnOffForm};
export {turnOnForm};
