import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  return (
    <>
      <span className={styles.filterTitle}>Find contacts by name</span>
      <input
        className={styles.filterInput}
        type="text"
        value={value}
        onChange={onChangeFilter}
      />
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
