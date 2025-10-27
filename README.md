# ChainFlow - Supply Chain Management System

A comprehensive supply chain management platform built with React, Node.js, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chainflow
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup Environment Variables**
   ```bash
   cd ../backend
   copy .env.example .env
   ```
   Edit the `.env` file with your MongoDB connection string and other settings.

### Running the Application

#### Option 1: Run Both Services (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

#### Option 2: Run in Production Mode
```bash
# Backend
cd backend
npm start

# Frontend (build and serve)
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
chainflow/
├── backend/                 # Node.js API server
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── server.js           # Main server file
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── layouts/        # Layout components
│   ├── public/             # Static assets
│   └── package.json
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/chainflow

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=30d

# Frontend URL
CLIENT_URL=http://localhost:5173
```

## 🌐 Access Points

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📱 Features

- **Authentication**: JWT-based login/signup with role-based access
- **Dashboard**: Real-time analytics and data visualization
- **Inventory Management**: Track and manage inventory items
- **Supplier Management**: Manage supplier relationships
- **Order Management**: Track orders from creation to delivery
- **Analytics**: Comprehensive reporting and insights

## 🎯 Demo Credentials

For testing purposes, you can use these credentials:

- **Admin**: admin@chainflow.com / Admin123
- **Manager**: manager@chainflow.com / Manager123
- **Viewer**: viewer@chainflow.com / Viewer123

## 🛠️ Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/inventory` - Get inventory items
- `GET /api/suppliers` - Get suppliers
- `GET /api/orders` - Get orders
- `GET /api/analytics` - Get dashboard analytics

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in your .env file

2. **Port Already in Use**
   - Change the PORT in .env file
   - Kill the process using the port

3. **CORS Errors**
   - Ensure CLIENT_URL matches your frontend URL
   - Check that both servers are running

4. **Frontend Build Errors**
   - Clear node_modules and reinstall
   - Check for missing dependencies

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, please contact info@chainflow.com or create an issue in the repository.
