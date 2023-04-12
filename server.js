const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true }))

// Use api for any /api calls
app.use('/api', api);

app.use(express.static('public'));

// HTML route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Route not used due to different way of implementing routes, not needed
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// })

// HTML route to load notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} 🚀`)
    );