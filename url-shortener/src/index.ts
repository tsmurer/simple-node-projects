import express from 'express';
import bodyParser from 'body-parser';
import { connectToDb } from './config/database';
import urlsRouter from './routes/url';
import { APP_PORT } from './config/env-variables';

const app = express();
const port = APP_PORT || 3000;


app.use(bodyParser.json);
app.use('/api/urls', urlsRouter);

connectToDb();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
