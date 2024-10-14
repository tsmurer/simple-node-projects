import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_HOST, MONGO_INITDB_DATABASE, MONGO_INITDB_PASSWORD,MONGO_INITDB_USERNAME, MONGO_PORT } from './env-variables';

const connectionString = `mongodb://${MONGO_INITDB_USERNAME}:${MONGO_INITDB_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`;
export const connectToDb = () => {
  console.log(connectionString);
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource:"admin"
  } as ConnectOptions)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.error("Connection failed with Mongoose:", err);
  });
};