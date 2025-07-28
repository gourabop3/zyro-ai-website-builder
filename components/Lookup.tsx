export default {
  SUGGSTIONS: [
    "Create ToDo App in React",
    "Create Budget Track App",
    "Create Gym Managment Portal Dashboard",
    "Create Quizz App On History",
    "Create Login Signup Screen",
    "Create E-commerce Product Page",
    "Create Weather Dashboard",
    "Create Social Media Feed",
    "Create Chat Application",
    "Create Portfolio Website",
  ],
  HERO_HEADING: "What do you want to build?",
  HERO_DESC: "Prompt, run, edit, and deploy full-stack web apps.",
  INPUT_PLACEHOLDER: "What you want to build?",
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
    <title>React App</title>
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
  },
  DEPENDANCY: {
    // CSS & Styling
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.0.0",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "clsx": "^2.1.0",
    
    // Icons & UI
    "lucide-react": "^0.469.0",
    "@heroicons/react": "^2.1.0",
    "react-icons": "^5.0.0",
    
    // Routing & Navigation
    "react-router-dom": "^7.1.1",
    
    // State Management
    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.17.0",
    
    // Forms & Validation
    "react-hook-form": "^7.49.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    
    // Utilities
    "uuid": "^9.0.0",
    "date-fns": "^4.1.0",
    "lodash": "^4.17.21",
    "axios": "^1.6.0",
    
    // Charts & Data Visualization
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
    "recharts": "^2.10.0",
    
    // Animation & Effects
    "framer-motion": "^11.0.0",
    "react-spring": "^9.7.0",
    
    // Firebase & Backend
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    
    // Development & Testing
    "prop-types": "^15.8.0",
    "@types/uuid": "^9.0.0",
    "@types/lodash": "^4.14.0",
    
    // UI Components
    "react-select": "^5.8.0",
    "react-datepicker": "^4.25.0",
    "react-modal": "^3.16.0",
    "react-toastify": "^10.0.0",
    
    // File & Media Handling
    "react-dropzone": "^14.2.0",
    "react-image-crop": "^11.0.0",
    
    // Math & Calculations
    "mathjs": "^12.0.0",
    
    // Color & Theme
    "color": "^4.2.0",
    "chroma-js": "^2.4.0",
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
