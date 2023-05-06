const express = require('express');
const router = express.Router();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/send', (req,res) => {
    
  //Get Variables from query string in the search bar
  const { recipient, sender, topic, text } = req.query; 

  //Sendgrid Data Requirements
  const msg = {
      to: recipient, 
      from: sender,
      subject: topic,
      text: text,
  }

  //Send Email
  sgMail.send(msg)
  .then((msg) => console.log(text));
});

// const msg = {
//   to: 'ankitkushawaha1000@gmail.com',
//   from: 'ankitkushawaha1000@gmail.com',
//   subject: 'Bill Payment reminder',
//   text: 'tell me if you got this msg',
//   html: '<h1>Hellow Mr. Satvik! Due date of your bill is in 5 days, please pay as soon as possible </h1>',
// };
// sgMail.send(msg)
// .then((res) => console.log('Email has been sent...'))
// .catch((err) => console.log(err.msg));
