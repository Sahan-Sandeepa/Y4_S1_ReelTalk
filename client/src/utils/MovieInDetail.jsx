export const getStoredMovies = () => {
    return JSON.parse(localStorage.getItem('movies') || '[]');
};

export const getMovieDetailsFromSession = () => {
    const chatAttachmentResponse = JSON.parse(sessionStorage.getItem('chatAttachmentResponse'));

    if (!chatAttachmentResponse) {
        console.log('No chatAttachmentResponse found in session storage');
        return getSampleMovie();
    }

    const storedMovies = getStoredMovies();

    for (const movieList of storedMovies) {
        for (const movie of movieList) {
            if (movie.Poster === chatAttachmentResponse) {
                return movie;
            }
        }
    }
    return getSampleMovie();
};

const getSampleMovie = () => {
    return {
        Title: "Sample Movie",
        Year: "N/A",
        imdbID: "N/A",
        Type: "movie",
        Poster: "https://via.placeholder.com/300x450.png?text=Sample+Movie",
        dynamicID: "sample-id",
    };
};
