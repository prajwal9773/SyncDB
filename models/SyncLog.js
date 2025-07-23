import mongoose from 'mongoose';

const SyncLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    direction: String,
    status: String,
    details: Object
});

export default mongoose.model('SyncLog', SyncLogSchema, 'sync_logs');
