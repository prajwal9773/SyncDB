import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cron from 'node-cron';
import connectDB from './config/db.js';
import syncRoutes from './routes/syncRoutes.js';
import logRoutes from './routes/logRoutes.js';
import { syncData } from './services/syncService.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const startServer = async () => {
  await connectDB();  // <-- Wait until DB is connected

  // schedule cron
  let syncConfig = { interval: '*/10 * * * * *', direction: 'both' };
  cron.schedule(syncConfig.interval, () => {
    syncData(syncConfig.direction);
  });

  app.use('/api/sync', syncRoutes);
  app.use('/api/logs', logRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
