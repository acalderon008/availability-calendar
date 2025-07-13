# Deployment Guide for Availability Calendar

This guide will help you deploy both the frontend and backend of your Availability Calendar application.

## Current Setup

- **Frontend**: Deployed to GitHub Pages at `https://acalderon008.github.io/availability-calendar`
- **Backend**: Needs to be deployed to a hosting service

## Backend Deployment Options

### Option 1: Render (Recommended - Free Tier Available)

1. **Sign up** at [render.com](https://render.com)
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure the service**:
   - **Name**: `availability-calendar-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: Leave empty (root of repo)

5. **Add Environment Variables** (if needed):
   - `NODE_ENV`: `production`

6. **Deploy** and get your URL (e.g., `https://your-app-name.onrender.com`)

### Option 2: Railway (Free Tier Available)

1. **Sign up** at [railway.app](https://railway.app)
2. **Create a new project**
3. **Connect your GitHub repository**
4. **Deploy** and get your URL

### Option 3: Heroku (Paid)

1. **Sign up** at [heroku.com](https://heroku.com)
2. **Create a new app**
3. **Connect your GitHub repository**
4. **Deploy** and get your URL

### Option 4: Vercel (Free Tier Available)

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import your GitHub repository**
3. **Configure** as a Node.js project
4. **Deploy** and get your URL

## Frontend Configuration

Once you have your backend deployed, update the API configuration:

1. **Open** `client/src/utils/api.js`
2. **Find** the `getBaseURL()` function
3. **Uncomment** the appropriate line for your hosting service
4. **Replace** `your-app-name` with your actual app name

Example for Render:
```javascript
// In production, use your deployed backend URL
return 'https://your-app-name.onrender.com';
```

## Testing the Connection

1. **Deploy your backend** using one of the options above
2. **Update the API configuration** in the frontend
3. **Commit and push** the changes to trigger a new frontend deployment
4. **Test** by creating a new calendar on your live site

## Important Notes

### CORS Configuration
The backend already has CORS enabled, so it should work with your frontend domain.

### Data Persistence
Currently, the backend uses in-memory storage. This means:
- Data is lost when the server restarts
- Data is not shared between multiple server instances

For production use, consider adding a database (MongoDB, PostgreSQL, etc.).

### Environment Variables
You may need to set environment variables for:
- Database connections
- API keys
- Port configuration

## Troubleshooting

### Frontend Can't Connect to Backend
1. **Check** the backend URL in `client/src/utils/api.js`
2. **Verify** the backend is running and accessible
3. **Check** browser console for CORS errors
4. **Ensure** the backend URL is correct and includes `https://`

### Backend Deployment Issues
1. **Check** the build logs in your hosting service
2. **Verify** all dependencies are in `package.json`
3. **Ensure** the start command is correct (`npm start`)
4. **Check** that the port is configured correctly

### GitHub Pages Issues
1. **Verify** the deployment workflow completed successfully
2. **Check** that the `gh-pages` branch was created
3. **Ensure** GitHub Pages is configured to deploy from `gh-pages` branch

## Next Steps

1. **Deploy your backend** using one of the options above
2. **Update the API configuration** with your backend URL
3. **Test the full application** on your live site
4. **Consider adding a database** for persistent data storage
5. **Set up monitoring** and error tracking

## Support

If you encounter issues:
1. **Check** the deployment logs
2. **Verify** all configuration settings
3. **Test** locally first
4. **Check** browser console for errors 