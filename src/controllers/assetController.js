const Asset = require('../models/Asset');
const { validateAsset } = require('../middlewares/validateData');

// Get all assets
exports.getAllAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find();
    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets
    });
  } catch (error) {
    next(error);
  }
};

// Get asset by ID
exports.getAssetById = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json({
      success: true,
      data: asset
    });
  } catch (error) {
    next(error);
  }
};

// Create new asset
exports.createAsset = async (req, res, next) => {
  try {
    const { error, value } = validateAsset(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const asset = new Asset(value);
    await asset.save();

    res.status(201).json({
      success: true,
      message: 'Asset created successfully',
      data: asset
    });
  } catch (error) {
    next(error);
  }
};

// Update asset
exports.updateAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Asset updated successfully',
      data: asset
    });
  } catch (error) {
    next(error);
  }
};

// Delete asset
exports.deleteAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Asset deleted successfully',
      data: asset
    });
  } catch (error) {
    next(error);
  }
};