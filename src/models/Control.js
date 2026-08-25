const mongoose = require('mongoose');

const controlSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ['Technical', 'Administrative', 'Physical', 'Detective'],
      required: true
    },
    effectiveness: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      description: 'Effectiveness on scale 0 to 1'
    },
    mfaStatus: {
      type: Boolean,
      default: false
    },
    patchStatus: {
      type: Boolean,
      default: false
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset'
    },
    vulnerability: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vulnerability'
    },
    implementationDate: {
      type: Date,
      required: true
    },
    lastAuditDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Implemented', 'Partial', 'Planned', 'Not Implemented'],
      default: 'Implemented'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Control', controlSchema);