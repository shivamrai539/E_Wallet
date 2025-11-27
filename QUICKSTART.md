# Quick Start Guide - PayFlow E-Wallet React App

## Step 1: Ensure Backend is Running

Make sure your Tomcat server is running with the Java servlets deployed:
- Tomcat should be accessible at `http://localhost:8686`
- All servlet mappings should be configured in `web.xml`
- MySQL database should be set up with the required tables

## Step 2: Start the React Frontend

1. Open a terminal and navigate to the react-app directory:
```bash
cd react-app
```

2. Install dependencies (first time only):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to:
```
http://localhost:3000
```

## How It Works

The React app runs on port 3000 and proxies all API requests to your Tomcat server on port 8686. This is configured in `vite.config.js`.

When you make a request to `/login` from the React app, it automatically forwards to `http://localhost:8686/login`.

## Available Routes

- `/login` - Login page
- `/signup` - Registration page
- `/dashboard` - Main dashboard (requires authentication)

## Development Workflow

1. Make changes to React components in `src/components/`
2. The browser will automatically reload with your changes
3. Test API interactions with the backend
4. Build for production with `npm run build`

## Troubleshooting

**Problem:** "Failed to load data"
- Make sure Tomcat is running on port 8686
- Check that the database is connected
- Verify servlet mappings in web.xml

**Problem:** CORS errors
- The proxy configuration in vite.config.js should handle this
- Restart the dev server if you made changes to vite.config.js

**Problem:** 401 Unauthorized
- Your session may have expired
- Try logging in again

## Next Steps

- Customize the UI colors and styling in the CSS files
- Add more features to the components
- Deploy the built React app to production
