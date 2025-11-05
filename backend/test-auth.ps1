# Test Signup
Write-Host "Testing Signup..." -ForegroundColor Cyan
$signupData = @{
    name = "Test User"
    email = "test@example.com"
    password = "test123456"
    company = "Test Company"
    role = "viewer"
} | ConvertTo-Json

$signupResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $signupData -ContentType "application/json"
Write-Host "✅ Signup successful!" -ForegroundColor Green
Write-Host "Token: $($signupResponse.token)"
Write-Host "User: $($signupResponse.user | ConvertTo-Json)"

# Test Login
Write-Host "`nTesting Login..." -ForegroundColor Cyan
$loginData = @{
    email = "test@example.com"
    password = "test123456"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginData -ContentType "application/json"
Write-Host "✅ Login successful!" -ForegroundColor Green
Write-Host "Token: $($loginResponse.token)"
Write-Host "User: $($loginResponse.user | ConvertTo-Json)"
