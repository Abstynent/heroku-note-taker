const express = require('express');
const notes = require('./notes');

const app = express();

// Use /notes for any notes calls
app.use('/notes', notes);

module.exports = app;