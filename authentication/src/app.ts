import express from 'express';
import authRoutes from './routes/authRoutes';
import { setupDatabase, pool } from './config/database';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/auth', authRoutes);

async function startServer() {
  try {
    await setupDatabase();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  pool.end();
  process.exit(0);
});
