# Risk Quantification Frontend

React + Vite + JavaScript frontend for AI Risk Quantification System

## Features

✅ **Dashboard** - Real-time risk metrics and visualizations
✅ **Asset Management** - Create, view, and manage assets
✅ **Vulnerability Tracking** - Track and manage vulnerabilities
✅ **Control Management** - Manage security controls
✅ **Risk Calculation** - Calculate risk scores with AI engine
✅ **Data Visualization** - Charts and graphs with Recharts
✅ **Responsive Design** - Works on desktop and mobile

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:5173`

## Build

```bash
npm run build
```

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **Recharts** - Charting library
- **CSS** - Styling

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── AssetManager.jsx
│   │   ├── VulnerabilityManager.jsx
│   │   ├── ControlManager.jsx
│   │   └── RiskCalculator.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Configuration

Make sure backend is running on `http://localhost:5000`

## Usage

1. **Dashboard** - View risk overview and metrics
2. **Assets** - Add and manage assets
3. **Vulnerabilities** - Add vulnerabilities linked to assets
4. **Controls** - Add security controls
5. **Calculate Risk** - Calculate risk scores for asset-vulnerability pairs
