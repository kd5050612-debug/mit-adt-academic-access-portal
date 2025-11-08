# MIT ADT 3D Academic Portal - Running Commands

## Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed.

## Step 1: Install Dependencies
First, install all required packages:
```bash
npm install --legacy-peer-deps
```

**Important**: Use `--legacy-peer-deps` flag due to dependency conflicts between packages.

## Step 2: Development Mode (Recommended for Development)
Run the development server with Turbopack:
```bash
npm run dev
```
This will start the server at `http://localhost:3000`

## Step 3: Production Build (For Deployment)
Build the production version:
```bash
npm run build
```

## Step 4: Start Production Server
After building, start the production server:
```bash
npm start
```

## Additional Commands

### Run Linter
Check for code issues:
```bash
npm run lint
```

## Quick Start (All-in-One)
```bash
# Install dependencies (use --legacy-peer-deps for dependency conflicts)
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Then open your browser and navigate to: **http://localhost:3000**

## Notes
- Development server uses Turbopack for faster builds
- The app will automatically reload when you make changes
- TypeScript errors are ignored during build (as configured in next.config.ts)
- Make sure all environment variables are set up if required

