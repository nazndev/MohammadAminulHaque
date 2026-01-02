# DigitalOcean Deployment Guide

Complete guide to deploy your Next.js website to DigitalOcean Droplet.

## Prerequisites

- ✅ DigitalOcean Droplet (Ubuntu 20.04/22.04 recommended)
- ✅ Domain name from Namecheap
- ✅ SSH access to your droplet
- ✅ GitHub repository access

## Step 1: Initial Server Setup

### Connect to Your Droplet

```bash
ssh root@YOUR_DROPLET_IP
```

### Update System

```bash
apt update && apt upgrade -y
```

### Install Node.js (v18 or v20)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### Install Git

```bash
apt install -y git
```

### Install Nginx (Web Server)

```bash
apt install -y nginx
```

## Step 2: Clone Your Repository

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone your repository
git clone https://github.com/nazndev/MohammadAminulHaque.git
cd MohammadAminulHaque/react-version

# Install dependencies
npm install
```

## Step 3: Environment Configuration

```bash
# Create .env.local file
nano .env.local
```

Add the following:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-8EF265JL7Z

# Environment
NEXT_PUBLIC_ENVIRONMENT=production

# Base URL (will be set automatically, but you can override)
# NEXT_PUBLIC_BASE_URL=https://www.mohammadaminulhaque.net
```

Save and exit (Ctrl+X, then Y, then Enter)

## Step 4: Build the Application

```bash
# Build for production
npm run build
```

## Step 5: Set Up PM2 (Keep App Running)

```bash
# Start the app with PM2
pm2 start npm --name "mohammadaminulhaque" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
# Follow the instructions it outputs
```

## Step 6: Configure Nginx (Reverse Proxy)

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/mohammadaminulhaque.net
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name mohammadaminulhaque.net www.mohammadaminulhaque.net;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save and exit, then:

```bash
# Enable the site
ln -s /etc/nginx/sites-available/mohammadaminulhaque.net /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

## Step 7: Set Up SSL with Let's Encrypt (HTTPS)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d mohammadaminulhaque.net -d www.mohammadaminulhaque.net

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: Yes)
```

Certbot will automatically update your Nginx configuration.

## Step 8: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## Step 9: Verify Deployment

1. Visit `http://YOUR_DROPLET_IP` (should redirect to your domain)
2. Visit `https://www.mohammadaminulhaque.net`
3. Check all pages work:
   - Homepage
   - /about
   - /experience
   - /research
   - /achievements
   - /news/[slug] pages

## Step 10: Set Up Auto-Deployment (Optional)

### Option A: Manual Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash
cd /var/www/MohammadAminulHaque/react-version
git pull origin seo-enhancements
npm install
npm run build
pm2 restart mohammadaminulhaque
```

Make it executable:

```bash
chmod +x deploy.sh
```

### Option B: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml` in your repository.

## Useful Commands

```bash
# Check app status
pm2 status

# View logs
pm2 logs mohammadaminulhaque

# Restart app
pm2 restart mohammadaminulhaque

# Stop app
pm2 stop mohammadaminulhaque

# Check Nginx status
systemctl status nginx

# View Nginx logs
tail -f /var/log/nginx/error.log
```

## Troubleshooting

### App not starting
```bash
# Check PM2 logs
pm2 logs mohammadaminulhaque

# Check if port 3000 is in use
netstat -tulpn | grep 3000
```

### Nginx 502 Bad Gateway
```bash
# Check if app is running
pm2 status

# Check Nginx error logs
tail -f /var/log/nginx/error.log
```

### SSL Certificate Issues
```bash
# Renew certificate manually
certbot renew

# Test renewal
certbot renew --dry-run
```

## Next Steps

1. ✅ Configure domain DNS at Namecheap (see DNS Configuration section)
2. ✅ Set up monitoring
3. ✅ Submit sitemap to Google Search Console
4. ✅ Run SEO automation scripts

