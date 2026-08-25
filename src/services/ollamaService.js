const axios = require('axios');

const ollamaAPI = axios.create({
  baseURL: process.env.OLLAMA_API_URL || 'http://localhost:11434',
  timeout: 60000
});

exports.generateResponse = async (prompt) => {
  try {
    const response = await ollamaAPI.post('/api/generate', {
      model: process.env.OLLAMA_MODEL_NAME || 'llama3.2',
      prompt: prompt,
      stream: false
    });
    return response.data.response;
  } catch (error) {
    console.error('❌ Ollama Service Error:', error.message);
    throw new Error(`Ollama Service failed: ${error.message}`);
  }
};