#!/bin/bash
# Exit on any error
set -e

echo "Setting up development environment..."

# Install Bun
echo "Installing Bun..."
curl -fsSL https://bun.sh/install | bash

# Set up Bun environment variables
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Configure git
echo "Configuring Git..."
git config commit.template .github/commit-template.txt

# Install dependencies
echo "Installing dependencies..."
bun install

echo "Setup complete!"
