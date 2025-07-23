import { LocalData, CloudData } from '../models/Data.js';
import SyncLog from '../models/SyncLog.js';
import { resolveConflict } from '../utils/conflictResolver.js';

global.lastSyncTime = new Date(0);

export const syncData = async (direction = 'both') => {
    let summary = { updatedLocal: 0, updatedCloud: 0 };

    try {
        if (direction === 'localToCloud' || direction === 'both') {
            const localChanges = await LocalData.find({ lastModified: { $gt: global.lastSyncTime } });
            for (const doc of localChanges) {
                const cloudDoc = await CloudData.findById(doc._id);
                if (!cloudDoc) {
                    await CloudData.findByIdAndUpdate(doc._id, doc, { upsert: true });
                    summary.updatedCloud++;
                } else if (cloudDoc.lastModified < doc.lastModified) {
                    const merged = resolveConflict(doc, cloudDoc, 'fieldBased');
                    await CloudData.findByIdAndUpdate(doc._id, merged, { upsert: true });
                    summary.updatedCloud++;
                }
            }
        }

        if (direction === 'cloudToLocal' || direction === 'both') {
            const cloudChanges = await CloudData.find({ lastModified: { $gt: global.lastSyncTime } });
            for (const doc of cloudChanges) {
                const localDoc = await LocalData.findById(doc._id);
                if (!localDoc) {
                    await LocalData.findByIdAndUpdate(doc._id, doc, { upsert: true });
                    summary.updatedLocal++;
                } else if (localDoc.lastModified < doc.lastModified) {
                    const merged = resolveConflict(localDoc, doc, 'fieldBased');
                    await LocalData.findByIdAndUpdate(doc._id, merged, { upsert: true });
                    summary.updatedLocal++;
                }
            }
        }

        global.lastSyncTime = new Date();
        await SyncLog.create({ direction, status: 'success', details: summary });
        console.log(`Sync completed: ${JSON.stringify(summary)}`);
    } catch (error) {
        await SyncLog.create({ direction, status: 'error', details: { message: error.message } });
        console.error('Sync error', error);
    }
}



