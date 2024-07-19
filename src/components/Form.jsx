import React, { useEffect, useState } from 'react';
import css from './Form.module.css';
import { nanoid } from 'nanoid';
import Contacts from './Contacts';

const Form = () => {
  const initialContacts = () => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    return savedContacts && savedContacts.length > 0
      ? savedContacts
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
  };

  const [contacts, setContacts] = useState(initialContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');

  const nameLabelID = nanoid();
  const numberLabelID = nanoid();
  const filterLabelID = nanoid();

  // useEffect(() => {
  //   const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (savedContacts && savedContacts.length > 0) {
  //     setContacts(savedContacts);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const duplicateContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicateContact) {
      alert(`${name} is already in your contact list.`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
      setName('');
      setNumber('');
    }
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor={nameLabelID}>Name</label>
      <input
        className={css.userName}
        type="text"
        name={nameLabelID}
        pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleNameChange}
      />
      <label htmlFor={numberLabelID}>Number</label>
      <input
        className={css.userName}
        type="tel"
        name={numberLabelID}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleNumberChange}
      />
      <button type="submit">Submit</button>

      <label htmlFor={filterLabelID} className={css.userName}>
        Search
      </label>
      <input
        className={css.userName}
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      />

      <Contacts
        titleName={'Contacts'}
        contacts={filteredContacts}
        onDelete={handleDelete}
      />
    </form>
  );
};

export default Form;
