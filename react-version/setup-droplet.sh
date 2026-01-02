#!/bin/bash

# DigitalOcean Droplet Initial Setup Script
# Run this as root on a fresh Ubuntu droplet

set -e

echo "🚀 Starting DigitalOcean Droplet Setup..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify Node.js installation
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install PM2
echo "📦 Installing PM2..."
npm install -g pm2

# Install Git
echo "📦 Installing Git..."
apt install -y git

# Install Nginx
echo "📦 Installing Nginx..."
apt install -y nginx

# Install Certbot for SSL
echo "📦 Installing Certbot..."
apt install -y certbot python3-certbot-nginx

# Create app directory
echo "📁 Creating app directory..."
mkdir -p /var/www
cd /var/www

# Clone repository (you'll need to provide your GitHub credentials)
echo "📥 Cloning repository..."
if [ ! -d "MohammadAminulHaque" ]; then
    git clone https://github.com/nazndev/MohammadAminulHaque.git
fi

cd MohammadAminulHaque/react-version

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Create .env.local
echo "⚙️  Creating environment file..."
if [ ! -f ".env.local" ]; then
    cat > .env.local << EOF
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-8EF265JL7Z

# Environment
NEXT_PUBLIC_ENVIRONMENT=production
EOF
    echo "✅ Created .env.local"
else
    echo "⚠️  .env.local already exists, skipping..."
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start npm --name "mohammadaminulhaque" -- start
pm2 save

# Set up PM2 startup
echo "⚙️  Configuring PM2 to start on boot..."
pm2 startup

echo ""
echo "✅ Initial setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Configure Nginx (see DEPLOY_DIGITALOCEAN.md)"
echo "2. Set up SSL certificate with: certbot --nginx -d mohammadaminulhaque.net -d www.mohammadaminulhaque.net"
echo "3. Configure firewall: ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable"
echo ""
echo "🔍 Check app status: pm2 status"
echo "📝 View logs: pm2 logs mohammadaminulhaque"

