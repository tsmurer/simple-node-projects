import * as dotenv from 'dotenv';

dotenv.config();

export const {
    APP_PORT,
    APP_HOST,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DBNAME,
    MONGO_COLLECTION,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
} = process.env;


//export const DATABASE_URL = `mongodb://mongo:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;