const axios = require('axios');

const aiEngineAPI = axios.create({
  baseURL: process.env.AI_ENGINE_API_URL || 'http://localhost:8000',
  timeout: 30000
});

exports.calculateRisk = async (riskData) => {
  try {
    const response = await aiEngineAPI.post('/api/calculate-risk', riskData);
    return response.data;
  } catch (error) {
    console.error('❌ AI Engine Error:', error.message);
    throw new Error(`AI Engine Service failed: ${error.message}`);
  }
};