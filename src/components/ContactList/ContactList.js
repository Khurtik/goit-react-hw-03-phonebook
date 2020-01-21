import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    contacts.length > 0 && (
      <ul className={styles.contacts}>
        {contacts.map(item => (
          <li className={styles.contactItem} key={item.id}>
            <ContactItem
              name={item.name}
              number={item.number}
              onDelete={() => onDelete(item.id)}
            />
          </li>
        ))}
      </ul>
    )
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
