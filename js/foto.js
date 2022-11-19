const FOTO_TYPES = ['jpg', 'jpeg', 'png'];

const fotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewFoto = document.querySelector('.ad-form__photo');

fotoChooser.addEventListener('change', () => {
  const file = fotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FOTO_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewFoto.innerHTML = '';
    const foto = document.createElement('img');
    foto.src = URL.createObjectURL(file);
    foto.style.maxWidth = '100%';
    foto.style.height = 'auto';
    previewFoto.append(foto);
  }
});

const resetFoto = () => {
  previewFoto.innerHTML = '';
};

export {resetFoto};
