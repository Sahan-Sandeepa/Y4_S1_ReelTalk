// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useTheme } from '../utils/ThemeProvider';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import Header from '../components/layout/Header';
import { useSelector } from 'react-redux';
import ReplyIcon from '@mui/icons-material/Reply';
import RecommendIcon from '@mui/icons-material/Recommend';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BottomAppBar from '../utils/BottomAppBar';  

const API_KEY = 'aef6913e';

const categories = [
  { title: 'Popular Movies', query: 'Avengers' },
  { title: 'Top Rated Movies', query: 'Deadpool' },
  { title: 'Upcoming Movies', query: 'fast and furious' },
  { title: 'Action Movies', query: 'action' },
  { title: 'Comedy Movies', query: 'comedy' },
];

const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showBottomAppBar, setShowBottomAppBar] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { mode } = useTheme();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requests = categories.map(({ query }) =>
          axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
        );

        const responses = await Promise.all(requests);
        const moviesData = responses.map(response => response.data.Search || []);
        setMovies(moviesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMenuClick = (event, movie) => {
    setAnchorEl(event.currentTarget);
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMovie(null);
  };

  const handleShareOrRequestClick = () => {
    setShowBottomAppBar(true);
    handleClose();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const containerStyle = {
    padding: '20px',
  };

  const sectionStyle = {
    marginBottom: '40px',
  };

  const titleStyle = {
    fontSize: '1.5em',
    marginTop: '0px',
    marginBottom: '20px',
    color: mode === 'dark' ? '#fff' : "black",
  };

  const movieListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const movieCardStyle = {
    width: '300px',
    borderRadius: '8px',
    backgroundColor: mode === 'dark' ? '#333' : "#fff", 
    marginLeft: '45px',
    marginBottom: '25px',
    height: '470px',
    overflow: 'hidden',
    boxShadow: '0 6px 9px rgba(0.2,0,0,0.5)',
    position: 'relative',
    color: mode === 'dark' ? '#fff' : "black",
  };

  const movieImageStyle = {
    width: '68%',
    height: '70%',
    display: 'block',
    marginLeft: '50px',
    marginTop: '10px',
    borderRadius: '6px',
  };

  const movieTitleStyle = {
    fontSize: '1.1em',
    margin: '10px',
    color: mode === 'dark' ? '#fff' : "black",
  };

  const movieDescriptionStyle = {
    fontSize: '0.9em',
    color: mode === 'dark' ? '#fff' : "black",
    margin: '10px',
  };

  const menuStyle = {
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#333',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const iconStyle = {
    marginRight: '10px',
    fontSize: '1.3em',
    color: '#282828', 
  };

  return (
    <>
      <Header/>
      <div style={containerStyle}>
        {categories.map((category, index) => (
          <section key={index} style={sectionStyle}>
            <h2 style={titleStyle}>{category.title}</h2>
            <div style={movieListStyle}>
              {movies[index]?.map(movie => (
                <div style={movieCardStyle} key={movie.imdbID}>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    style={movieImageStyle} />
                  <div style={movieTitleStyle}>{movie.Title}</div>
                  <div style={movieDescriptionStyle}>
                    {movie.Year} | {movie.Type}
                  </div>
                  <MoreVertIcon
                    style={{ position: 'absolute', bottom: '10px', right: '10px', cursor: 'pointer' }}
                    onClick={(e) => handleMenuClick(e, movie)} />
                </div>
              ))}
            </div>
          </section>
        ))}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ style: menuStyle }}
        >
          <MenuItem
            onClick={() => { handleShareOrRequestClick(); } }
            style={menuItemStyle}
          >
            <ReplyIcon style={iconStyle} />
            Share
          </MenuItem>
          <MenuItem
            onClick={() => { handleShareOrRequestClick(); } }
            style={menuItemStyle}
          >
            <RecommendIcon style={iconStyle} />
            Recommend
          </MenuItem>
          {user.age < 18 ? (
            <MenuItem
              onClick={() => { handleShareOrRequestClick(); } }
              style={menuItemStyle}
            >
              <PlayCircleOutlineIcon style={iconStyle} />
              Request
            </MenuItem>
          ) : null}
        </Menu>
      </div>
      {showBottomAppBar && <BottomAppBar />}
    </>
  );
};

export default Landing;
