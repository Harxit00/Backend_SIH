const RiskResult = require('../models/RiskResult');
const Asset = require('../models/Asset');
const Vulnerability = require('../models/Vulnerability');
const aiEngineService = require('../services/aiEngineService');
const { formatDashboardData } = require('../utils/formatDashboardData');

// Calculate risk and send to AI Engine
exports.calculateRisk = async (req, res, next) => {
  try {
    const { assetId, vulnerabilityId, controlId } = req.body;

    // Validate inputs
    if (!assetId || !vulnerabilityId) {
      return res.status(400).json({
        error: 'assetId and vulnerabilityId are required'
      });
    }

    // Fetch data from database
    const asset = await Asset.findById(assetId);
    const vulnerability = await Vulnerability.findById(vulnerabilityId);

    if (!asset || !vulnerability) {
      return res.status(404).json({
        error: 'Asset or Vulnerability not found'
      });
    }

    // Prepare data for AI Engine
    const riskData = {
      asset: asset.toObject(),
      vulnerability: vulnerability.toObject(),
      controlId: controlId || null
    };

    // Send to AI Engine
    const aiResult = await aiEngineService.calculateRisk(riskData);

    // Save risk result to database
    const riskResult = new RiskResult({
      asset: assetId,
      vulnerability: vulnerabilityId,
      control: controlId,
      expectedAnnualLoss: aiResult.expectedAnnualLoss,
      riskScore: aiResult.riskScore,
      riskLevel: aiResult.riskLevel,
      probabilityOfOccurrence: aiResult.probabilityOfOccurrence,
      impactValue: aiResult.impactValue,
      residualRisk: aiResult.residualRisk,
      recommendation: aiResult.recommendation
    });

    await riskResult.save();

    res.status(200).json({
      success: true,
      message: 'Risk calculated successfully',
      data: riskResult
    });
  } catch (error) {
    next(error);
  }
};

// Get all risk results
exports.getAllRisks = async (req, res, next) => {
  try {
    const risks = await RiskResult.find()
      .populate('asset')
      .populate('vulnerability')
      .populate('control');
    
    res.status(200).json({
      success: true,
      count: risks.length,
      data: risks
    });
  } catch (error) {
    next(error);
  }
};

// Get risk by ID
exports.getRiskById = async (req, res, next) => {
  try {
    const risk = await RiskResult.findById(req.params.id)
      .populate('asset')
      .populate('vulnerability')
      .populate('control');

    if (!risk) {
      return res.status(404).json({ error: 'Risk not found' });
    }

    res.status(200).json({
      success: true,
      data: risk
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard data
exports.getDashboard = async (req, res, next) => {
  try {
    const risks = await RiskResult.find()
      .populate('asset')
      .populate('vulnerability')
      .populate('control');
    
    const dashboardData = formatDashboardData(risks);

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    next(error);
  }
};

// Delete risk result
exports.deleteRisk = async (req, res, next) => {
  try {
    const risk = await RiskResult.findByIdAndDelete(req.params.id);

    if (!risk) {
      return res.status(404).json({ error: 'Risk not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Risk deleted successfully',
      data: risk
    });
  } catch (error) {
    next(error);
  }
};