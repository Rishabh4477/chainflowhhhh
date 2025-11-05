# ChainFlow Deployment Guide

## 🚀 Quick Deployment with Docker

### Prerequisites
- Docker Desktop installed and running
- Git (for cloning updates)

### Step 1: Start Docker Desktop
1. Open Docker Desktop from your Start Menu or Applications folder
2. Wait for it to fully start (Docker icon should be green in system tray)

### Step 2: Deploy the Application
Run the deployment script:

**For Windows PowerShell:**
```powershell
.\deploy.ps1
```

**For Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

### Step 3: Access Your Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **Health Check**: http://localhost/api/health

## 📋 Manual Deployment Steps

If you prefer to deploy manually:

1. **Build Docker images:**
   ```bash
   docker-compose build
   ```

2. **Start services:**
   ```bash
   docker-compose up -d
   ```

3. **Check status:**
   ```bash
   docker-compose ps
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

## 🔧 Configuration

### Environment Variables
Edit `.env.production` for production settings:
- `JWT_SECRET`: Change to a secure random string
- `MONGODB_URI`: Update with your production MongoDB URI
- `EMAIL_USER/PASS`: Configure if using email features

### Database
The application uses MongoDB with the following default credentials:
- Username: `admin`
- Password: `password123`
- Database: `chainflow`

**Important**: Change these credentials for production use!

## 🌐 Production Deployment Options

### Option 1: Docker on Cloud Server
1. Rent a VPS (DigitalOcean, AWS EC2, etc.)
2. Install Docker and Docker Compose
3. Clone your repository
4. Run the deployment script
5. Configure domain and SSL certificate

### Option 2: Cloud Platform Services

#### Vercel (Frontend) + Railway/Render (Backend)
1. **Frontend on Vercel:**
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm run build`
   - Set output directory: `frontend/dist`

2. **Backend on Railway/Render:**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables from `.env.production`

#### AWS/Azure/GCP
1. Use container services (ECS, AKS, GKE)
2. Or use PaaS services (Heroku, App Engine)
3. Configure MongoDB Atlas for database
4. Set up CI/CD pipeline

## 🔒 Security Considerations

1. **Change default passwords** for MongoDB
2. **Use strong JWT secret** in production
3. **Enable HTTPS** with SSL certificates
4. **Configure firewall** rules
5. **Set up monitoring** and logging
6. **Regular updates** of dependencies

## 🛠️ Maintenance Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Update application
git pull
docker-compose up -d --build

# Backup database
docker exec chainflow-mongodb mongodump --out /backup
```

## 📊 Monitoring

Check application health:
- API Health: http://localhost/api/health
- Container Status: `docker-compose ps`
- Resource Usage: Docker Desktop dashboard

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts:**
   - Change ports in `docker-compose.yml`
   - Kill processes using ports: `netstat -ano | findstr :5000`

2. **MongoDB connection errors:**
   - Check MongoDB container is running
   - Verify connection string in environment variables

3. **Build failures:**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild: `docker-compose build --no-cache`

4. **Permission errors:**
   - Run PowerShell as Administrator
   - Check Docker Desktop permissions

## 📞 Support

For deployment issues:
1. Check logs: `docker-compose logs`
2. Verify environment variables
3. Ensure Docker Desktop is running
4. Check port availability

---

**🎉 Your ChainFlow application is now ready for production!**
