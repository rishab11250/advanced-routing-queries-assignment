const express = require('express');
const routes = require('./routes/notes.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', routes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;