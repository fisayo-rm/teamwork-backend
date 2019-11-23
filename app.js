const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Nothing to do here!')
});

app.use('/api/v1/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to TeamWork API v1'
    })
});

module.exports = app;