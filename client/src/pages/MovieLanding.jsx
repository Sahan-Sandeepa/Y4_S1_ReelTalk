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
// import Navbar8 from '../assets/components/navbar8'
import CTA26 from '../assets/components/cta26'
import Footer from '../assets/components/footer'
import '../components/styles/landing.css'

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
        const moviesData = responses.map((response, categoryIndex) =>
          response.data.Search?.map((movie, movieIndex) => ({
            ...movie,
            dynamicID: `${categoryIndex}-${movieIndex}`,
          })) || []
        );
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
    color: mode === 'dark' ? '#fff' : 'black',
  };

  const movieListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const movieCardStyle = {
    width: '300px',
    borderRadius: '8px',
    backgroundColor: mode === 'dark' ? '#333' : '#fff',
    marginLeft: '45px',
    marginBottom: '25px',
    height: '470px',
    overflow: 'hidden',
    boxShadow: '0 6px 9px rgba(0.2,0,0,0.5)',
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
        {/* <Navbar8
      page4Description={
        <Fragment>
          <span className="landing-text100 thq-body-small">
            Chat with friends and family
          </span>
        </Fragment>
      }
      action1={
        <Fragment>
          <span className="landing-text101">Get Started</span>
        </Fragment>
      }
      link2={
        <Fragment>
          <span className="landing-text102 thq-link thq-body-small">
            Movies
          </span>
        </Fragment>
      }
      page1={
        <Fragment>
          <span className="landing-text103 thq-body-large">Home</span>
        </Fragment>
      }
      link1={
        <Fragment>
          <span className="landing-text104 thq-link thq-body-small">
            Features
          </span>
        </Fragment>
      }
      page4={
        <Fragment>
          <span className="landing-text105 thq-body-large">About</span>
        </Fragment>
      }
      page2={
        <Fragment>
          <span className="landing-text106 thq-body-large">Pricing</span>
        </Fragment>
      }
      link4={
        <Fragment>
          <span className="landing-text107 thq-link thq-body-small">
            Profile
          </span>
        </Fragment>
      }
      page1Description={
        <Fragment>
          <span className="landing-text108 thq-body-small">
            Learn about our chat features
          </span>
        </Fragment>
      }
      page2Description={
        <Fragment>
          <span className="landing-text109 thq-body-small">
            Choose the best plan
          </span>
        </Fragment>
      }
      link3={
        <Fragment>
          <span className="landing-text110 thq-link thq-body-small">
            My List
          </span>
        </Fragment>
      }
      page3={
        <Fragment>
          <span className="landing-text111 thq-body-large">Contact</span>
        </Fragment>
      }
      page3Description={
        <Fragment>
          <span className="landing-text112 thq-body-small">
            Reach out to us
          </span>
        </Fragment>
      }
      action2={
        <Fragment>
          <span className="landing-text113">Learn More</span>
        </Fragment>
      }
    ></Navbar8> */}

        <div style={containerStyle}>
          {categories.map((category, index) => (
            <div key={index} style={sectionStyle}>
              <h2 style={titleStyle}>{category.title}</h2>
              <div style={movieListStyle}>
                {movies[index]?.map((movie) => (
                  <div key={movie.dynamicID} style={movieCardStyle}>
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
            onClick={() => handleShareOrRequestClick()}
            style={menuItemStyle}
          >
            <ReplyIcon style={iconStyle} />
            Share
          </MenuItem>
          <MenuItem
            onClick={() => handleShareOrRequestClick()}
            style={menuItemStyle}
          >
            <RecommendIcon style={iconStyle} />
            Recommend
          </MenuItem>
          {user.age < 18 ? (
            <MenuItem
              onClick={() => { handleShareOrRequestClick(); }}
              style={menuItemStyle}
            >
              <PlayCircleOutlineIcon style={iconStyle} />
              Request
            </MenuItem>
          ) : null}
        </Menu>

        {showBottomAppBar && <BottomAppBar />}

        <CTA26
          heading1={<Fragment>
            <span className="landing-text124 thq-heading-1">
              Get Started with create Group
            </span>
          </Fragment>}
          content1={<Fragment>
            <span className="landing-text125 thq-body-large">
              Start chatting with your loved ones.
            </span>
          </Fragment>}
          action1={<Fragment>
            <span className="landing-text126">Create Group</span>
          </Fragment>}
        >
        </CTA26>

        <Footer
          title={<Fragment>
            <span className="landing-text132 thq-body-small">
              Connect with us
            </span>
          </Fragment>}
        >
        </Footer>
      </div>
    </>
  );
};

export default Landing;