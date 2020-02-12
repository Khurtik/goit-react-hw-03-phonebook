import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Notification.module.css';

const Notification = ({ text }) => {
  return <div className={Alert.alert}>{text}</div>;
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Notification;
