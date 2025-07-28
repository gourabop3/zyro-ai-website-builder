# E2B Full-Stack Template for Zyro AI Website Builder
# Node.js + Python + Web Development Environment

FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists and install system dependencies
RUN apt-get update && apt-get install -y \
    # System basics
    curl \
    wget \
    git \
    vim \
    nano \
    htop \
    tree \
    unzip \
    build-essential \
    # Python
    python3 \
    python3-pip \
    python3-dev \
    # Node.js (via NodeSource)
    software-properties-common \
    # Database clients
    sqlite3 \
    postgresql-client \
    # SSL and crypto
    libssl-dev \
    libffi-dev \
    # Media libraries
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libjpeg-dev \
    libpng-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18.x
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Create symlink for python
RUN ln -s /usr/bin/python3 /usr/bin/python

# Upgrade pip and npm
RUN python -m pip install --upgrade pip
RUN npm install -g npm@latest

# Install global Node.js packages for web development
RUN npm install -g \
    @vercel/next \
    create-next-app \
    create-react-app \
    vite \
    typescript \
    ts-node \
    nodemon \
    pm2 \
    prisma \
    @prisma/client \
    tailwindcss \
    postcss \
    autoprefixer \
    eslint \
    prettier

# Install Python packages for full-stack development
RUN pip install \
    # Web frameworks
    flask \
    fastapi \
    django \
    uvicorn \
    gunicorn \
    # Database
    pymongo \
    sqlalchemy \
    psycopg2-binary \
    # API and HTTP
    requests \
    httpx \
    aiohttp \
    # Data processing
    pandas \
    numpy \
    # AI/ML basics
    openai \
    anthropic \
    google-generativeai \
    # Utilities
    python-dotenv \
    pydantic \
    rich \
    click \
    # Development tools
    black \
    pytest \
    jupyter

# Set working directory
WORKDIR /home/user

# Create a non-root user
RUN useradd -m -s /bin/bash user && \
    chown -R user:user /home/user

# Switch to non-root user
USER user

# Set environment variables
ENV PATH="/home/user/.local/bin:$PATH"
ENV NODE_PATH="/usr/lib/node_modules"
ENV PYTHONPATH="/home/user:$PYTHONPATH"