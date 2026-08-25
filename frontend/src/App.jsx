import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import AssetManager from './pages/AssetManager'
import VulnerabilityManager from './pages/VulnerabilityManager'
import ControlManager from './pages/ControlManager'
import RiskCalculator from './pages/RiskCalculator'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if backend is running
    fetch('http://localhost:5001/health')
      .then(res => res.json())
      .then(() => setLoading(false))
      .catch(() => {
        alert('❌ Backend is not running! Please start the server on port 5001')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Checking Backend Connection...</p>
      </div>
    )
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'assets':
        return <AssetManager />
      case 'vulnerabilities':
        return <VulnerabilityManager />
      case 'controls':
        return <ControlManager />
      case 'risks':
        return <RiskCalculator />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">🛡️ Risk Quantification Dashboard</h1>
          <ul className="nav-menu">
            <li><button className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => setCurrentPage('dashboard')}>📊 Dashboard</button></li>
            <li><button className={currentPage === 'assets' ? 'active' : ''} onClick={() => setCurrentPage('assets')}>📦 Assets</button></li>
            <li><button className={currentPage === 'vulnerabilities' ? 'active' : ''} onClick={() => setCurrentPage('vulnerabilities')}>🔓 Vulnerabilities</button></li>
            <li><button className={currentPage === 'controls' ? 'active' : ''} onClick={() => setCurrentPage('controls')}>🔐 Controls</button></li>
            <li><button className={currentPage === 'risks' ? 'active' : ''} onClick={() => setCurrentPage('risks')}>⚠️ Calculate Risk</button></li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App