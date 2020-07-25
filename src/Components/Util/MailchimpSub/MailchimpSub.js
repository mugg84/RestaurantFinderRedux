import React, { useState } from 'react';
import PropTypes from 'prop-types';
import jsonp from 'jsonp';
import toQueryString from 'to-querystring';
import CustomForm from '../CustomForm/CustomForm';

let MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL;

const MailchimpSubscribe = ({ render }) => {
  const [status, setStatus] = useState(null);

  const subscribe = (data) => {
    const params = toQueryString(data);
    const url = MAILCHIMP_URL + '&' + params;

    setStatus('sending');

    jsonp(
      url,
      {
        param: 'c',
      },
      (err, data) => {
        if (err) {
          console.log(err);
          setStatus(err);
        } else if (data.result !== 'success') {
          console.log(data.result);
          setStatus(data.result);
        } else {
          setStatus('success');
        }
      }
    );

    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  return render({
    subscribe: subscribe,
    status: status,
  });
};

MailchimpSubscribe.propTypes = {
  render: PropTypes.func,
};

MailchimpSubscribe.defaultProps = {
  render: ({ subscribe, status, message }) => (
    <CustomForm
      status={status}
      message={message}
      onSubmitted={(formData) => subscribe(formData)}
    />
  ),
};

export default MailchimpSubscribe;
