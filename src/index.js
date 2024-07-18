document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = event.target.searchQuery.value;
    if (query) {
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
    gallery.innerHTML = '';
  
    images.forEach(image => {
      const item = document.createElement('div');
      item.classList.add('item');
      
      const img = document.createElement('img');
      img.src = image.webformatURL;
      img.alt = image.tags;
  
      const info = document.createElement('div');
      info.classList.add('info');
      info.innerHTML = `
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      `;
      
      item.appendChild(img);
      item.appendChild(info);
      gallery.appendChild(item);
    });
  }