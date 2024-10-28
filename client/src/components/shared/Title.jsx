// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const Title = ({
  title = "FamilyFrame",
  description = "this is the Chat App called",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Title;
