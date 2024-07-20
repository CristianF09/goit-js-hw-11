import axios from 'axios';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = '44945443-a87852da5247dab1dc66b1659';
  const BASE_URL = 'https://pixabay.com/api/';
  const PER_PAGE = 40;

  const searchForm = document.getElementById('search-form');
  const gallery = document.getElementById('gallery');
  const loadMoreBtn = document.querySelector('.load-more');

  let searchQuery = '';
  let page = 1;
  let totalHits = 0;

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    page = 1;
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('hidden');

    if (searchQuery === '') {
      Notiflix.Notify.warning('Please enter a search query');
      return;
    }

    await fetchImages();
  });

  loadMoreBtn.addEventListener('click', fetchImages);

  async function fetchImages() {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page,
          per_page: PER_PAGE,
        },
      });

      const images = response.data.hits;
      totalHits = response.data.totalHits;

      if (images.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        loadMoreBtn.classList.add('hidden');
      } else {
        renderGallery(images);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        if (page * PER_PAGE >= totalHits) {
          loadMoreBtn.classList.add('hidden');
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        } else {
          loadMoreBtn.classList.remove('hidden');
          page += 1;
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      Notiflix.Notify.failure('An error occurred while fetching images');
    }
  }

  function renderGallery(images) {
    const markup = images.map(image => createImageCard(image)).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
  }

  function createImageCard(image) {
    return `
      <div class="photo-card">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${image.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${image.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${image.downloads}
          </p>
        </div>
      </div>
    `;
  }
});