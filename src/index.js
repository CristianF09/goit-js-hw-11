import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '44945443-a87852da5247dab1dc66b1659';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');

let searchQuery = '';
let page = 1;
let totalHits = 0;
let lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';

  if (searchQuery === '') {
    Notiflix.Notify.warning('Please enter a search query');
    return;
  }

  await fetchImages();
});

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
    } else {
      renderGallery(images);
      lightbox.refresh();
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

      if (page * PER_PAGE >= totalHits) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } else {
        page += 1;
      }

      smoothScroll();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    Notiflix.Notify.failure('An error occurred while fetching images');
  }
}

function renderGallery(images) {
  const markup = images.map(image => createPhotoCard(image)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function createPhotoCard(data) {
  const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = data;

  return `
    <div class="photo-card">
      <a href="${largeImageURL}" class="lightbox">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <ul>
          <li class="info-item"><b>Likes:</b> <span>${likes}</span></li>
          <li class="info-item"><b>Views:</b> <span>${views}</span></li>
          <li class="info-item"><b>Comments:</b> <span>${comments}</span></li>
          <li class="info-item"><b>Downloads:</b> <span>${downloads}</span></li>
        </ul>
      </div>
    </div>
  `;
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

// Infinite scrolling
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && searchQuery) {
      fetchImages();
    }
  });
}, {
  rootMargin: '200px',
});

observer.observe(document.querySelector('.scroll-guard'));