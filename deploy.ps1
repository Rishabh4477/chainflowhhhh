# ChainFlow Deployment Script for PowerShell
Write-Host "🚀 Starting ChainFlow deployment..." -ForegroundColor Green

# Check if Docker is installed
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is installed
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose is not installed. Please install Docker Compose first." -ForegroundColor Red
    exit 1
}

# Build and start services
Write-Host "📦 Building Docker images..." -ForegroundColor Yellow
docker-compose build

Write-Host "🔄 Starting services..." -ForegroundColor Yellow
docker-compose up -d

# Wait for services to be ready
Write-Host "⏳ Waiting for services to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if services are running
Write-Host "🔍 Checking service status..." -ForegroundColor Yellow
docker-compose ps

# Show logs
Write-Host "📋 Showing recent logs..." -ForegroundColor Yellow
docker-compose logs --tail=20

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Application is available at: http://localhost" -ForegroundColor Cyan
Write-Host "🔧 Backend API is available at: http://localhost/api" -ForegroundColor Cyan
Write-Host "📊 Health check: http://localhost/api/health" -ForegroundColor Cyan

Write-Host ""
Write-Host "🛠️ Useful commands:" -ForegroundColor Yellow
Write-Host "  View logs: docker-compose logs -f" -ForegroundColor White
Write-Host "  Stop services: docker-compose down" -ForegroundColor White
Write-Host "  Restart services: docker-compose restart" -ForegroundColor White
Write-Host "  Update application: git pull; docker-compose up -d --build" -ForegroundColor White
