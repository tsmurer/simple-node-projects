import express from 'express';
import bodyParser from 'body-parser';
import { setupDatabase } from './database';
import todoRoutes from './routes';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Setup database
setupDatabase();

// Routes
app.use('/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
