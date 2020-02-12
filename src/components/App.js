import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';
import Alert from './Notification/Notification.module.css';
import slideTransition from './transition/slide.module.css';
import styles from './App.module.css';
import './styles.css';

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    text: '',
    showingAlert: false,
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
      this.setState({ text: 'Contact already exists!', showingAlert: true });
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
    const { contacts, filter, text, showingAlert } = this.state;

    const filteredContacts = filterContacts(contacts, filter);

    return (
      <div className={styles.containerApp}>
        <CSSTransition
          in={showingAlert}
          timeout={250}
          classNames={Alert}
          onEntered={() =>
            setTimeout(() => {
              this.setState({
                showingAlert: false,
              });
            }, 5000)
          }
          unmountOnExit
        >
          <Notification text={text} />
        </CSSTransition>
        <CSSTransition in timeout={500} classNames="title" appear>
          <h1 className={styles.titleApp}>Phonebook</h1>
        </CSSTransition>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <CSSTransition
          in={contacts.length >= 2}
          timeout={250}
          unmountOnExit
          classNames={slideTransition}
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
