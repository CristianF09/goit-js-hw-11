document.getElementById("search-form").addEventListener("submit",(function(e){e.preventDefault();const t=e.target.searchQuery.value;t?(document.getElementById("gallery").innerHTML="",async function(e){const t=`https://pixabay.com/api/?key=44945443-a87852da5247dab1dc66b1659&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true`;try{const e=await fetch(t),n=await e.json();n.hits.length>0?function(e){const t=document.getElementById("gallery");e.forEach((e=>{const n=document.createElement("div");n.classList.add("photo-card");const a=document.createElement("img");a.src=e.webformatURL,a.alt=e.tags,a.loading="lazy";const i=document.createElement("div");i.classList.add("info"),i.innerHTML=`\n        <p class="info-item"><b>Likes:</b> ${e.likes}</p>\n        <p class="info-item"><b>Views:</b> ${e.views}</p>\n        <p class="info-item"><b>Comments:</b> ${e.comments}</p>\n        <p class="info-item"><b>Downloads:</b> ${e.downloads}</p>\n      `,n.appendChild(a),n.appendChild(i),t.appendChild(n)}))}(n.hits):Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}catch(e){console.error("Error fetching images:",e),Notiflix.Notify.failure("An error occurred while fetching images. Please try again later.")}}(t)):Notiflix.Notify.warning("Please enter a search query.")}));
//# sourceMappingURL=index.9741ce3c.js.map
