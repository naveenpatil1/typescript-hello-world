# 🚀 Deployment Guide

This guide shows you how to deploy your Todo app to make it publicly accessible on the internet.

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest) ⭐

Railway offers free hosting with automatic deployments from GitHub.

#### Steps:

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `naveenpatil1/typescript-hello-world`

3. **Configure**
   - Railway will auto-detect your Node.js app
   - It will automatically run `npm install` and `npm start`
   - Your app will be live in ~2 minutes!

4. **Get Your URL**
   - Click on your deployment
   - Go to "Settings" → "Generate Domain"
   - Your app will be live at: `https://your-app-name.up.railway.app`

**That's it!** 🎉 Your app is now publicly accessible.

---

### Option 2: Render (Also Free)

1. **Sign up at [render.com](https://render.com)**
2. **Create New Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `Node`
5. **Deploy!**

Your app will be at: `https://your-app-name.onrender.com`

---

### Option 3: Vercel (Great for Static + Serverless)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from your project directory**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Deploy!

Your app will be at: `https://your-app-name.vercel.app`

---

### Option 4: Heroku (Traditional PaaS)

1. **Install Heroku CLI**
   ```bash
   brew install heroku/brew/heroku  # macOS
   ```

2. **Login and create app**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

Your app will be at: `https://your-app-name.herokuapp.com`

---

## Environment Variables

If your hosting platform asks for environment variables, you only need:

```
PORT=3000  # (Usually auto-detected)
NODE_ENV=production
```

---

## What Each Platform Offers

| Platform | Free Tier | Auto-Deploy | Custom Domain | Best For |
|----------|-----------|-------------|---------------|----------|
| **Railway** | ✅ Yes | ✅ Yes | ✅ Yes | Easiest setup |
| **Render** | ✅ Yes | ✅ Yes | ✅ Yes | Reliable hosting |
| **Vercel** | ✅ Yes | ✅ Yes | ✅ Yes | Fast deploys |
| **Heroku** | ⚠️ Limited | ✅ Yes | ✅ Yes | Traditional |

---

## After Deployment

### Update API URL in Frontend

If your deployment URL is different from localhost, update `public/app.js`:

```javascript
// Change this line:
const API_URL = 'http://localhost:3000/api';

// To:
const API_URL = '/api';  // This will use the same domain
```

Then commit and push:
```bash
git add public/app.js
git commit -m "Update API URL for production"
git push origin main
```

---

## Quick Deploy with Railway (Most Recommended)

The **fastest way** to deploy:

1. Go to: https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select your repo: `typescript-hello-world`
4. Click "Deploy Now"
5. Wait 2 minutes ⏱️
6. Click "Generate Domain" in Settings
7. **Done!** 🎉

Your app is now live and accessible to anyone with the URL!

---

## Testing Your Deployment

Once deployed, test your app:

1. Visit your deployment URL
2. Try adding a todo
3. Try marking it complete
4. Try editing and deleting

---

## Custom Domain (Optional)

All platforms support custom domains:

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In your platform's settings, add custom domain
3. Update DNS records as instructed
4. Your app will be at: `https://yourdomain.com`

---

## Troubleshooting

### App won't start?
- Check logs in your hosting platform
- Ensure `npm start` runs `node dist/server.js`
- Verify TypeScript is in dependencies (not devDependencies)

### Can't access the app?
- Make sure the server is listening on `process.env.PORT`
- Check if health check endpoint is working

### Todos not persisting?
- Free tiers may reset the filesystem
- Consider using a database (MongoDB, PostgreSQL) for production
- Or use Railway's persistent volumes

---

## Monitoring Your App

After deployment, you can:
- View logs in your platform dashboard
- Monitor uptime and performance
- Set up alerts for downtime
- Track visitor analytics

---

## Next Steps

1. **Deploy your app** using Railway (easiest)
2. **Share your URL** with friends and colleagues
3. **Monitor usage** in the platform dashboard
4. **Add a database** for persistent storage (optional)
5. **Add authentication** to make it personal (optional)

---

**Need help?** Check the documentation:
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)

Happy deploying! 🚀
