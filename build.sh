#!/bin/zsh

# Script to build the project into static files
# Created: October 17, 2025

echo "🚀 Starting build process for womensday20_10 application..."

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Build the project with Vite
echo "🏗️  Building project..."
npm run build

# Output result
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Static files are available in the 'dist' directory"
    echo "💻 To preview the built files locally, run: npm run preview"
    echo "🌐 To deploy, copy the contents of the 'dist' directory to your web server"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
