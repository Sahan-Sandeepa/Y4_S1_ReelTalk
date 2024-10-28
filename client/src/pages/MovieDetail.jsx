import { useEffect, useState, Fragment } from 'react';
import { Box, Typography, Grid, Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel, Card, CardContent, CardMedia, Chip, Menu } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { DateRange, Language, Star, ThumbUp, Visibility, Add, ArrowDropDown, FamilyRestroom, Wc } from '@mui/icons-material';
import Footer from '../assets/components/footer';
import axios from 'axios';
import { getMovieDetailsFromSession } from '../utils/MovieInDetail';

const TMDB_API_KEY = '8f05a199269e9918674817c9425bf4dd';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('param');
    // const secondParam = queryParams.get('secondParam');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('28');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieVideos, setMovieVideos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchedMovie, setSearchedMovie] = useState(null);
    const [searchedMovieTrailer, setSearchedMovieTrailer] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleWatchlistClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleWatchlistClose = () => {
        setAnchorEl(null);
    };
    const searchedMovies = {
        genres: ["Adventure Epic", "Science", "Science fiction", "Action", "Western", "Fantasy"],
        creators: ["Patrick McKay", "John D. Payne"],
        stars: ["Morfydd Clark", "Charlie Vickers", "Markella Kavenagh"],
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`);
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    // Fetch movies by genre
    useEffect(() => {
        if (selectedGenre) {
            const fetchMoviesByGenre = async () => {
                try {
                    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${selectedGenre}`);
                    setMovies(response.data.results);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            };
            fetchMoviesByGenre();
        }
    }, [selectedGenre]);

    // Search for movie by title from session and fetch its trailer
    useEffect(() => {
        const movieFromSession = getMovieDetailsFromSession(paramValue);
        if (movieFromSession && movieFromSession.Title) {
            const searchMovieByTitle = async () => {
                try {
                    const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(movieFromSession.Title)}`);
                    if (response.data.results.length > 0) {
                        const movie = response.data.results[0];
                        setSearchedMovie(movie);
                        fetchTrailerForSearchedMovie(movie.id);
                    } else {
                        setSearchedMovie(null);
                    }
                } catch (error) {
                    console.error('Error searching movie by title:', error);
                }
            };
            searchMovieByTitle();
        }
    }, []);

    // Function to fetch trailer for the searchedMovie
    const fetchTrailerForSearchedMovie = async (movieId) => {
        try {
            const videosResponse = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`);
            if (videosResponse.data.results.length > 0) {
                setSearchedMovieTrailer(videosResponse.data.results[0].key); // Get the first trailer
            } else {
                setSearchedMovieTrailer(null);
            }
        } catch (error) {
            console.error('Error fetching trailer for the searched movie:', error);
        }
    };

    // Open dialog with selected movie details
    const handleOpenDialog = async (movieId) => {
        try {
            const movieResponse = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`);
            setSelectedMovie(movieResponse.data);

            const videosResponse = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`);
            setMovieVideos(videosResponse.data.results);

            setOpenDialog(true);
        } catch (error) {
            console.error('Error fetching movie details or videos:', error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedMovie(null);
        setMovieVideos([]);
    };

    return (
        <div className="landing-container">
            <Box padding="2rem">
                {searchedMovie ? (
                    <Box marginBottom="2rem" sx={{ backgroundColor: '#333', color: '#f0f0f0', padding: '2rem', borderRadius: '0.5rem' }}>
                        <Grid container spacing={2} overflow={'hidden'}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h4" marginBottom="1rem" marginLeft={'5rem'} color="#fff">
                                    {searchedMovie.title}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}`}
                                    alt={searchedMovie.title}
                                    style={{
                                        width: '25rem',
                                        height: '30rem',
                                        objectFit: 'fill',
                                        marginLeft: '5rem',
                                        borderRadius: '0.5rem',
                                    }} />
                            </Grid>

                            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Grid container spacing={0.5} alignItems="center" sx={{ marginBottom: '1rem', marginLeft: '11rem' }}>
                                    <Grid item xs={6} display="flex" alignItems="center">
                                        <Star style={{ color: '#FFD700', marginRight: '0.5rem' }} />
                                        <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                                            Vote Average: {searchedMovie.vote_average} / 10
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} display="flex" alignItems="center">
                                        <ThumbUp style={{ color: '#1E90FF', marginRight: '0.5rem' }} />
                                        <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                                            Vote Count: {searchedMovie.vote_count}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {searchedMovieTrailer && (
                                    <Box sx={{ width: '100%', position: 'relative' }}>
                                        <iframe
                                            width="100%"
                                            height="500"
                                            src={`https://www.youtube.com/embed/${searchedMovieTrailer}`}
                                            title="Trailer"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ borderRadius: '0.5rem' }} />
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                left: '10px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                color: '#fff',
                                                padding: '5px 10px',
                                                borderRadius: '0.3rem',
                                            }}
                                        >
                                            Play Trailer
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>

                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={6} display="flex" alignItems="center">
                                    <DateRange style={{ color: '#fff', marginRight: '0.5rem' }} />
                                    <Typography variant="subtitle1" color="#fff">
                                        {new Date(searchedMovie.release_date).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} display="flex" alignItems="center">
                                    <Language style={{ color: '#fff', marginRight: '0.5rem' }} />
                                    <Typography variant="subtitle1" color="#fff">
                                        {searchedMovie.original_language.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} display="flex" alignItems="center">
                                    <Visibility style={{ color: '#fff', marginRight: '0.5rem' }} />
                                    <Typography variant="subtitle1" color="#fff">
                                        {searchedMovie.popularity}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} display="flex" alignItems="center">
                                    {searchedMovie.adult === false ? <FamilyRestroom style={{ color: '#fff', marginRight: '0.5rem' }} /> : <Wc style={{ color: '#fff', marginRight: '0.5rem' }} />}
                                    <Typography variant="subtitle1" color="#fff">
                                        {searchedMovie.adult === false ? 'Family' : 'Adult'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" marginTop="1rem" paragraph color="#fff">
                                Overview: {searchedMovie.overview}
                            </Typography>

                            {/* Genres */}
                            <Box marginBottom="1rem">
                                {searchedMovies.genres.map((genre, index) => (
                                    <Chip
                                        key={index}
                                        label={genre}
                                        variant="outlined"
                                        sx={{ marginRight: '0.5rem', color: '#fff', borderColor: '#fff' }} />
                                ))}
                            </Box>

                            {/* Creators and Stars */}
                            <Card sx={{ marginTop: '2rem', backgroundColor: '#444', color: '#f0f0f0' }}>
                                <CardContent>
                                    <Typography variant="h6" color="#fff">
                                        Creators: {searchedMovies.creators.join(', ')}
                                    </Typography>
                                    <Typography variant="h6" color="#fff">
                                        Stars: {searchedMovies.stars.join(', ')}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <Box marginTop="2rem" display={"flex"} justifyContent={"end"}>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    endIcon={<ArrowDropDown />}
                                    sx={{ backgroundColor: '#FFD700', color: '#000', textTransform: 'none', ":hover": { backgroundColor: 'yellowgreen', color: '#000' } }}
                                    onClick={handleWatchlistClick}
                                >
                                    Add to Watchlist
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleWatchlistClose}
                                    sx={{ mt: '1rem' }}
                                >
                                    <MenuItem onClick={handleWatchlistClose}>New List</MenuItem>
                                    <MenuItem onClick={handleWatchlistClose}>My Favorite Shows</MenuItem>
                                    <MenuItem onClick={handleWatchlistClose}>Watch Later</MenuItem>
                                </Menu>
                            </Box>
                        </CardContent>

                    </Box>

                ) : (
                    <Box marginBottom="2rem" sx={{ backgroundColor: '#333', color: '#f0f0f0', padding: '2rem', borderRadius: '0.5rem' }}><Typography variant="h6">No movie details available</Typography></Box>
                )}
                <Typography variant="h4" marginBottom="1rem" fontFamily="Roboto">
                    Explore More
                </Typography>
                {/* Genre and movie selection */}
                <FormControl fullWidth size="small" margin="normal">
                    <InputLabel>genres</InputLabel>
                    <Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} label="Genre">
                        <MenuItem value="">All</MenuItem>
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Grid container spacing={2} marginTop={"1rem"} marginLeft={"1rem"} overflow={"hidden"}>
                    {movies.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} key={movie.id}>
                            <Box>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ maxWidth: '90%', borderRadius: '8px' }} />
                                <Typography variant="h6" marginTop="0.5rem">
                                    {movie.title}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {new Date(movie.release_date).getFullYear()}
                                </Typography>
                                <Button variant="contained" sx={{ backgroundColor: '#f5c518', ':hover': { backgroundColor: 'rgb(255 230 138)', color: '#000' } }} onClick={() => handleOpenDialog(movie.id)}>
                                    View Details
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Dialog with movie details and video */}
                {selectedMovie && (
                    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                        <DialogTitle>{selectedMovie.title}</DialogTitle>
                        <DialogContent>
                            <Box>
                                <Typography variant="h6" marginTop="1rem">
                                    Overview
                                </Typography>
                                <Typography variant="body1">
                                    {selectedMovie.overview}
                                </Typography>
                                <Typography variant="subtitle1" marginTop="1rem">
                                    Genres: {selectedMovie.genres.map((genre) => genre.name).join(', ')}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Runtime: {selectedMovie.runtime} minutes
                                </Typography>
                                {movieVideos.length > 0 && (
                                    <Box marginTop="1rem">
                                        <Typography variant="h6">Trailer:</Typography>
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${movieVideos[0].key}`}
                                            title="Trailer"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen />
                                    </Box>
                                )}
                            </Box>
                        </DialogContent>
                    </Dialog>
                )}
            </Box>
            <Footer
                title={<Fragment>
                    <span className="landing-text132 thq-body-small">
                        Connect with us
                    </span>
                </Fragment>} />
        </div>
    );
};

export default MovieDetail;