const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employees');
const gifRoutes = require('./routes/gifs');
const articleRoutes = require('./routes/articles');
const feedRoutes = require('./routes/feeds');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Nothing to do here!');
});

app.get('/api/v1/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to TeamWork API v1',
  });
});

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/feed', feedRoutes);
app.use('/api/v1/auth', employeeRoutes);
app.use('/api/v1/gifs', gifRoutes);
app.use('/api/v1/articles', articleRoutes);

module.exports = app;
