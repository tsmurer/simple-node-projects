import * as dotenv from 'dotenv';

dotenv.config();

export const {
    APP_PORT,
    APP_HOST,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DBNAME,
    MONGO_COLLECTION,
    MONGO_INITDB_USERNAME,
    MONGO_INITDB_PASSWORD,
    MONGO_INITDB_DATABASE,
} = process.env;


