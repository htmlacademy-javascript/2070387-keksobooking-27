const SHOW_TIME = 5000;

const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const bodyElementElement = document.querySelector('body');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onErrorButtonClick = () => {
  hideMessage();
};

const onOverlayClick = () => {
  hideMessage();
};

const onMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const showSuccesMessage = () => {
  const successMessageElement = successMessageTemplateElement.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onOverlayClick);
  bodyElementElement.append(successMessageElement);
  bodyElementElement.style.overflow = 'hidden';
};

const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplateElement.cloneNode(true);
  document.addEventListener('keydown', onMessageEscKeydown);
  const errorButton = errorMessageElement.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
  bodyElementElement.append(errorMessageElement);
  bodyElementElement.style.overflow = 'hidden';
};

function hideMessage () {
  const messageElement =
    document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onOverlayClick);
  bodyElementElement.style.overflow = 'auto';
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '1200px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.left = '0';
  alertContainer.style.top = '650px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_TIME);
};

export {showSuccesMessage, showErrorMessage, showAlert};
