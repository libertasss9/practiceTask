const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Booking = require('./../models/bookingModel.cjs');

dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(()=> console.log('DB connection succesfull'));

//read json file
const Bookings = JSON.parse(fs.readFileSync(`${__dirname}/booking.json`, 'utf-8'));

// if (Array.isArray(Bookings) && Bookings.length === 0){
//   console.log('The bookings document is empty.');
//   process.exit();
// }
//import data into DB
const importData = async () => {
  try {
    await Booking.create(Bookings);
    console.log('data successfully loaded');
  }catch(err) {
    console.log(err);
  }
  process.exit();
}

//delete all data from DB
const deleteData = async () => {
  try {
    await Booking.deleteMany();
    console.log('data successfully deleted');
  }catch(err) {
    console.log(err);
  }
  process.exit();
}

if (process.argv[2] === '--import')
  importData();
else if (process.argv[2] === '--delete')
  deleteData();

console.log(process.argv);