import React from 'react';
import css from './Input.module.css';
import PropTypes from 'prop-types';

const Input = ({ inputUsersName }) => {
  return (
    <input
      className={css.userName}
      type="text"
      name={inputUsersName}
      pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
    />
  );
};

Input.propTypes = {
  inputUsersName: PropTypes.string.isRequired,
};

export default Input;
