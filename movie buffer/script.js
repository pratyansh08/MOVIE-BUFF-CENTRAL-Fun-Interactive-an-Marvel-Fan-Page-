document.addEventListener('DOMContentLoaded', () => {

    setTimeout(function() {
        const cardss = document.querySelector('.cards');
        cardss.style.opacity=('.7'); // Add the class to make them visible
    }, 2000);
    setTimeout(function() {
        const home = document.querySelector('.homepage');
        home.style.opacity=('0'); // Add the class to make them visible
    }, 2000);
    


    const apiKey = "5cabf66c12b5bb1b1eb69878a78f8d49";
    const apiBaseUrl = "https://api.themoviedb.org/3";

    // Function to fetch movie details based on the movie name
    async function fetchMovieDetails(movieName, backgroundImage) {
        const searchUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;

        try {
            const response = await fetch(searchUrl);
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new Error("No movie found with that name.");
            }

            const movieDetails = data.results[0];
            updateContent(movieDetails);
            updateHeaderBackground(backgroundImage); // Change the header background

        } catch (error) {
            console.error("Error fetching movie details:", error.message);
        }
    }

    // Function to update the content area with movie details
    function updateContent(movieDetails) {
        const titleElement = document.getElementById('title');
        const descriptionElement = document.querySelector('.content p'); // Update this based on your HTML structure
        const genreElement = document.getElementById('gen');
        const yearElement = document.querySelector('.detail h4'); // Update this based on your HTML structure
        const ratingElement = document.getElementById('rate');

        titleElement.textContent = movieDetails.title; // Movie title
        descriptionElement.textContent = movieDetails.overview; // Movie description
        genreElement.textContent = movieDetails.genre_ids.join(', '); // Movie genres (you may need a mapping for genre names)
        yearElement.textContent = new Date(movieDetails.release_date).getFullYear(); // Release year
        ratingElement.innerHTML = `<span>IMDB</span><i class="bi bi-star">${movieDetails.vote_average}</i>`; // Rating
    }

    // Function to update header background
    function updateHeaderBackground(imageUrl) {
        const header = document.querySelector('header'); // Make sure to select the header element correctly
        header.style.backgroundImage = `url('${imageUrl}')`;
        header.style.backgroundSize = 'cover'; // Make sure the background covers the entire header
        header.style.backgroundPosition = 'center'; // Center the background image
    }

    // Add click event listeners to the movie cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const movieName = card.querySelector('h4').textContent; // Fetching movie name from h4
           
            const detailSection = document.querySelector('.detail');
            detailSection.style.display = 'flex'; // Change display to flex
             
            const home = document.querySelector('.homepage');
            home.style.display = 'none';
            
            

            const backgroundImage = card.querySelector('.poster').src; // Get the image source of the poster
            fetchMovieDetails(movieName, backgroundImage); // Fetch movie details and update background
        });
    });
});


