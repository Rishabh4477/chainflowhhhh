# Generate a secure JWT secret for production use
Write-Host "Generating secure JWT secret..." -ForegroundColor Cyan

$secret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

Write-Host "`n✅ Your JWT Secret:" -ForegroundColor Green
Write-Host $secret -ForegroundColor Yellow
Write-Host "`nUse this value for JWT_SECRET in Render environment variables`n" -ForegroundColor Gray
