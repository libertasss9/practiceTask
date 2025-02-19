const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./api.cjs');

dotenv.config({ path: './config.env' });

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log('DB connected succsesfull'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on port ${port}`); 
});