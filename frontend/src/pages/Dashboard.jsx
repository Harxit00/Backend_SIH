import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:5001/api/risks/dashboard')
      if (response.data.success) {
        setDashboardData(response.data.data)
      }
    } catch (err) {
      setError('Failed to fetch dashboard data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="card">Loading dashboard...</div>
  if (error) return <div className="alert alert-error">{error}</div>
  if (!dashboardData) return <div className="card">No data available</div>

  const { summary, riskDistribution, topRisks } = dashboardData

  const riskDistributionData = [
    { name: 'Critical', value: riskDistribution.Critical, fill: '#dc2626' },
    { name: 'High', value: riskDistribution.High, fill: '#ea580c' },
    { name: 'Medium', value: riskDistribution.Medium, fill: '#2563eb' },
    { name: 'Low', value: riskDistribution.Low, fill: '#16a34a' }
  ]

  return (
    <div>
      <div className="card-header">
        <h2>📊 Risk Dashboard</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid">
        <div className="stat-box">
          <h3>Total Risks</h3>
          <div className="value">{summary.totalRisks}</div>
        </div>
        <div className="stat-box">
          <h3>Critical Risks</h3>
          <div className="value" style={{ color: '#dc2626' }}>{summary.criticalRisks}</div>
        </div>
        <div className="stat-box">
          <h3>Expected Annual Loss</h3>
          <div className="value" style={{ color: '#ea580c' }}>₹{summary.totalExpectedAnnualLoss}</div>
        </div>
        <div className="stat-box">
          <h3>Avg Risk Score</h3>
          <div className="value" style={{ color: '#2563eb' }}>{summary.averageRiskScore}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* Risk Distribution */}
        <div className="card">
          <div className="card-header">
            <h3>Risk Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Levels Bar Chart */}
        <div className="card">
          <div className="card-header">
            <h3>Risk Levels Breakdown</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Risks Table */}
      <div className="card">
        <div className="card-header">
          <h3>🔴 Top Risks</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Vulnerability</th>
                <th>Risk Level</th>
                <th>Risk Score</th>
                <th>Expected Annual Loss</th>
              </tr>
            </thead>
            <tbody>
              {topRisks && topRisks.map((risk, index) => (
                <tr key={index}>
                  <td>{risk.asset}</td>
                  <td>{risk.vulnerability}</td>
                  <td>
                    <span className={`badge badge-${risk.riskLevel.toLowerCase()}`}>
                      {risk.riskLevel}
                    </span>
                  </td>
                  <td>{risk.riskScore}/100</td>
                  <td>₹{risk.eal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard