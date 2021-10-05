const express = require('express');
const cors = require('cors');
const app = express();

//Settings
app.set('port', process.env.PORT || '0.0.0.0');
app.set('host', process.env.HOST || '0.0.0.0');

app.use(cors());

app.use(express.json());

//Rutes
app.use('/api/empresa',require('./routes/Empresa'));
app.use('/api/bannerAdmin',require('./routes/AdminBanner'));
app.use('/api/sorteo',require('./routes/Sorteo'));

module.exports = app;   