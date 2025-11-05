# 🚀 Deploy ChainFlow to Render

This guide will help you deploy both the frontend and backend of your ChainFlow application to Render.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be pushed to GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas** - For production database (free tier available)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create a free account
3. Create a new cluster (select Free tier)
4. Click "Database Access" → Add a new database user
   - Username: `chainflow_user` (or your choice)
   - Password: Generate a secure password
5. Click "Network Access" → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Click "Connect" → "Connect your application"
7. Copy the connection string (it looks like):
   ```
   mongodb+srv://chainflow_user:<password>@cluster0.xxxxx.mongodb.net/chainflow?retryWrites=true&w=majority
   ```
8. Replace `<password>` with your actual password
9. Keep this connection string handy for the next steps

---

## 🔧 Step 2: Push Code to GitHub

1. Make sure all your changes are committed:
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. Verify your repository is up to date on GitHub

---

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Create Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `chainflow-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or your preferred plan)

### 3.2 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add the following:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1 |
| `JWT_SECRET` | Generate a secure random string (e.g., use `openssl rand -base64 32`) |
| `JWT_EXPIRE` | `7d` |
| `CLIENT_URL` | Leave empty for now (we'll update this after frontend deployment) |

**To generate a secure JWT_SECRET on your computer:**
```powershell
# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### 3.3 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for the deployment to complete (5-10 minutes)
3. Once deployed, you'll see a URL like: `https://chainflow-backend.onrender.com`
4. Test your backend:
   - Visit: `https://chainflow-backend.onrender.com/api/health`
   - You should see: `{"status":"OK","message":"Server is running"}`

**⚠️ Important**: Copy your backend URL - you'll need it for the frontend!

---

## 🎨 Step 4: Deploy Frontend to Render

### 4.1 Create Frontend Service

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: `chainflow-frontend`
   - **Region**: Choose the same region as backend
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 4.2 Add Environment Variable

Click **"Advanced"** → **"Add Environment Variable"**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your backend URL from Step 3 (e.g., `https://chainflow-backend.onrender.com`) |

### 4.3 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for deployment (5-10 minutes)
3. Once deployed, you'll get a URL like: `https://chainflow-frontend.onrender.com`

---

## 🔄 Step 5: Update Backend CORS Settings

Now that you have your frontend URL, update your backend:

1. Go to your backend service in Render Dashboard
2. Click **"Environment"** tab
3. Update the `CLIENT_URL` variable:
   - **Value**: Your frontend URL (e.g., `https://chainflow-frontend.onrender.com`)
4. Click **"Save Changes"**
5. The backend will automatically redeploy

---

## 🧪 Step 6: Test Your Deployment

1. Visit your frontend URL: `https://chainflow-frontend.onrender.com`
2. Try to sign up for a new account
3. Try to log in with these credentials:
   - Email: `admin@chainflow.com`
   - Password: `Admin123`

If you need to create the admin account first:
```bash
# Use Render's Shell feature or make a POST request
curl -X POST https://chainflow-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@chainflow.com",
    "password": "Admin123",
    "company": "ChainFlow",
    "role": "admin"
  }'
```

---

## 🎯 Alternative: Use Blueprint (Automated)

Render supports a `render.yaml` file for automated deployment:

1. Make sure `render.yaml` is in your repository root
2. Go to Render Dashboard → **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will detect `render.yaml` and create both services automatically
5. You'll still need to set the environment variables that are marked as `sync: false`

---

## 🔧 Environment Variables Summary

### Backend Environment Variables
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/chainflow
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_URL=https://chainflow-frontend.onrender.com
```

### Frontend Environment Variables
```
VITE_API_URL=https://chainflow-backend.onrender.com
```

---

## 📝 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Backend service is deployed and accessible
- [ ] Frontend service is deployed and accessible
- [ ] Backend health check endpoint works
- [ ] Frontend can connect to backend API
- [ ] Sign up and login functionality works
- [ ] All environment variables are set correctly
- [ ] CORS is configured properly

---

## ⚠️ Important Notes

### Free Tier Limitations

Render's free tier has some limitations:
- **Services spin down after 15 minutes of inactivity**
- First request after spin-down may take 30-60 seconds
- 750 hours/month of runtime (enough for one service)

### Custom Domain (Optional)

To use your own domain:
1. Go to your service settings
2. Click **"Custom Domains"**
3. Add your domain and follow DNS configuration instructions

### Monitoring

Render provides:
- **Logs**: View real-time logs in the dashboard
- **Metrics**: CPU, memory, and bandwidth usage
- **Alerts**: Set up email notifications for deployments

---

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string is correct
- Verify all required environment variables are set
- Check the logs in Render dashboard

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check backend CORS settings include frontend URL
- Ensure backend is deployed and running

### 502 Bad Gateway
- Backend service might be starting up (wait 30-60 seconds)
- Check backend logs for errors
- Verify MongoDB is accessible

### Build Failures
- Check build logs in Render dashboard
- Ensure `package.json` has correct build scripts
- Verify all dependencies are listed in `package.json`

---

## 🔄 Redeployment

Render automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

To manually trigger a deploy:
1. Go to service in Render dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## 💰 Upgrading from Free Tier

For production use, consider upgrading to:
- **Starter Plan ($7/month)**: No spin-down, faster builds
- **Standard Plan ($25/month)**: Better performance, more resources

---

## 📞 Support

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas Support**: [mongodb.com/support](https://www.mongodb.com/support)
- **GitHub Issues**: Create issues in your repository

---

## 🎉 Congratulations!

Your ChainFlow application is now deployed and accessible worldwide! 🌍

**Access your app at:**
- Frontend: `https://chainflow-frontend.onrender.com`
- Backend API: `https://chainflow-backend.onrender.com`

Share your application URL with others and start managing your supply chain!
