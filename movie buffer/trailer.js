document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "5cabf66c12b5bb1b1eb69878a78f8d49";
    const apiBaseUrl = "https://api.themoviedb.org/3";
    let movieName = ''; // Initialize movieName as an empty string
    const factButton = document.getElementById('Fact'); // Get the Fact button
    const factDisplay = document.getElementById('fact-display'); // Area to display facts
    const trailerPlayer = document.getElementById('trailer');
    const playButton = document.getElementById('play');
    const cutButton = document.getElementById('cut');

    // Function to fetch and display a random movie fact or quote
    const getMovieFact = async (movieName) => {
        try {
            const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
            const data = await response.json();
            const movieId = data.results[0]?.id;

            if (movieId) {
                // Fetch movie details (e.g., tagline, overview, etc.)
                const response = await fetch(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`);
                const movieData = await response.json();

                // Display the tagline as a fun fact (if available)
                const fact = movieData.tagline || "No facts available for this movie.";
                factDisplay.textContent = `Fun Fact: ${fact}`;
                factDisplay.style.display = 'block'; // Show the fact display
            } else {
                factDisplay.textContent = 'Movie not found!';
            }
        } catch (error) {
            console.error('Error fetching the movie fact:', error);
            factDisplay.textContent = 'Error fetching fact!';
        }
    };

    // Attach mouseenter event to show the fact when hovering over the Fact button
    factButton.addEventListener('mouseenter', (event) => {
        event.preventDefault(); // Prevent default anchor click behavior
        if (movieName) {
            getMovieFact(movieName); // Fetch a fact for the selected movie
        } else {
            factDisplay.textContent = 'Please select a movie first!';
            factDisplay.style.display = 'block'; // Show the fact display
        }
    });

    // Hide the fact when the mouse leaves the Fact button
    factButton.addEventListener('mouseleave', () => {
        factDisplay.style.display = 'none'; // Hide the fact display
    });

    // When a card is clicked, set the movie name
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            movieName = card.querySelector('h4').textContent; // Get the movie name from h4 element
            console.log(`Selected Movie: ${movieName}`);
        });
    });

    // Play button event listener to trigger trailer fetching
    playButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor click behavior
        if (movieName) {
            TrailerFetch(movieName); // Fetch the trailer for the selected movie
        } else {
            alert('Please select a movie first!');
        }
    });

    // Cut button event listener to stop the trailer
    cutButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor click behavior
        trailerPlayer.src = ''; // Stop the video by clearing the src
        trailerPlayer.style.display = 'none'; // Hide the iframe
    });

    // Function to fetch and play the trailer
    const TrailerFetch = async (movieName) => {
        try {
            const response1 = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
            const data1 = await response1.json();
            const movieId = data1.results[0]?.id;

            if (movieId) {
                const response = await fetch(`${apiBaseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
                const data = await response.json();
                const trailer = data.results.find(video => video.type === 'Trailer');

                if (trailer) {
                    const trailerUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
                    trailerPlayer.src = trailerUrl;
                    trailerPlayer.style.display = 'block'; // Show the iframe
                } else {
                    alert('Trailer not found!');
                }
            } else {
                alert('Movie not found!');
            }
        } catch (error) {
            console.error('Error fetching the trailer:', error);
        }
    };
});
