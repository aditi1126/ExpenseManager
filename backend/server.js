const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./usersModel');
const Expense = require('./expenseModel');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const Userrouter = express.Router(); // instance of express router
const Expenserouter = express.Router();

app.use('/users', Userrouter); // The router will be added as a middleware and will take control of request starting with path /users
app.use('/expenses', Expenserouter);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'expensenotifications@gmail.com',
    pass: 'enrique@1126'
  }
});

mongoose.connect('mongodb://127.0.0.1:27017/users', {
  newURLParser: true
});
const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
  const today = `${new Date().getDate()}${new Date().getMonth()}${new Date().getFullYear()}`;
  console.log('today', today);
  cron.schedule('0 */12 * * *', () => {
    console.log('---------------------');
    console.log('Running Cron Job');
    Expense.find({ expenseType: 'Gave to a friend', notificationDate: today, notificationSent: false }, (err, docs) => {
      if (docs) {
        console.log('docs', docs);
        docs.map((doc) => {
          console.log('doc found', doc);
          const mailOptions = {
            from: 'expensenotifications@gmail.com',
            to: doc.friendEmail,
            subject: `Hi ${doc.friendName} settle up your expenses with a friend`,
            text: `Hi there, this email was automatically sent by us to notify that you owe Rs. ${doc.amount} to ${doc.username}.`
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              throw error;
            } else {
              console.log('Email successfully sent!');
            }
          });
          Expense.findOneAndUpdate({ _id: doc._id }, { $set: { notificationSent: true } }, { new: true }, (err, doc) => {
            if (err) {
              console.log('Something went wrong while updating the key notificationSent in DB');
            }
            console.log('document updated as notification sent', doc);
          });
        });
      } else if (err) console.log('err', err);
    });
  });
});


Userrouter.route('/').get((req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

Expenserouter.route('/').get((req, res) => {
  Expense.find((err, expenses) => {
    if (err) {
      console.log(err);
    } else {
      res.json(expenses);
    }
  });
});

Userrouter.route('/:id').get((req, res) => {
  const { id } = req.params;
  User.findById(id, (err, todo) => {
    res.json(todo);
  });
});

Userrouter.route('/add').post((req, res) => {
  const user = new User(req.body);

  User.countDocuments({ username: req.body.username }, (err, count) => {
    if (count > 0) {
      console.log(`User exists with name ${req.body.username}`);
    } else {
      user.save().then(() => {
        res.status(200).json('user added successfully:');
      }).catch(() => {
        res.status(400).send('adding new user failed');
      });
    }
  });
});

Expenserouter.route('/add').post((req, res) => {
  const expense = new Expense(req.body);
  expense.save().then(() => {
    res.status(200).json('expense added successfully');
  }).catch(() => {
    res.status(400).send('adding new expense failed');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
