import React, { useState } from 'react';
import './SmsForm.css';
// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendSms = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse('SMS sent successfully!');
        setIsSuccess(true);
      } else {
        setResponse(`Error: ${data.error}`);
        setIsSuccess(false);
      }
    } catch (error) {
      setResponse('An error occurred while sending the SMS.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="sms-container">
      <h1>Send SMS</h1>
      <form onSubmit={handleSendSms}>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          required
        />
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          required
        />
        <button type="submit">Send SMS</button>
      </form>
      {response && <div className={`response ${isSuccess ? 'success' : 'error'}`}>{response}</div>}
    </div>
  );
};

export default App;
