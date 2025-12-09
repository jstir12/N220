// Select buttons and page elements
const topRatedBtn = document.querySelector('#getTopRatedMoviesBtn');
const popularBtn = document.querySelector('#getPopularMoviesBtn');
const upcomingBtn = document.querySelector('#getUpcomingMoviesBtn');
const singleMovie = document.querySelector('#movieSearchInput');
const searchMoviesBtn = document.querySelector('#searchMoviesBtn');
const loadMoreBtn = document.querySelector('#loadMoreBtn');
const resortBtn = document.querySelector('#resortBtn');
const moviesDiv = document.querySelector('#moviesList');

// Define Global Variables
let pageNumber = 1;
let totalPages = 1;
let selectedQuery = '';
let movies = [];

// Base API settings
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = "a1f19b16a724f9f1d0a87ef685d408c4";

// Get total page limit from results
function getPageLimit(totalResults) {
    totalPages = totalResults.total_pages;
}

// Fetch movies from a given endpoint
async function fetchMovies(endpoint) {
    resortBtn.classList.add('hide');
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=${pageNumber}`);
    const data = await response.json();
    getPageLimit(data);
    return data.results;
}

async function fetchUpcomingMovies() {
    // Today's date
    const today = new Date().toISOString().split('T')[0];

    // Date three months from now
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    const threeMonthsStr = threeMonthsFromNow.toISOString().split('T')[0];

    // Needed format for filtering release types
    const releaseType = encodeURIComponent('3|2');

    // Fetch upcoming movies with filters
    const response = await fetch(
        `${BASE_URL}/discover/movie?` +
        `api_key=${API_KEY}` +
        `&language=en-US` +
        `&page=${pageNumber}` +
        `&region=US` +
        `&sort_by=popularity.desc` +
        `&include_adult=false` +
        `&with_release_type=${releaseType}` +
        `&release_date.gte=${today}` +
        `&release_date.lte=${threeMonthsStr}`
    );

    const data = await response.json();
    getPageLimit(data);
    const movies = data.results;

    // Sort upcoming movies by release date
    movies.sort((a, b) => a.release_date.localeCompare(b.release_date));
    return movies;
}

async function fecthSearchResults(query) {
    // Hide resort button during search
    resortBtn.classList.add('hide');
    // Send movie search request
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${pageNumber}&include_adult=false&sort_by=popularity.desc`
    );

    const data = await response.json();
    getPageLimit(data);
    const movies = data.results;

    return movies;
}

// Get top-rated movies
topRatedBtn.addEventListener('click', async () => {
    pageNumber = 1;
    selectedQuery = 'top_rated';
    movies = await fetchMovies('/movie/top_rated');
    displayMovies();
});

// Get popular movies
popularBtn.addEventListener('click', async () => {
    pageNumber = 1;
    selectedQuery = 'popular';
    movies = await fetchMovies('/movie/popular');
    displayMovies();
});

// Get upcoming movies within the next 3 months
upcomingBtn.addEventListener('click', async () => {
    pageNumber = 1;
    selectedQuery = 'upcoming';
    movies = await fetchUpcomingMovies();
    displayMovies();
});

// Search movies based on user input
searchMoviesBtn.addEventListener('click', async () => {

    pageNumber = 1;
    selectedQuery = 'search';
    // Get search text
    const query = singleMovie.value;
    movies = await fecthSearchResults(query);

    // If no movies found, show a message
    if (movies.length === 0) {
        window.alert('No results found. Please try a different search.');
        loadMoreBtn.classList.add('hide');
        return;
    }

    displayMovies();
});

// Load more movies when "Load More" button is clicked
loadMoreBtn.addEventListener('click', async () => {
    // Set variables for next page
    pageNumber++;
    let moreMovies = [];

    // Get current query
    if (selectedQuery === 'top_rated') {
        moreMovies = await fetchMovies('/movie/top_rated');
    } else if (selectedQuery === 'popular') {
        moreMovies = await fetchMovies('/movie/popular');
    } else if (selectedQuery === 'upcoming') {
        moreMovies = await fetchUpcomingMovies();
        moreMovies.sort((a, b) => a.release_date.localeCompare(b.release_date));
        resortBtn.classList.remove('hide');
    } else if (selectedQuery === 'search') {
        const query = singleMovie.value;
        moreMovies = await fecthSearchResults(query);
    }

    // now display the new movies
    movies = movies.concat(moreMovies);
    displayMovies(true);
});

// Resort upcoming movies by release date
resortBtn.addEventListener('click', () => {
    // Resort only if the current selection is upcoming movies
    if (selectedQuery === 'upcoming') {
        movies.sort((a, b) => a.release_date.localeCompare(b.release_date));
        displayMovies();
        resortBtn.classList.add('hide');
        // Scroll to top of movie list
        moviesDiv.scrollIntoView({ behavior: 'smooth' });
    }
});

// Display movies on the page with a fade-in animation
function displayMovies(append = false) {

    // Only clear if not appending
    if (!append) {
        moviesDiv.innerHTML = '';
    }

    // Render ALL movies in replace mode
    // OR only the new ones in append mode
    const moviesToRender = append ? movies.slice(-20) : movies;

    moviesToRender.forEach(movie => {
        const movieElem = document.createElement('div');
        movieElem.classList.add('movie-item');
        let posterPath = '';

        // Get correct image path
        if (!movie.poster_path) {
            posterPath = './assets/Place-Holder.png';
        }
        else {
            posterPath = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        }

        movieElem.innerHTML = `
            <img src="${posterPath}" alt="${movie.title} Poster">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <p>Release Date: ${movie.release_date}</p>
            <p>${movie.overview}</p>
        `;

        // Fade-in animation
        movieElem.style.opacity = "0";
        setTimeout(() => {
            movieElem.style.transition = "opacity 0.4s ease-in-out, transform 0.3s ease, box-shadow 0.3s ease";
            movieElem.style.opacity = "1";
        }, 10);

        moviesDiv.appendChild(movieElem);
    });

    // Show or hide load more
    if (pageNumber < totalPages) {
        loadMoreBtn.classList.remove('hide');
        loadMoreBtn.classList.add('show');
    } else {
        loadMoreBtn.classList.remove('show');
        loadMoreBtn.classList.add('hide');
    }
}

