export default {
  SUGGSTIONS: [
    "Create Full-Stack Todo App with Node.js & React",
    "Create E-commerce Store with Next.js & MongoDB",
    "Create Social Media App with Express & React",
    "Create Chat Application with Socket.io",
    "Create RESTful API with Express & PostgreSQL",
    "Create Blog Platform with Next.js & Prisma",
    "Create Authentication System with JWT",
    "Create Real-time Dashboard with WebSockets",
    "Create File Upload Service with Multer",
    "Create GraphQL API with Apollo Server",
    "Create Microservices Architecture",
    "Create Progressive Web App (PWA)",
  ],
  HERO_HEADING: "What do you want to build?",
  HERO_DESC: "Prompt, run, edit, and deploy full-stack web apps with any technology stack.",
  INPUT_PLACEHOLDER: "What you want to build? (Frontend, Backend, or Full-Stack)",
  SIGNIN_HEADING: "Continue With Bolt.New 2.0",
  SIGNIN_SUBHEADING:
    "To use Bolt you must log into an existing account or create one.",
  SIGNIn_AGREEMENT_TEXT:
    "By using Bolt, you agree to the collection of usage data for analytics.",

  DEFAULT_FILE: {
    "/public/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Full-Stack App</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div> 
  </body>
</html>`,
    },
    "/App.css": {
      code: `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}

/* Custom animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Loading spinner */
.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`,
    },
    "/tailwind.config.js": {
      code: `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
      }
    },
  },
  plugins: [],
}`,
    },
    "/postcss.config.js": {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;`,
    },
    "/package.json": {
      code: `{
  "name": "fullstack-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \\"npm run client\\" \\"npm run server\\"",
    "client": "react-scripts start",
    "server": "nodemon server/index.js",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:5000"
}`,
    },
  },
  DEPENDANCY: {
    // ===== FRONTEND DEPENDENCIES =====
    
    // React & Core
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    
    // Next.js (for SSR/SSG)
    "next": "^14.0.0",
    
    // CSS & Styling
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.0",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "clsx": "^2.1.0",
    "styled-components": "^6.1.0",
    "emotion": "^11.0.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    
    // Icons & UI Components
    "lucide-react": "^0.469.0",
    "@heroicons/react": "^2.1.0",
    "react-icons": "^5.0.0",
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "antd": "^5.12.0",
    
    // Routing & Navigation
    "react-router-dom": "^7.1.1",
    "next-router": "^1.3.0",
    
    // State Management
    "zustand": "^4.5.0",
    "redux": "^5.0.0",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "@tanstack/react-query": "^5.17.0",
    "swr": "^2.2.0",
    
    // Forms & Validation
    "react-hook-form": "^7.49.0",
    "formik": "^2.4.0",
    "yup": "^1.4.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    
    // ===== BACKEND DEPENDENCIES =====
    
    // Node.js & Express
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "morgan": "^1.10.0",
    "body-parser": "^1.20.0",
    "cookie-parser": "^1.4.6",
    "express-rate-limit": "^7.1.0",
    
    // Database ORMs & Drivers
    "mongoose": "^8.0.0",
    "mongodb": "^6.3.0",
    "pg": "^8.11.0",
    "mysql2": "^3.7.0",
    "sqlite3": "^5.1.0",
    "prisma": "^5.7.0",
    "@prisma/client": "^5.7.0",
    "sequelize": "^6.35.0",
    "typeorm": "^0.3.0",
    
    // Authentication & Security
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "passport-jwt": "^4.0.1",
    "passport-google-oauth20": "^2.0.0",
    "express-session": "^1.17.0",
    "connect-mongo": "^5.1.0",
    
    // File Upload & Processing
    "multer": "^1.4.5",
    "cloudinary": "^1.41.0",
    "sharp": "^0.33.0",
    "jimp": "^0.22.0",
    
    // Real-time Communication
    "socket.io": "^4.7.0",
    "socket.io-client": "^4.7.0",
    "ws": "^8.16.0",
    
    // GraphQL
    "apollo-server-express": "^3.12.0",
    "graphql": "^16.8.0",
    "@apollo/client": "^3.8.0",
    "graphql-tools": "^9.0.0",
    
    // API & HTTP Clients
    "axios": "^1.6.0",
    "fetch": "^1.1.0",
    "node-fetch": "^3.3.0",
    
    // Utilities & Helpers
    "lodash": "^4.17.21",
    "uuid": "^9.0.0",
    "date-fns": "^4.1.0",
    "moment": "^2.30.0",
    "dayjs": "^1.11.0",
    "validator": "^13.11.0",
    "joi": "^17.11.0",
    
    // Development Tools
    "nodemon": "^3.0.0",
    "concurrently": "^8.2.0",
    "dotenv": "^16.3.0",
    "cross-env": "^7.0.3",
    
    // Testing
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0",
    "supertest": "^6.3.0",
    
    // Charts & Data Visualization
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
    "recharts": "^2.10.0",
    "d3": "^7.8.0",
    "victory": "^37.0.0",
    
    // Animation & Effects
    "framer-motion": "^11.0.0",
    "react-spring": "^9.7.0",
    "lottie-react": "^2.4.0",
    
    // Cloud Services & APIs
    "firebase": "^11.1.0",
    "firebase-admin": "^11.11.0",
    "@google/generative-ai": "^0.21.0",
    "openai": "^4.24.0",
    "stripe": "^14.9.0",
    "nodemailer": "^6.9.0",
    "twilio": "^4.20.0",
    "aws-sdk": "^2.1519.0",
    
    // TypeScript Support
    "typescript": "^5.3.0",
    "@types/node": "^20.10.0",
    "@types/express": "^4.17.0",
    "@types/cors": "^2.8.0",
    "@types/bcryptjs": "^2.4.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/multer": "^1.4.0",
    "@types/uuid": "^9.0.0",
    "@types/lodash": "^4.14.0",
    
    // UI Components & Libraries
    "react-select": "^5.8.0",
    "react-datepicker": "^4.25.0",
    "react-modal": "^3.16.0",
    "react-toastify": "^10.0.0",
    "react-hot-toast": "^2.4.0",
    "react-loading-skeleton": "^3.3.0",
    
    // File & Media Handling
    "react-dropzone": "^14.2.0",
    "react-image-crop": "^11.0.0",
    "react-pdf": "^7.6.0",
    
    // Math & Calculations
    "mathjs": "^12.0.0",
    
    // Color & Theme
    "color": "^4.2.0",
    "chroma-js": "^2.4.0",
    
    // Build & Deployment
    "webpack": "^5.89.0",
    "babel-loader": "^9.1.0",
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@babel/preset-react": "^7.23.0",
    
    // Performance & Monitoring
    "web-vitals": "^3.5.0",
    "pino": "^8.17.0",
    "winston": "^3.11.0",
    
    // Progressive Web App
    "workbox-webpack-plugin": "^7.0.0",
    "workbox-precaching": "^7.0.0",
  },
  
  // Template configurations for different tech stacks
  TECH_STACKS: {
    "react-express": {
      name: "React + Express.js",
      description: "Full-stack web application with React frontend and Express.js backend",
      frontend: "React",
      backend: "Express.js",
      database: "MongoDB"
    },
    "nextjs-prisma": {
      name: "Next.js + Prisma",
      description: "Modern full-stack app with Next.js and Prisma ORM",
      frontend: "Next.js",
      backend: "Next.js API Routes",
      database: "PostgreSQL"
    },
    "react-graphql": {
      name: "React + GraphQL",
      description: "React frontend with Apollo GraphQL backend",
      frontend: "React",
      backend: "Apollo Server",
      database: "MongoDB"
    },
    "vue-express": {
      name: "Vue.js + Express.js",
      description: "Vue.js frontend with Express.js backend",
      frontend: "Vue.js",
      backend: "Express.js", 
      database: "MySQL"
    }
  },
  
  PRICING_DESC:
    "Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.",
  PRICING_OPTIONS: [
    {
      name: "Basic",
      tokens: "50K",
      value: 50000,
      desc: "Ideal for hobbyists and casual users for light, exploratory use.",
      price: 4.99,
    },
    {
      name: "Starter",
      tokens: "120K",
      value: 120000,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 9.99,
    },
    {
      name: "Pro",
      tokens: "2.5M",
      value: 2500000,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 19.99,
    },
    {
      name: "Unlimted (License)",
      tokens: "Unmited",
      value: 999999999,
      desc: "Designed for professionals who need to use Bolt a few times per week.",
      price: 49.99,
    },
  ],
};
