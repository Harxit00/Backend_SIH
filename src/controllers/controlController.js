const Control = require('../models/Control');
const { validateControl } = require('../middlewares/validateData');

// Get all controls
exports.getAllControls = async (req, res, next) => {
  try {
    const controls = await Control.find().populate('asset').populate('vulnerability');
    res.status(200).json({
      success: true,
      count: controls.length,
      data: controls
    });
  } catch (error) {
    next(error);
  }
};

// Get control by ID
exports.getControlById = async (req, res, next) => {
  try {
    const control = await Control.findById(req.params.id).populate('asset').populate('vulnerability');
    if (!control) {
      return res.status(404).json({ error: 'Control not found' });
    }
    res.status(200).json({
      success: true,
      data: control
    });
  } catch (error) {
    next(error);
  }
};

// Create control
exports.createControl = async (req, res, next) => {
  try {
    const { error, value } = validateControl(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const control = new Control(value);
    await control.save();
    await control.populate('asset').populate('vulnerability');

    res.status(201).json({
      success: true,
      message: 'Control created successfully',
      data: control
    });
  } catch (error) {
    next(error);
  }
};

// Update control
exports.updateControl = async (req, res, next) => {
  try {
    const control = await Control.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('asset').populate('vulnerability');

    if (!control) {
      return res.status(404).json({ error: 'Control not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Control updated successfully',
      data: control
    });
  } catch (error) {
    next(error);
  }
};

// Delete control
exports.deleteControl = async (req, res, next) => {
  try {
    const control = await Control.findByIdAndDelete(req.params.id);

    if (!control) {
      return res.status(404).json({ error: 'Control not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Control deleted successfully',
      data: control
    });
  } catch (error) {
    next(error);
  }
};