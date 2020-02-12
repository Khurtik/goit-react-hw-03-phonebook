import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactItem.module.css';

const ContactItem = ({ name, number, onDelete }) => (
  <>
    <div className={styles.itemBox}>
      <span>
        {name}: {number}
      </span>
      <button type="button" onClick={onDelete} className={styles.itemBtn}>
        <span>&times;</span>
      </button>
    </div>
  </>
);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactItem;
