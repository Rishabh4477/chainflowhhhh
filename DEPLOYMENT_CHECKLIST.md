# ✅ Render Deployment Checklist

Use this checklist to ensure smooth deployment to Render.

## Before Deployment

### 1. Code Preparation
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub (main branch)
- [ ] `.gitignore` includes `.env` files
- [ ] `render.yaml` is in repository root
- [ ] Frontend uses environment variable for API URL
- [ ] Backend has health check endpoint (`/api/health`)

### 2. MongoDB Atlas Setup
- [ ] MongoDB Atlas account created
- [ ] Free cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 for development)
- [ ] Connection string copied and password replaced
- [ ] Connection string tested locally

### 3. Environment Variables Ready
- [ ] JWT_SECRET generated (32+ character random string)
- [ ] MongoDB connection string ready
- [ ] All required environment variables documented

---

## Deployment Steps

### Backend Deployment
- [ ] Created Web Service on Render
- [ ] Selected correct GitHub repository
- [ ] Set Root Directory to `backend`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Added all environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `JWT_EXPIRE=7d`
- [ ] Deployment successful
- [ ] Health check works: `https://YOUR-BACKEND.onrender.com/api/health`
- [ ] Backend URL copied for frontend configuration

### Frontend Deployment
- [ ] Created Static Site on Render
- [ ] Selected correct GitHub repository
- [ ] Set Root Directory to `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`
- [ ] Added environment variable:
  - [ ] `VITE_API_URL` (your backend URL)
- [ ] Deployment successful
- [ ] Frontend loads correctly
- [ ] Frontend URL copied for backend CORS

### Backend CORS Update
- [ ] Returned to backend service on Render
- [ ] Added/updated `CLIENT_URL` environment variable with frontend URL
- [ ] Backend automatically redeployed
- [ ] CORS configuration working

---

## Post-Deployment Testing

### API Tests
- [ ] Health endpoint: `GET https://YOUR-BACKEND.onrender.com/api/health`
- [ ] Registration: Can create new user account
- [ ] Login: Can log in with created account
- [ ] Protected routes: JWT authentication working

### Frontend Tests
- [ ] Frontend loads without errors
- [ ] Can navigate between pages
- [ ] Can sign up for new account
- [ ] Can log in successfully
- [ ] Dashboard displays data
- [ ] API calls work correctly

### Integration Tests
- [ ] Frontend successfully connects to backend
- [ ] Authentication flow works end-to-end
- [ ] Data persists in MongoDB
- [ ] No CORS errors in browser console

---

## Troubleshooting

### If Backend Won't Start:
1. Check logs in Render dashboard
2. Verify MongoDB connection string
3. Ensure all environment variables are set
4. Check MongoDB Atlas network access settings

### If Frontend Can't Connect:
1. Check browser console for errors
2. Verify `VITE_API_URL` is correct
3. Check backend CORS settings
4. Ensure backend `CLIENT_URL` matches frontend URL

### If Services Are Slow:
- Free tier services spin down after 15 min inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading to paid tier for always-on services

---

## URLs to Save

After deployment, save these URLs:

- **Frontend**: https://______________________.onrender.com
- **Backend**: https://______________________.onrender.com
- **MongoDB**: mongodb+srv://______________________

---

## Next Steps

- [ ] Share frontend URL with users
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring/alerts
- [ ] Document API endpoints
- [ ] Set up CI/CD pipeline (optional)
- [ ] Plan for scaling (if needed)

---

## Environment Variables Reference

### Backend (Web Service)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/chainflow
JWT_SECRET=generate-a-32-character-random-string
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend.onrender.com
```

### Frontend (Static Site)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Important Reminders

⚠️ **Security**
- Never commit `.env` files to Git
- Use strong passwords for MongoDB
- Generate secure JWT secrets
- Regularly rotate secrets in production

⚠️ **Free Tier**
- Services spin down after 15 minutes
- 750 hours/month runtime limit
- Consider upgrading for production use

⚠️ **Maintenance**
- Render auto-deploys on Git push
- Monitor application logs regularly
- Keep dependencies updated
- Backup MongoDB data regularly

---

**🎉 Once all items are checked, your application is live!**
