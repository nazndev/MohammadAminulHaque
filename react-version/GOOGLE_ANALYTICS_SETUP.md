# Google Analytics Setup

## Configuration

Your Google Analytics is configured with the following details:

- **Stream Name**: Mohammad-Aminul-Haque-Profile
- **Stream URL**: https://www.mohammadaminulhaque.net
- **Stream ID**: 13216789502
- **Measurement ID**: G-8EF265JL7Z

## Setup Instructions

### For Local Development:

1. Create a `.env.local` file in the `react-version/` directory:

```bash
cd react-version
touch .env.local
```

2. Add the following content to `.env.local`:

```env
# Google Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-8EF265JL7Z

# Environment Configuration
NEXT_PUBLIC_ENVIRONMENT=development

# Development URL (optional)
NEXT_PUBLIC_DEV_URL=http://localhost:3000
```

### For Production Deployment:

When deploying to production (Vercel, Netlify, etc.), add these environment variables in your hosting platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-8EF265JL7Z`
   - `NEXT_PUBLIC_ENVIRONMENT` = `production`

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add the same variables as above

**Other Platforms:**
Add the environment variables in your platform's environment variable settings.

## Verification

After setup, Google Analytics will automatically:
- Track page views
- Track page paths
- Track page titles
- Track page locations

You can verify it's working by:
1. Visiting your website
2. Going to Google Analytics → Realtime reports
3. You should see your visit appear within a few seconds

## Notes

- The `.env.local` file is gitignored (not committed to repository)
- The Measurement ID is already configured in the code
- Analytics will only work when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- The domain has been updated to `www.mohammadaminulhaque.net` in the config

