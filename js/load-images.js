const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const formElement = document.querySelector('.ad-form');
const avatarChooserElement = formElement.querySelector('#avatar');
const avatarPreviewElement = formElement.querySelector('.ad-form-header__avatar');
const photoChooserElement = formElement.querySelector('#images');
const photoPreviewElement = formElement.querySelector('.ad-form__photo-preview');

const avatarSrcDefault = avatarPreviewElement.src;

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
  avatarChooserElement.addEventListener('change', () => {
    onChooserChange(avatarChooserElement, avatarPreviewElement);
  });

  photoChooserElement.addEventListener('change', () => {
    onChooserChange(photoChooserElement, photoPreviewElement);
  });
};

const resetPreview = () => {
  avatarPreviewElement.src = avatarSrcDefault;
  photoPreviewElement.src = '';
  photoPreviewElement.classList.add('hidden');
};

export {setLoadImagesListener, resetPreview};
