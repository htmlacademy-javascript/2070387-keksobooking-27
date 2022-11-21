const formElement = document.querySelector('.ad-form');
const fieldsetElements = formElement.querySelectorAll('fieldset');

const turnOffForm = () => {
  formElement.classList.add('ad-form--disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const turnOnForm = () => {
  formElement.classList.remove('ad-form--disabled');
  fieldsetElements.forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

turnOffForm();

export {turnOnForm};
