import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '44945443-a87852da5247dab1dc66b1659';
const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.warning('Please enter a search query');
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    const images = response.data.hits;

    if (images.length === 0) {
      Notiflix.Notify.failure('No images found');
    } else {
      renderGallery(images);
      Notiflix.Notify.success(`Found ${images.length} images`);
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('An error occurred while fetching images');
  }
});

function renderGallery(images) {
  gallery.innerHTML = images
    .map(
      image => `
    <div class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
    </div>
  `
    )
    .join('');
}
