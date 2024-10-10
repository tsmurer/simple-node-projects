import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_HOST, MONGO_INITDB_DATABASE, MONGO_PORT } from './env-variables';

const connectionString = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`;

export const connectToDb = () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.error("Connection failed with Mongoose:", err);
  });
};