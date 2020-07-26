import React from 'react';

import styles from './CustomForm.module.scss';

const CustomForm = ({ status, onValidated }) => {
  let email;
  const submit = (e) => {
    e.preventDefault();
    const emailValue = Object.assign({}, email);

    // document.querySelector(`.${styles.newsInput}`).value = '';

    return onValidated({
      EMAIL: emailValue.value,
    });
  };

  return (
    <form>
      <legend>
        <i className="far fa-paper-plane"></i>
        <h3>Want some Inbox love?</h3>
      </legend>
      <input
        className={styles.newsInput}
        ref={(node) => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <button className={`button ${styles.newsBtn}`} onClick={submit}>
        Submit
      </button>
      <div>
        {status === 'sending' && <p>sending...</p>}
        {status === 'error' && (
          <p style={{ color: 'red' }}>Something went wrong, try again</p>
        )}
        {status === 'success' && <p>Success</p>}
      </div>
    </form>
  );
};

export default CustomForm;
