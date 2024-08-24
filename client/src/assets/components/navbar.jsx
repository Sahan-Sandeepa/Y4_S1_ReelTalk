// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = (props) => {
  return (
    <header className="navbar-container">
      <header data-thq="thq-navbar" className="navbar-navbar-interactive">
        <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
          <nav className="navbar-links1">
            <Link to={props.link1Url} className="thq-link thq-body-small">
              {props.link1}
            </Link>
            <Link to={props.link2Url} className="thq-link thq-body-small">
              {props.link2}
            </Link>
            <Link to={props.link3Url} className="thq-link thq-body-small">
              {props.link3}
            </Link>
            <Link to={props.link4Url} className="thq-link thq-body-small">
              {props.link4}
            </Link>
            <Link to={props.link5Url} className="thq-link thq-body-small">
              {props.link5}
            </Link>
          </nav>
          <div className="navbar-buttons1">
            <button className="navbar-action11 thq-button-animated thq-button-filled">
              <span className="thq-body-small">{props.action1}</span>
            </button>
            <button className="navbar-action21 thq-button-outline thq-button-animated">
              <span className="thq-body-small">{props.action2}</span>
            </button>
          </div>
        </div>
        <div data-thq="thq-burger-menu" className="navbar-burger-menu">
          <svg viewBox="0 0 1024 1024" className="navbar-icon1">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu" className="navbar-mobile-menu">
          <div className="navbar-nav">
            <div className="navbar-top">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="navbar-logo"
              />
              <div data-thq="thq-close-menu" className="navbar-close-menu">
                <svg viewBox="0 0 1024 1024" className="navbar-icon3">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <nav className="navbar-links2">
              <Link to={props.link1Url} className="thq-link thq-body-small">
                {props.link1}
              </Link>
              <Link to={props.link2Url} className="thq-link thq-body-small">
                {props.link2}
              </Link>
              <Link to={props.link3Url} className="thq-link thq-body-small">
                {props.link3}
              </Link>
              <Link to={props.link4Url} className="thq-link thq-body-small">
                {props.link4}
              </Link>
              <Link to={props.link5Url} className="thq-link thq-body-small">
                {props.link5}
              </Link>
            </nav>
          </div>
          <div className="navbar-buttons2">
            <button className="thq-button-filled">Login</button>
            <button className="thq-button-outline">Register</button>
          </div>
        </div>
      </header>
    </header>
  );
}

Navbar.defaultProps = {
  link1: 'Home',
  link1Url: '/',
  link2: 'Movies',
  link2Url: '/landing',
  link3: 'Features',
  link3Url: '/features',
  link4: 'Pricing',
  link4Url: '/pricing',
  link5: 'Sign In',
  link5Url: '/login',
  logoSrc:
    'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original',
  logoAlt: 'Movie App',
  action1: 'Get Started',
  action2: 'Search',
}

Navbar.propTypes = {
  link1: PropTypes.string,
  link1Url: PropTypes.string,
  link2: PropTypes.string,
  link2Url: PropTypes.string,
  link3: PropTypes.string,
  link3Url: PropTypes.string,
  link4: PropTypes.string,
  link4Url: PropTypes.string,
  link5: PropTypes.string,
  link5Url: PropTypes.string,
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  action1: PropTypes.string,
  action2: PropTypes.string,
}

export default Navbar;
