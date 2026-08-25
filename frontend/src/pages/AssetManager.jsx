import { useState, useEffect } from 'react'
import axios from 'axios'

const AssetManager = () => {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assetValue: '',
    criticality: 'Medium',
    category: 'Hardware',
    owner: '',
    location: '',
    status: 'Active'
  })
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5001/api/assets')
      setAssets(response.data.data)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to fetch assets' })
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
    try {
      await axios.post('http://localhost:5001/api/assets', formData)
      setMessage({ type: 'success', text: '✅ Asset created successfully!' })
      setFormData({
        name: '',
        description: '',
        assetValue: '',
        criticality: 'Medium',
        category: 'Hardware',
        owner: '',
        location: '',
        status: 'Active'
      })
      setShowForm(false)
      fetchAssets()
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Failed to create asset' })
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await axios.delete(`http://localhost:5001/api/assets/${id}`)
        setMessage({ type: 'success', text: '✅ Asset deleted successfully!' })
        fetchAssets()
      } catch (err) {
        setMessage({ type: 'error', text: '❌ Failed to delete asset' })
      }
    }
  }

  if (loading) return <div className="card">Loading assets...</div>

  return (
    <div>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📦 Asset Manager</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ Add Asset'}
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
                <label>Asset Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Database Server"
                />
              </div>
              <div className="form-group">
                <label>Asset Value *</label>
                <input
                  type="number"
                  name="assetValue"
                  value={formData.assetValue}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 500000"
                />
              </div>
              <div className="form-group">
                <label>Criticality</label>
                <select name="criticality" value={formData.criticality} onChange={handleInputChange}>
                  <option>Critical</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option>Hardware</option>
                  <option>Software</option>
                  <option>Data</option>
                  <option>Personnel</option>
                  <option>Infrastructure</option>
                </select>
              </div>
              <div className="form-group">
                <label>Owner</label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  placeholder="e.g., IT Department"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Data Center A"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Asset description"
              />
            </div>
            <button type="submit" className="btn btn-success">💾 Create Asset</button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Value</th>
                <th>Criticality</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr key={asset._id}>
                  <td>{asset.name}</td>
                  <td>{asset.category}</td>
                  <td>₹{asset.assetValue}</td>
                  <td><span className={`badge badge-${asset.criticality.toLowerCase()}`}>{asset.criticality}</span></td>
                  <td>{asset.status}</td>
                  <td>{asset.owner || '-'}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(asset._id)}>🗑️</button>
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

export default AssetManager