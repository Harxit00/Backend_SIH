# AI Risk Quantification Backend

Backend server for AI-powered risk quantification system using Express.js and MongoDB.

## Project Structure

```
backend/
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
├── server.js               # Entry point
└── src/
    ├── app.js              # Express app setup
    ├── config/             # Database configuration
    ├── models/             # Mongoose schemas
    ├── controllers/        # Business logic
    ├── routes/             # API endpoints
    ├── middlewares/        # Validation & error handling
    ├── services/           # External API calls
    └── utils/              # Helper functions
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure `.env` file with your database URI and API URLs

3. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get asset by ID
- `POST /api/assets` - Create new asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Vulnerabilities
- `GET /api/vulnerabilities` - Get all vulnerabilities
- `GET /api/vulnerabilities/:id` - Get vulnerability by ID
- `POST /api/vulnerabilities` - Create vulnerability
- `PUT /api/vulnerabilities/:id` - Update vulnerability
- `DELETE /api/vulnerabilities/:id` - Delete vulnerability

### Controls
- `GET /api/controls` - Get all controls
- `GET /api/controls/:id` - Get control by ID
- `POST /api/controls` - Create control
- `PUT /api/controls/:id` - Update control
- `DELETE /api/controls/:id` - Delete control

### Risks
- `POST /api/risks/calculate` - Calculate risk using AI engine
- `GET /api/risks` - Get all risks
- `GET /api/risks/:id` - Get risk by ID
- `GET /api/risks/dashboard` - Get dashboard data
- `DELETE /api/risks/:id` - Delete risk

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Validation**: Joi
- **HTTP Client**: Axios
- **Development**: Nodemon
