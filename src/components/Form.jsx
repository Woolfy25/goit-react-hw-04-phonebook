import React from 'react';
import css from './Form.module.css';
import { nanoid } from 'nanoid';
import Contacts from './Contacts';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      name: '',
      number: '',
      filter: '',
    };
  }
  nameLabelID = nanoid();
  numberLabelID = nanoid();
  filterLabelID = nanoid();

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts && savedContacts.length > 0) {
      this.setState({ contacts: savedContacts });
    }
  }

  // componentDidMount() {
  //   const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (savedContacts && savedContacts.length > 0) {
  //     this.setState({ contacts: [...this.state.contacts, ...savedContacts] });
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ number: event.target.value });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number, contacts } = this.state;

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
      this.setState({
        contacts: [...contacts, newContact],
        name: '',
        number: '',
      });
    }
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label htmlFor={this.nameLabelID}>Name</label>
        <input
          className={css.userName}
          type="text"
          name={this.nameLabelID}
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <label htmlFor={this.numberLabelID}>Number</label>
        <input
          className={css.userName}
          type="tel"
          name={this.numberLabelID}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          onChange={this.handleNumberChange}
        />
        <button type="submit">Submit</button>

        <label htmlFor={this.filterLabelID} className={css.userName}>
          Search
        </label>
        <input
          className={css.userName}
          type="text"
          name="filter"
          value={filter}
          onChange={this.handleFilterChange}
        />

        <Contacts
          titleName={'Contacts'}
          contacts={filteredContacts}
          onDelete={this.handleDelete}
        />
      </form>
    );
  }
}

export default Form;
