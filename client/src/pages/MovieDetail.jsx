import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel, Card, CardContent, CardMedia } from '@mui/material';
import { DateRange, Language, Star, ThumbUp, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { getMovieDetailsFromSession } from '../utils/MovieInDetail';

// TMDB API Key (replace with your actual key)
const TMDB_API_KEY = '8f05a199269e9918674817c9425bf4dd';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const iconStyle = { color: '#1976d2', marginRight: '0.5rem' };

const MovieDetail = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieVideos, setMovieVideos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchedMovie, setSearchedMovie] = useState(null);
    const [searchedMovieTrailer, setSearchedMovieTrailer] = useState(null);  // To store searched movie's trailer

    // Fetch genres
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
        const movieFromSession = getMovieDetailsFromSession();
        if (movieFromSession && movieFromSession.Title) {
            const searchMovieByTitle = async () => {
                try {
                    const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(movieFromSession.Title)}`);
                    if (response.data.results.length > 0) {
                        const movie = response.data.results[0];
                        setSearchedMovie(movie);
                        fetchTrailerForSearchedMovie(movie.id);  // Fetch trailer after getting the movie details
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
        <Box padding="2rem">
            {searchedMovie ? (
                <Box marginBottom="2rem">
                    <Grid container spacing={3}>
                        {/* Movie Image */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" marginBottom="1rem" marginLeft={'5rem'}>
                                {searchedMovie.title}
                            </Typography>
                                <CardMedia
                                    component="img"
                                    image={`https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}`}
                                    alt={searchedMovie.title}
                                    style={{ width: '25rem', height: '30rem', objectFit: 'fill', marginLeft: '5rem', borderRadius: '0.5rem' }}
                                />
                        </Grid>

                        {/* Trailer */}
                        <Grid item xs={12} md={6}>
                            <Grid item xs={12} md={6} display="flex" alignItems="center">
                                <Star style={iconStyle} />
                                <Typography variant="subtitle1" color="textSecondary">
                                    Vote Average: {searchedMovie.vote_average} / 10
                                </Typography>
                                <Grid item xs={12} md={6} display="flex" alignItems="center" marginLeft={'1rem'}>
                                    <ThumbUp style={iconStyle} />
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Vote Count: {searchedMovie.vote_count}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {searchedMovieTrailer && (
                                    <CardContent sx={{ height: '105%', display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <iframe
                                                width="100%"
                                                height="90%"
                                                src={`https://www.youtube.com/embed/${searchedMovieTrailer}`}
                                                title="Trailer"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{ borderRadius: '0.5rem' }}
                                            />
                                        </Box>
                                    </CardContent>
                            )}
                        </Grid>
                    </Grid>

                    {/* Movie Details */}
                    <Card sx={{ marginTop: '1rem' }}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={6} display="flex" alignItems="center">
                                    <DateRange style={iconStyle} />
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {new Date(searchedMovie.release_date).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} display="flex" alignItems="center">
                                    <Language style={iconStyle} />
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {searchedMovie.original_language.toUpperCase()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} display="flex" alignItems="center">
                                    <Visibility style={iconStyle} />
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {searchedMovie.popularity}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" marginTop="1rem" paragraph>
                                Overview: {searchedMovie.overview}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                <Typography variant="h6">No movie details available</Typography>
            )}

            {/* Genre and movie selection */}
            <FormControl fullWidth margin="normal">
                <InputLabel>Genre</InputLabel>
                <Select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} label="Genre">
                    <MenuItem value="">All</MenuItem>
                    {genres.map((genre) => (
                        <MenuItem key={genre.id} value={genre.id}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Typography variant="h4" marginBottom="1rem">
                Movies
            </Typography>
            <Grid container spacing={4}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                        <Box>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                style={{ maxWidth: '100%', borderRadius: '8px' }}
                            />
                            <Typography variant="h6" marginTop="0.5rem">
                                {movie.title}
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary">
                                {new Date(movie.release_date).getFullYear()}
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => handleOpenDialog(movie.id)}>
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
                                        allowFullScreen
                                    />
                                </Box>
                            )}
                        </Box>
                    </DialogContent>
                </Dialog>
            )}
        </Box>
    );
};

export default MovieDetail;