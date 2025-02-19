const express = require('express');
const morgan = require('morgan');
const roomRouter = require('./routes/roomRouter.cjs');
const testimonRouter = require('./routes/testimonRouter.cjs');
const bookingRouter = require('./routes/bookingRouter.cjs');
const mailRouter = require('./routes/mailRouter.cjs');
const questionRouter = require('./routes/questionRouter.cjs');

const app = express();

if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'));

app.use(express.json()); // middleware
app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use('/api/v1/rooms', roomRouter);

app.use('/api/v1/testimonies', testimonRouter);

app.use('/api/v1/booking', bookingRouter);

app.use('/api/v1/mails', mailRouter);

app.use('/api/v1/questions', questionRouter);


module.exports = app;