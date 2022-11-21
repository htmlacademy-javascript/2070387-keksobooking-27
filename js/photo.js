const PHOTO_TYPES = ['jpg', 'jpeg', 'png'];

const photoChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const previewPhotoElement = document.querySelector('.ad-form__photo');

photoChooserElement.addEventListener('change', () => {
  const file = photoChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = PHOTO_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhotoElement.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.style.maxWidth = '100%';
    photo.style.height = 'auto';
    previewPhotoElement.append(photo);
  }
});

const resetPhoto = () => {
  previewPhotoElement.innerHTML = '';
};

export {resetPhoto};
