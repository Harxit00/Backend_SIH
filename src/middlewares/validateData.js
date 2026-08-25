const Joi = require('joi');

const assetSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  assetValue: Joi.number().min(0).required(),
  criticality: Joi.string().valid('Critical', 'High', 'Medium', 'Low'),
  category: Joi.string().valid('Hardware', 'Software', 'Data', 'Personnel', 'Infrastructure').required(),
  owner: Joi.string().allow(''),
  location: Joi.string().allow(''),
  status: Joi.string().valid('Active', 'Inactive', 'Deprecating')
});

const vulnerabilitySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  cvssScore: Joi.number().min(0).max(10).required(),
  cvssVector: Joi.string().allow(''),
  severity: Joi.string().valid('Critical', 'High', 'Medium', 'Low', 'Info').required(),
  asset: Joi.string().required(),
  cveId: Joi.string().allow(''),
  discoveryDate: Joi.date().required(),
  status: Joi.string().valid('Open', 'In Progress', 'Remediated', 'Accepted'),
  remediationDueDate: Joi.date()
});

const controlSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  type: Joi.string().valid('Technical', 'Administrative', 'Physical', 'Detective').required(),
  effectiveness: Joi.number().min(0).max(1).required(),
  mfaStatus: Joi.boolean(),
  patchStatus: Joi.boolean(),
  asset: Joi.string(),
  vulnerability: Joi.string(),
  implementationDate: Joi.date().required(),
  lastAuditDate: Joi.date(),
  status: Joi.string().valid('Implemented', 'Partial', 'Planned', 'Not Implemented')
});

exports.validateAsset = (data) => assetSchema.validate(data, { abortEarly: false });
exports.validateVulnerability = (data) => vulnerabilitySchema.validate(data, { abortEarly: false });
exports.validateControl = (data) => controlSchema.validate(data, { abortEarly: false });