const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Testimon = require('./../models/testimonModel.cjs');

dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(()=> console.log('DB connection succesfull'));

//read json file
const Testimonies = JSON.parse(fs.readFileSync(`${__dirname}/testimonies.json`, 'utf-8'));

//import data into DB
const importData = async () => {
  try {
    await Testimon.create(Testimonies);
    console.log('data successfully loaded');
  }catch(err) {
    console.log(err);
  }
  process.exit();
}

//delete all data from DB
const deleteData = async () => {
  try {
    await Testimon.deleteMany();
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