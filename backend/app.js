const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
require('dotenv').config();

const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors);
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started');
});
