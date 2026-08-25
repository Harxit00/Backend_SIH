const axios = require('axios');

const aiEngineAPI = axios.create({
  baseURL: process.env.AI_ENGINE_API_URL || 'http://localhost:8000',
  timeout: 30000
});

exports.calculateRisk = async (riskData) => {
  try {
    // अभी के लिए mock response दो
    const mockResult = {
      expectedAnnualLoss: riskData.asset.assetValue * (riskData.vulnerability.cvssScore / 10) * 0.1,
      riskScore: Math.round((riskData.vulnerability.cvssScore * 10)),
      riskLevel: riskData.vulnerability.cvssScore >= 9 ? 'Critical' : 
                 riskData.vulnerability.cvssScore >= 7 ? 'High' : 
                 riskData.vulnerability.cvssScore >= 4 ? 'Medium' : 'Low',
      probabilityOfOccurrence: 0.5,
      impactValue: riskData.asset.assetValue * 0.5,
      residualRisk: riskData.asset.assetValue * 0.1,
      recommendation: 'Implement security controls immediately'
    };
    
    return mockResult;
    
    // असली AI Engine के लिए यह code use करो:
    // const response = await aiEngineAPI.post('/api/calculate-risk', riskData);
    // return response.data;
  } catch (error) {
    console.error('❌ AI Engine Error:', error.message);
    throw new Error(`AI Engine Service failed: ${error.message}`);
  }
};