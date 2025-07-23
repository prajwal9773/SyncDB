export const resolveConflict = (localDoc, cloudDoc, strategy = 'fieldBased') => {
    if (strategy === 'cloudWins') return cloudDoc;
    if (strategy === 'localWins') return localDoc;
  
    const merged = { ...localDoc._doc };
    for (const field of Object.keys(cloudDoc._doc)) {
      if (field === '_id') continue;
      const localTime = localDoc.lastModified;
      const cloudTime = cloudDoc.lastModified;
      merged[field] = localTime > cloudTime ? localDoc[field] : cloudDoc[field];
    }
    merged.lastModified = new Date();
    merged.syncVersion = Math.max(localDoc.syncVersion, cloudDoc.syncVersion) + 1;
    return merged;
  };
  