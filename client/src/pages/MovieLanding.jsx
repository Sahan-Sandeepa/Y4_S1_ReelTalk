import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet'
import axios from 'axios';
import Header from '../components/layout/Header';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import RecommendIcon from '@mui/icons-material/Recommend';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BottomAppBar from '../utils/BottomAppBar';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
// import CTA26 from '../assets/components/cta26'
import Footer from '../assets/components/footer'
import '../components/styles/landing.css'
import './../assets/components/navbar.css'

const API_KEY = 'aef6913e';
const categories = [
  { title: 'Popular Movies', query: 'Avengers' },
  { title: 'Top Rated Movies', query: 'Deadpool' },
  { title: 'Upcoming Movies', query: 'fast and furious' },
  { title: 'Action Movies', query: 'action' },
  { title: 'Comedy Movies', query: 'comedy' },
  { title: 'X-rated Movies', query: 'Sex' },
];
const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showBottomAppBar, setShowBottomAppBar] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const { mode } = useTheme();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requests = categories.map(({ query }) =>
          axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
        );

        const responses = await Promise.all(requests);
        const moviesData = responses.map((response, categoryIndex) =>
          response.data.Search?.map((movie, movieIndex) => ({
            ...movie,
            dynamicID: `${categoryIndex}-${movieIndex}`,
          })) || []
        );

        const storedMovies = JSON.parse(localStorage.getItem('movies') || '[]');
        if (JSON.stringify(moviesData) !== JSON.stringify(storedMovies)) {
          localStorage.setItem('movies', JSON.stringify(moviesData));
        }

        setMovies(moviesData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMenuClick = (event, movie, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedMovie({ ...movie, categoryTitle: category.title });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShareOrRequestClick = (actionType) => {
    if (selectedMovie) {
      setSelectedAction(actionType);
      setShowBottomAppBar(true);
      handleClose();
    }
  };

  useEffect(() => {
    if (selectedChatId && selectedAction && selectedMovie) {
      setSelectedChatId(null);
      setSelectedAction(null);
      setSelectedMovie(null);
    }
  }, [selectedChatId, selectedAction, selectedMovie]);


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
    color: mode === 'dark' ? '#fff' : 'black',
  };

  const movieListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const blurredImageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '68%',
    height: '70%',
    backgroundColor: '#000',
    marginLeft: '50px',
    marginTop: '10px',
    borderRadius: '6px',
    color: '#fff',
    flexDirection: 'column',
  };

  const movieCardStyle = {
    width: '300px',
    borderRadius: '8px',
    backgroundColor: mode === 'dark' ? '#333' : '#fff',
    marginLeft: '45px',
    marginBottom: '25px',
    height: '470px',
    overflow: 'hidden',
    boxShadow: '0 6px 9px rgba(0,0,0,0.5)',
    position: 'relative',
    color: mode === 'dark' ? '#fff' : 'black',
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
    color: mode === 'dark' ? '#fff' : 'black',
  };

  const movieDescriptionStyle = {
    fontSize: '0.9em',
    color: mode === 'dark' ? '#fff' : 'black',
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
      <Header />
      <div className="landing-container">
        <Helmet>
          <title>Chat App</title>
          <meta property="og:title" content="Landing - Chat App" />
        </Helmet>

        <div style={containerStyle}>
          {categories.map((category, index) => (
            <div key={index} style={sectionStyle}>
              <h2 style={titleStyle}>{category.title}</h2>
              <div style={movieListStyle}>
                {movies[index]?.map((movie) => (
                  <div key={movie.dynamicID} style={movieCardStyle}>
                    {category.title === 'X-rated Movies' && user.age < 18 ? (
                      <div style={blurredImageStyle}>
                        <VisibilityOffTwoToneIcon style={{ fontSize: '50px', color: '#fff' }} />
                        <div style={{ fontSize: '10px' }}>This image may contain explicit content.</div>
                      </div>
                    ) : (
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        style={movieImageStyle}
                      />
                    )}
                    <div style={movieTitleStyle}>{movie.Title}</div>
                    <div style={movieDescriptionStyle}>
                      {movie.Year} | {movie.Type}
                    </div>
                    <MoreVertIcon
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => handleMenuClick(e, movie, category)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ style: menuStyle }}
        >
          <MenuItem
            onClick={() => handleShareOrRequestClick('Share')}
            style={menuItemStyle}
            className="thq-link thq-body-small"
          >
            <ReplyIcon style={iconStyle} />
            Share
          </MenuItem>
          <MenuItem
            onClick={() => handleShareOrRequestClick('Recommend')}
            style={menuItemStyle}
            className="thq-link thq-body-small"
          >
            <RecommendIcon style={iconStyle} />
            Recommend
          </MenuItem>
          {selectedMovie?.categoryTitle === 'X-rated Movies' && user.age < 18 && (
            <MenuItem
              onClick={() => handleShareOrRequestClick('Request')}
              style={menuItemStyle}
              className="thq-link thq-body-small"
            >
              <PlayCircleOutlineIcon style={iconStyle} />
              Request
            </MenuItem>
          )}
        </Menu>

        {showBottomAppBar && (
          <BottomAppBar selectedAction={selectedAction} movie={selectedMovie} />
        )}

        {/* <CTA26
          heading1={
            <Fragment>
              <span className="landing-text124 thq-heading-1">
                Get Started with create Group
              </span>
            </Fragment>
          }
          content1={
            <Fragment>
              <span className="landing-text125 thq-body-large">
                Start chatting with your loved ones.
              </span>
            </Fragment>
          }
          action1={
            <Fragment>
              <span className="landing-text126">Create Group</span>
            </Fragment>
          }
        /> */}

        <Footer
          title={
            <Fragment>
              <span className="landing-text132 thq-body-small">
                Connect with us
              </span>
            </Fragment>
          }
        />
      </div>
    </>
  );
};

export default Landing;