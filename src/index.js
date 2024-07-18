document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = event.target.searchQuery.value;
    if (query) {
      clearGallery();
      searchImages(query);
    } else {
      Notiflix.Notify.warning('Please enter a search query.');
    }
  });
  
  async function searchImages(query) {
    const apiKey = '44945443-a87852da5247dab1dc66b1659';
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.hits.length > 0) {
        displayResults(data.hits);
      } else {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
    }
  }
  
  function displayResults(images) {
    const gallery = document.getElementById('gallery');
  
    images.forEach(image => {
      const card = document.createElement('div');
      card.classList.add('photo-card');
      
      const img = document.createElement('img');
      img.src = image.webformatURL;
      img.alt = image.tags;
      img.loading = 'lazy';
  
      const info = document.createElement('div');
      info.classList.add('info');
      info.innerHTML = `
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      `;
      
      card.appendChild(img);
      card.appendChild(info);
      gallery.appendChild(card);
    });
  }
  
  function clearGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
  }