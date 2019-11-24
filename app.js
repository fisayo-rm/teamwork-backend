const express = require('express');
const employeeRoutes = require('./routes/employees');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Nothing to do here!');
});

app.use('/api/v1/', employeeRoutes);

module.exports = app;
