import { useState, useEffect } from 'react'
import axios from 'axios'

const ControlManager = () => {
  const [controls, setControls] = useState([])
  const [assets, setAssets] = useState([])
  const [vulnerabilities, setVulnerabilities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Technical',
    effectiveness: 0.5,
    mfaStatus: false,
    patchStatus: false,
    asset: '',
    vulnerability: '',
    implementationDate: '',
    lastAuditDate: '',
    status: 'Implemented'
  })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const ctrlRes = await axios.get('http://localhost:5000/api/controls')
      const assetRes = await axios.get('http://localhost:5000/api/assets')
      const vulnRes = await axios.get('http://localhost:5000/api/vulnerabilities')
      setControls(ctrlRes.data.data)
      setAssets(assetRes.data.data)
      setVulnerabilities(vulnRes.data.data)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to fetch data' })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'effectiveness' ? parseFloat(value) : value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/controls', formData)
      setMessage({ type: 'success', text: '✅ Control created!' })
      setFormData({
        name: '',
        description: '',
        type: 'Technical',
        effectiveness: 0.5,
        mfaStatus: false,
        patchStatus: false,
        asset: '',
        vulnerability: '',
        implementationDate: '',
        lastAuditDate: '',
        status: 'Implemented'
      })
      setShowForm(false)
      fetchData()
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to create control' })
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:5000/api/controls/${id}`)
        setMessage({ type: 'success', text: '✅ Control deleted!' })
        fetchData()
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to delete' })
      }
    }
  }

  if (loading) return <div className="card">Loading...</div>

  return (
    <div>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>🔐 Control Manager</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ Add Control'}
        </button>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {showForm && (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="form-group">
                <label>Control Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Web Application Firewall"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  <option>Technical</option>
                  <option>Administrative</option>
                  <option>Physical</option>
                  <option>Detective</option>
                </select>
              </div>
              <div className="form-group">
                <label>Effectiveness (0-1) *</label>
                <input
                  type="number"
                  name="effectiveness"
                  value={formData.effectiveness}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="1"
                  step="0.05"
                />
              </div>
              <div className="form-group">
                <label>Asset</label>
                <select name="asset" value={formData.asset} onChange={handleInputChange}>
                  <option value="">Select an asset</option>
                  {assets.map(asset => (
                    <option key={asset._id} value={asset._id}>{asset.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Implementation Date *</label>
                <input
                  type="datetime-local"
                  name="implementationDate"
                  value={formData.implementationDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Audit Date</label>
                <input
                  type="datetime-local"
                  name="lastAuditDate"
                  value={formData.lastAuditDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="mfaStatus"
                  checked={formData.mfaStatus}
                  onChange={handleInputChange}
                />
                {' '}MFA Enabled
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="patchStatus"
                  checked={formData.patchStatus}
                  onChange={handleInputChange}
                />
                {' '}Patched
              </label>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Control details"
              />
            </div>
            <button type="submit" className="btn btn-success">💾 Create Control</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Effectiveness</th>
                <th>Asset</th>
                <th>Status</th>
                <th>MFA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {controls.map(ctrl => (
                <tr key={ctrl._id}>
                  <td>{ctrl.name}</td>
                  <td>{ctrl.type}</td>
                  <td>{(ctrl.effectiveness * 100).toFixed(0)}%</td>
                  <td>{ctrl.asset?.name || 'N/A'}</td>
                  <td>{ctrl.status}</td>
                  <td>{ctrl.mfaStatus ? '✅' : '❌'}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ctrl._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ControlManager