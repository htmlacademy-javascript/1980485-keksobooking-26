const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const avatarChooser = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__avatar');
const photoChooser = adForm.querySelector('#images');
const photoPreview = adForm.querySelector('.ad-form__photo-preview');

const avatarSrcDefault = avatarPreview.src;

const onChooserChange = (chooser, preview) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    preview.classList.remove('hidden');
  }
};

const setLoadImagesListener = () => {
  avatarChooser.addEventListener('change', () => {
    onChooserChange(avatarChooser, avatarPreview);
  });

  photoChooser.addEventListener('change', () => {
    onChooserChange(photoChooser, photoPreview);
  });
};

const resetPreview = () => {
  avatarPreview.src = avatarSrcDefault;
  photoPreview.src = '';
  photoPreview.classList.add('hidden');
};

export {setLoadImagesListener, resetPreview};
