const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Room = require('./../models/roomModel.cjs');

dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(()=> console.log('DB connection succesfull'));

const Rooms = JSON.parse(fs.readFileSync(`${__dirname}/rooms.json`, 'utf-8'));

const importData = async () => {
  try {
    await Room.create(Rooms);
    console.log('data successfully loaded');
  }catch(err) {
    console.log(err);
  }
  process.exit();
}

const deleteData = async () => {
  try {
    await Room.deleteMany();
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