import { useState, useEffect } from 'react'
import axios from 'axios'

const RiskCalculator = () => {
  const [assets, setAssets] = useState([])
  const [vulnerabilities, setVulnerabilities] = useState([])
  const [controls, setControls] = useState([])
  const [loading, setLoading] = useState(true)
  const [calculating, setCalculating] = useState(false)
  const [formData, setFormData] = useState({
    assetId: '',
    vulnerabilityId: '',
    controlId: ''
  })
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const assetRes = await axios.get('http://localhost:5000/api/assets')
      const vulnRes = await axios.get('http://localhost:5000/api/vulnerabilities')
      const ctrlRes = await axios.get('http://localhost:5000/api/controls')
      setAssets(assetRes.data.data)
      setVulnerabilities(vulnRes.data.data)
      setControls(ctrlRes.data.data)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to fetch data' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.assetId || !formData.vulnerabilityId) {
      setMessage({ type: 'error', text: 'Please select Asset and Vulnerability' })
      return
    }

    try {
      setCalculating(true)
      const response = await axios.post('http://localhost:5000/api/risks/calculate', formData)
      setResult(response.data.data)
      setMessage({ type: 'success', text: '✅ Risk calculated successfully!' })
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to calculate risk' })
    } finally {
      setCalculating(false)
    }
  }

  if (loading) return <div className="card">Loading...</div>

  return (
    <div>
      <div className="card-header">
        <h2>⚠️ Risk Calculator</h2>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="card">
        <h3>Calculate Risk Score</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div className="form-group">
              <label>Asset *</label>
              <select name="assetId" value={formData.assetId} onChange={handleInputChange} required>
                <option value="">Select an asset</option>
                {assets.map(asset => (
                  <option key={asset._id} value={asset._id}>{asset.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Vulnerability *</label>
              <select name="vulnerabilityId" value={formData.vulnerabilityId} onChange={handleInputChange} required>
                <option value="">Select a vulnerability</option>
                {vulnerabilities.map(vuln => (
                  <option key={vuln._id} value={vuln._id}>{vuln.name} (CVSS: {vuln.cvssScore})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Control (Optional)</label>
              <select name="controlId" value={formData.controlId} onChange={handleInputChange}>
                <option value="">Select a control</option>
                {controls.map(ctrl => (
                  <option key={ctrl._id} value={ctrl._id}>{ctrl.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={calculating}>
            {calculating ? '🔄 Calculating...' : '🚀 Calculate Risk'}
          </button>
        </form>
      </div>

      {result && (
        <div className="card">
          <div className="card-header">
            <h3>📊 Risk Analysis Result</h3>
          </div>
          
          <div className="grid">
            <div className="stat-box">
              <h3>Risk Score</h3>
              <div className="value" style={{ color: '#2563eb' }}>{result.riskScore}/100</div>
            </div>
            <div className="stat-box">
              <h3>Risk Level</h3>
              <div className="value" style={{
                color: result.riskLevel === 'Critical' ? '#dc2626' :
                       result.riskLevel === 'High' ? '#ea580c' :
                       result.riskLevel === 'Medium' ? '#2563eb' : '#16a34a'
              }}>
                {result.riskLevel}
              </div>
            </div>
            <div className="stat-box">
              <h3>Expected Annual Loss</h3>
              <div className="value" style={{ color: '#ea580c' }}>₹{result.expectedAnnualLoss.toFixed(2)}</div>
            </div>
            <div className="stat-box">
              <h3>Probability</h3>
              <div className="value" style={{ color: '#16a34a' }}>{(result.probabilityOfOccurrence * 100).toFixed(0)}%</div>
            </div>
            <div className="stat-box">
              <h3>Impact Value</h3>
              <div className="value" style={{ color: '#2563eb' }}>₹{result.impactValue.toFixed(2)}</div>
            </div>
            <div className="stat-box">
              <h3>Residual Risk</h3>
              <div className="value" style={{ color: '#dc2626' }}>₹{result.residualRisk.toFixed(2)}</div>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '2rem' }}>
            <h3>📌 Recommendation</h3>
            <p>{result.recommendation}</p>
          </div>

          <div className="form-group">
            <h3>📋 Details</h3>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td><strong>Asset:</strong></td>
                  <td>{result.asset.name} (₹{result.asset.assetValue})</td>
                </tr>
                <tr>
                  <td><strong>Vulnerability:</strong></td>
                  <td>{result.vulnerability.name} (CVSS: {result.vulnerability.cvssScore})</td>
                </tr>
                <tr>
                  <td><strong>Control:</strong></td>
                  <td>{result.control?.name || 'No control applied'}</td>
                </tr>
                <tr>
                  <td><strong>Calculated:</strong></td>
                  <td>{new Date(result.calculatedAt).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default RiskCalculator