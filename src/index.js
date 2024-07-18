document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = event.target.searchQuery.value;
    searchImages(query);
  });
  
  async function searchImages(query) {
    const apiKey = '44945443-a87852da5247dab1dc66b1659';
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayResults(data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
  
  function displayResults(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
  
    images.forEach(image => {
      const item = document.createElement('div');
      item.classList.add('item');
      
      const img = document.createElement('img');
      img.src = image.urls.small;
      img.alt = image.alt_description || 'Image';
      
      item.appendChild(img);
      gallery.appendChild(item);
    });
  }