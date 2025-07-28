#!/bin/bash
# Build E2B Templates for Zyro AI Website Builder
# Similar to vibecode-ai template setup

echo "🚀 Building E2B Templates for Zyro AI Website Builder..."

# Check if E2B CLI is installed
if ! command -v e2b &> /dev/null; then
    echo "❌ E2B CLI not found. Installing..."
    npm install -g @e2b/cli@latest
fi

# Check if user is logged in
if ! e2b auth whoami &> /dev/null; then
    echo "🔐 Please login to E2B:"
    e2b auth login
fi

# Build Python Data Science Template
echo "📦 Building vieb-python template..."
cd e2b-templates/vieb-python
if [ -f "e2b.Dockerfile" ]; then
    e2b template build --name "vieb-python"
    if [ $? -eq 0 ]; then
        echo "✅ vieb-python template built successfully"
    else
        echo "❌ Failed to build vieb-python template"
    fi
else
    echo "❌ e2b.Dockerfile not found in vieb-python directory"
fi
cd ../..

# Build Full-Stack Template
echo "📦 Building vieb-fullstack template..."
cd e2b-templates/vieb-fullstack
if [ -f "e2b.Dockerfile" ]; then
    e2b template build --name "vieb-fullstack"
    if [ $? -eq 0 ]; then
        echo "✅ vieb-fullstack template built successfully"
    else
        echo "❌ Failed to build vieb-fullstack template"
    fi
else
    echo "❌ e2b.Dockerfile not found in vieb-fullstack directory"
fi
cd ../..

echo ""
echo "🎉 E2B Template building complete!"
echo ""
echo "📋 Template Summary:"
echo "  • vieb-python: Python + Data Science + AI/ML"
echo "  • vieb-fullstack: Node.js + Python + Web Development"
echo ""
echo "💡 Usage:"
echo "  Templates will be automatically selected based on code type"
echo "  You can also specify a template manually in API calls"
echo ""
echo "🔧 Next Steps:"
echo "  1. Update your .env with E2B_API_KEY"
echo "  2. Uncomment template selection in execute-code API"
echo "  3. Test code execution with different file types"