import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  name: String,
  value: String,
  lastModified: { type: Date, default: Date.now },
  syncVersion: { type: Number, default: 1 }
});

export const LocalData = mongoose.model('LocalData', DataSchema, 'local_data');
export const CloudData = mongoose.model('CloudData', DataSchema, 'cloud_data');
