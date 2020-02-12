import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ContactItem from '../ContactItem/ContactItem';
import slideTransition from '../transition/slide.module.css';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <TransitionGroup component="ul" className={styles.contacts}>
      {contacts.length > 0 &&
        contacts.map(item => (
          <CSSTransition
            key={item.id}
            timeout={250}
            unmountOnExit
            classNames={slideTransition}
          >
            <li className={styles.contactItem}>
              <ContactItem
                name={item.name}
                number={item.number}
                onDelete={() => onDelete(item.id)}
              />
            </li>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
