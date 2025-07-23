import SyncLog from '../models/SyncLog.js';

export const getLogs = async (req, res) => {
    const logs = await SyncLog.find().sort({ timestamp: -1 }).limit(20);
    res.json(logs);
};

export default getLogs;