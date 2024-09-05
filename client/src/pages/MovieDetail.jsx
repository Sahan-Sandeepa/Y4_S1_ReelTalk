import React from 'react';

const MovieDetail = ({ title, posterUrl, description, releaseDate, genre }) => {
    return (
        <div style={styles.container}>
            <div style={styles.posterContainer}>
                <img src={posterUrl} alt={`${title} Poster`} style={styles.poster} />
            </div>
            <div style={styles.detailsContainer}>
                <h1 style={styles.title}>{title}</h1>
                <p style={styles.description}>{description}</p>
                <div style={styles.additionalInfo}>
                    <p><strong>Release Date:</strong> {releaseDate}</p>
                    <p><strong>Genre:</strong> {genre}</p>
                </div>
            </div>
        </div>
    );
};

// Example styles, adjust as needed
const styles = {
    container: {
        display: 'flex',
        padding: '20px',
        backgroundColor: '#f8f9fa',
    },
    posterContainer: {
        flex: '0 0 300px',
        marginRight: '20px',
    },
    poster: {
        width: '100%',
        borderRadius: '8px',
    },
    detailsContainer: {
        flex: '1',
    },
    title: {
        fontSize: '32px',
        marginBottom: '20px',
    },
    description: {
        fontSize: '18px',
        marginBottom: '20px',
    },
    additionalInfo: {
        fontSize: '16px',
    },
};

export default MovieDetail;
