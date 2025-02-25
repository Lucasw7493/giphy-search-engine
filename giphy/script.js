let currentPage = 1; // Variable to track the current page number
const imagesPerPage = 8; // Number of images to display per page

// Function to search for GIFs using the Giphy API
function searchGiphy(page) {
  const searchTerm = document.getElementById('searchTerm').value; // Get the search term from input field
  const apiKey = '2juLOltfWKyQ37UnSKOJ6j6HNaCJzyhw'; // Your Giphy API key
  const offset = (page - 1) * imagesPerPage; // Calculate the offset for pagination
  const url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${imagesPerPage}&offset=${offset}`; // Construct the API URL

  fetch(url) // Fetch data from the Giphy API
    .then(response => response.json()) // Convert the response to JSON
    .then(data => {
      const gifs = data.data; // Extract GIF data from the response
      const resultsDiv = document.getElementById('search-results'); // Get the search results container
      resultsDiv.innerHTML = ''; // Clear previous results

      gifs.forEach(gif => { // Loop through each GIF in the response
        const img = document.createElement('img'); // Create an image element
        img.src = gif.images.fixed_height.url; // Set the image source to the GIF URL
        img.alt = gif.title; // Set the alt text to the GIF title
        img.className = 'gif'; // Add the 'gif' class to the image

        const gifDiv = document.createElement('div'); // Create a container div for the image
        gifDiv.className = 'gif'; // Add the 'gif' class to the div
        gifDiv.appendChild(img); // Append the image to the container div

        resultsDiv.appendChild(gifDiv); // Append the container div to the results container
      });

      currentPage = page; // Update the current page number

      // Enable or disable the pagination buttons based on the current page
      document.getElementById('prevPage').disabled = currentPage === 1;
      document.getElementById('nextPage').disabled = gifs.length < imagesPerPage;
    })
    .catch(error => console.error('Error:', error)); // Log any errors that occur
}

// Function to go to the next page of results
function nextPage() {
  searchGiphy(currentPage + 1); // Increment the page number and search
}

// Function to go to the previous page of results
function prevPage() {
  if (currentPage > 1) { // Check if the current page is greater than 1
    searchGiphy(currentPage - 1); // Decrement the page number and search
  }
}

// Function to reset the page to the home state
function goHome() {
  document.getElementById('searchTerm').value = ''; // Clear the search input field
  document.getElementById('search-results').innerHTML = ''; // Clear the search results
  currentPage = 1; // Reset the current page number to 1
  document.getElementById('prevPage').disabled = true; // Disable the previous button
  document.getElementById('nextPage').disabled = true; // Disable the next button
}

// Function to perform a random search
function randomSearch() {
  const randomTerms = ['cats', 'dogs', 'funny', 'memes', 'cartoons', 'nature']; // Array of random search terms
  const randomTerm = randomTerms[Math.floor(Math.random() * randomTerms.length)]; // Select a random term from the array
  document.getElementById('searchTerm').value = randomTerm; // Set the input field to the random term
  searchGiphy(1); // Perform the search with the random term
}
