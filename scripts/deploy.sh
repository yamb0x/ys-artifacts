#!/bin/bash

# YS Studio Artifacts - Vercel Deployment Script
# This script automates the deployment process to Vercel

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[DEPLOY]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed!"
    echo "Install it with: npm install -g vercel"
    exit 1
fi

# Check git status
print_status "Checking git status..."
if [[ -n $(git status -s) ]]; then
    print_warning "You have uncommitted changes:"
    git status -s
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deployment cancelled"
        exit 0
    fi
fi

# Get current branch
BRANCH=$(git branch --show-current)
print_status "Current branch: $BRANCH"

# Determine deployment type
if [ "$1" == "--prod" ] || [ "$BRANCH" == "main" ]; then
    DEPLOY_TYPE="production"
    DEPLOY_CMD="vercel --prod"
else
    DEPLOY_TYPE="preview"
    DEPLOY_CMD="vercel"
fi

print_status "Deployment type: $DEPLOY_TYPE"

# Check if project is linked
if [ ! -f ".vercel/project.json" ]; then
    print_warning "Project not linked to Vercel"
    print_status "Linking project..."
    vercel link
fi

# Run deployment
print_status "Starting deployment to Vercel..."
echo "Running: $DEPLOY_CMD"

# Deploy and capture output
if OUTPUT=$($DEPLOY_CMD 2>&1); then
    print_success "Deployment successful!"

    # Extract URL from output
    URL=$(echo "$OUTPUT" | grep -o 'https://[^ ]*' | head -1)

    if [ ! -z "$URL" ]; then
        print_success "Deployment URL: $URL"

        # Copy to clipboard if possible
        if command -v pbcopy &> /dev/null; then
            echo "$URL" | pbcopy
            print_status "URL copied to clipboard"
        fi

        # Open in browser
        read -p "Open in browser? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            open "$URL"
        fi
    fi
else
    print_error "Deployment failed!"
    echo "$OUTPUT"
    exit 1
fi

# Show additional commands
echo ""
print_status "Useful commands:"
echo "  vercel ls          - List all deployments"
echo "  vercel logs $URL   - View deployment logs"
echo "  vercel inspect     - Inspect current project"
echo "  vercel alias       - Set custom domain"

print_success "Deployment complete!"