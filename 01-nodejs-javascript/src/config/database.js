require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const dbState = [
  { value: 0, label: 'Disconnected' },
  { value: 1, label: 'Connected' },
  { value: 2, label: 'Connecting' },
  { value: 3, label: 'Disconnecting' },
];

const connection = async () => {
  try {
    const uri = process.env.MONGO_DB_URL;
    if (!uri) throw new Error('Missing MONGO_DB_URL');

    mongoose.set('strictQuery', false);
    await mongoose.connect(uri); // mongoose v7 không cần options cũ

    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state).label, 'to database'); // "Connected to database"
  } catch (err) {
    console.error('🔴 Mongo connect error:', err.message);
    throw err;
  }
};

module.exports = connection;
