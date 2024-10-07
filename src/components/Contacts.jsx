import React from 'react';
import css from './Contacts.module.css';
import PropTypes from 'prop-types';

const Contacts = ({ titleName, contacts, onDelete }) => {
  return (
    <div>
      <h2 className={css.contactsTitle}>{titleName}</h2>
      <ul className={css.contactsLists}>
        {contacts.map(contact => (
          <li key={contact.id} className={css.contactsElement}>
            {contact.name}: {contact.number}
            <button
              onClick={() => onDelete(contact.id)}
              className={css.contactDelete}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Contacts.propTypes = {
  titleName: PropTypes.string.isRequired,
};

export default Contacts;
