const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    assetValue: {
      type: Number,
      required: true,
      min: 0
    },
    criticality: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      default: 'Medium'
    },
    category: {
      type: String,
      enum: ['Hardware', 'Software', 'Data', 'Personnel', 'Infrastructure'],
      required: true
    },
    owner: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Deprecating'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Asset', assetSchema);