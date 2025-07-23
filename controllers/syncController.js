import { syncData } from '../services/syncService.js';

export const triggerSync = async (req, res) => {
  const { direction } = req.body;
  await syncData(direction);
  res.json({ status: 'Sync Triggered' });
};
