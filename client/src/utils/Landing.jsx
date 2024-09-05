export const getStoredMovies = () => {
    return JSON.parse(localStorage.getItem('movies') || '[]');
};
