import React, { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLS = localStorage.getItem('contacts');
    if (contactsFromLS) {
      this.setState({ contacts: JSON.parse(contactsFromLS) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = name => {
    if (this.state.contacts.find(item => item.name === name.name)) {
      // eslint-disable-next-line no-alert
      alert(`${name.name} is already in contacts`);
      return;
    }

    const contactToAdd = {
      ...name,
      id: shortid.generate(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactToAdd],
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = filterContacts(contacts, filter);

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length >= 2 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
