const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();  // Load environment variables


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const app = express();

// CORS Middleware
app.use(cors({
  origin: 'https://sms-frontend-twilio-9ob4.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));

// Twilio credentials from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());


// Endpoint to send SMS

app.post('/send-sms', (req, res) => {
    const { phoneNumber, message } = req.body;
  
    client.messages
      .create({
        body: message,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER
      })
      .then((message) => res.json({ success: true }))
      .catch((error) => res.json({ success: false, error }));
  });

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));