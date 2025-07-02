# Zyro - AI Website Builder

Zyro is a modern, AI-powered website builder that allows users to create stunning, responsive websites in minutes without any coding knowledge. Built with Next.js 15, TypeScript, and powered by Google's Gemini AI, Zyro provides an intuitive interface for generating complete web applications through natural language descriptions.

## ✨ Features

- **🤖 AI-Powered Generation**: Generate complete websites using natural language descriptions
- **⚡ Real-time Code Editor**: Live preview with Sandpack integration for instant feedback
- **🎨 Beautiful Templates**: Modern, responsive designs with Tailwind CSS
- **🔐 User Authentication**: Secure authentication with Clerk
- **💾 Workspace Management**: Save and manage multiple projects
- **📱 Responsive Design**: Mobile-first approach with modern UI components
- **🚀 Performance Optimized**: Built with Next.js 15 and Turbopack for blazing fast performance

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: Google Gemini AI
- **Code Editor**: Sandpack React
- **UI Components**: Radix UI + Custom components
- **State Management**: Zustand
- **Icons**: Lucide React, Phosphor Icons
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Gemini AI API key
- Clerk account for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lwshakib/zyro-ai-website-builder.git
   cd zyro-ai-website-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/zyro_db"

   # Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/workspaces
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/workspaces

   # AI
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
zyro-the-ai-website-builder/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   │   ├── ai-chat/       # AI chat endpoint
│   │   ├── ai-codegen/    # AI code generation
│   │   ├── chat/          # Chat functionality
│   │   ├── files/         # File management
│   │   └── workspace/     # Workspace CRUD
│   ├── workspaces/        # Workspace pages
│   └── pricing/           # Pricing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   ├── WorkSpaceEditor.tsx # Main editor component
│   └── SandPackPreviewClient.tsx # Code preview
├── actions/              # Server actions
│   └── gemini.ts         # AI integration
├── constants/            # App constants
│   └── prompts.ts        # AI prompts
├── lib/                  # Utility libraries
│   ├── prisma.ts         # Database client
│   ├── zustand.ts        # State management
│   └── utils.ts          # Helper functions
└── prisma/               # Database schema
    └── schema.prisma     # Prisma schema
```

## 🎯 How It Works

1. **Describe Your Site**: Users describe their website requirements in natural language
2. **AI Generation**: Gemini AI generates complete React components with Tailwind CSS styling
3. **Live Preview**: Sandpack provides real-time code execution and preview
4. **Save & Deploy**: Workspaces are saved to the database for future editing

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate:dev` - Run database migrations

## 🗄️ Database Schema

The application uses PostgreSQL with the following main models:

- **Workspace**: Stores project information and metadata
- **ChatMessage**: Tracks conversation history for each workspace
- **FilesVersion**: Version control for generated code files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Clerk](https://clerk.com/) for authentication
- [Sandpack](https://sandpack.codesandbox.io/) for the code editor
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prisma](https://www.prisma.io/) for database management

