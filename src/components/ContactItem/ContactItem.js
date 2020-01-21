import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ name, number, onDelete }) => (
  <>
    <span>
      {name}: {number}
    </span>
    <button type="button" onClick={onDelete}>
      Delete
    </button>
  </>
);

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactItem;
