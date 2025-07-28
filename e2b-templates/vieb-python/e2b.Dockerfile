# E2B Python Template for Zyro AI Website Builder
# Based on Ubuntu 22.04 with Python, data science libraries, and web development tools

FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists and install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    curl \
    wget \
    git \
    vim \
    nano \
    htop \
    tree \
    unzip \
    sqlite3 \
    libssl-dev \
    libffi-dev \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libjpeg-dev \
    libpng-dev \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

# Create symlink for python
RUN ln -s /usr/bin/python3 /usr/bin/python

# Upgrade pip
RUN python -m pip install --upgrade pip

# Install essential Python packages for AI website building
RUN pip install \
    # Core data science
    numpy \
    pandas \
    matplotlib \
    seaborn \
    plotly \
    scipy \
    scikit-learn \
    # Web development
    flask \
    fastapi \
    requests \
    beautifulsoup4 \
    selenium \
    # AI/ML
    openai \
    anthropic \
    google-generativeai \
    # Image processing
    Pillow \
    opencv-python-headless \
    # Utilities
    python-dotenv \
    pydantic \
    httpx \
    aiohttp \
    # Database
    pymongo \
    sqlalchemy \
    # Development tools
    jupyter \
    ipython \
    black \
    pytest \
    # Additional useful packages
    python-dateutil \
    pytz \
    tqdm \
    rich

# Set working directory
WORKDIR /home/user

# Create a non-root user
RUN useradd -m -s /bin/bash user && \
    chown -R user:user /home/user

# Switch to non-root user
USER user

# Set environment variables
ENV PATH="/home/user/.local/bin:$PATH"
ENV PYTHONPATH="/home/user:$PYTHONPATH"