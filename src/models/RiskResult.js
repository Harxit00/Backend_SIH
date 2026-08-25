const mongoose = require('mongoose');

const riskResultSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true
    },
    vulnerability: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vulnerability',
      required: true
    },
    control: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Control'
    },
    expectedAnnualLoss: {
      type: Number,
      required: true,
      min: 0,
      description: 'Calculated Expected Annual Loss (EAL)'
    },
    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    riskLevel: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      required: true
    },
    probabilityOfOccurrence: {
      type: Number,
      min: 0,
      max: 1
    },
    impactValue: {
      type: Number,
      min: 0
    },
    residualRisk: {
      type: Number,
      min: 0
    },
    recommendation: {
      type: String,
      trim: true
    },
    calculatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('RiskResult', riskResultSchema);