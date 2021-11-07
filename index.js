require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const getPdfRoute = require('./router/makePdf');
const savePatientRoute = require('./router/patient');

mongoose
    .connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('DB CONNECTED');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use('/pdf', getPdfRoute);
app.use('/api', savePatientRoute);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));
}

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
