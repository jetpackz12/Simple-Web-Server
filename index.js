const express = require('express');
const app = express();
const path = require('path');
const { log } = require('console');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './pages/index.html'));
});

app.get('/about', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './pages/about.html'));
});

app.get('/contact', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './pages/contact.html'));
});

app.get('*', (req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, './pages/404.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => log(`Server startig on port: ${PORT}`));