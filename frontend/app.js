require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlewares/error');

const { PORT = 3000, BASE_PATH = 'localhost' } = process.env;

const app = express();
app.use(helmet());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log('Connect to MongoDB'));

app.use(router);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} ${BASE_PATH}!`);
});
