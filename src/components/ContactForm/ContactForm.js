import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (name === '' || number === '') return;
    this.props.onAddContact({ ...this.state });

    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <form className={styles.contactForm} onSubmit={this.handleSubmit}>
          <p>
            <label htmlFor="true">
              <span className={styles.label}>Name</span>
              <input
                className={styles.inputName}
                name="name"
                type="text"
                onChange={this.handleChange}
                value={name}
              />
            </label>
          </p>
          <p>
            <label htmlFor="true">
              <span className={styles.label}>Number</span>
              <input
                className={styles.inputNumber}
                name="number"
                type="tel"
                onChange={this.handleChange}
                value={number}
              />
            </label>
          </p>
          <button type="submit" className={styles.formBtn}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}
