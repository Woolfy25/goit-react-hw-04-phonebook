import React from 'react';
import css from './Title.module.css';
import PropTypes from 'prop-types';

const Title = ({ title }) => {
  return <h1 className={css.titlePhonebook}>{title}</h1>;
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
