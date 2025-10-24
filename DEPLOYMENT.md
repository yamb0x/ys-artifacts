# 🚀 Deployment Guide - YS Studio Artifacts

## Overview
This project is configured for seamless deployment to Vercel with GitHub integration. Every push to main triggers automatic deployment, and PRs get preview deployments.

## Quick Start

### 1. First-Time Setup
```bash
# Install Vercel CLI globally
npm install -g vercel

# Link project to Vercel (follow prompts)
vercel link

# Or use the deployment script
./scripts/deploy.sh
```

### 2. Deploy Methods

#### Method 1: Automatic (Recommended)
Simply push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```
→ GitHub Actions automatically deploys to Vercel

#### Method 2: Manual CLI
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Or use the deployment script
./scripts/deploy.sh        # Preview
./scripts/deploy.sh --prod  # Production
```

#### Method 3: GitHub Actions Manual Trigger
1. Go to Actions tab in GitHub
2. Select "Deploy to Vercel" workflow
3. Click "Run workflow"

## Configuration Files

### `vercel.json`
- Defines project settings
- Configures URL rewrites for clean URLs
- Sets security headers
- Optimizes caching for tools

### `.github/workflows/deploy-vercel.yml`
- Automates deployment on push/PR
- Creates preview URLs for PRs
- Handles production deployments

### `scripts/deploy.sh`
- Convenient deployment script
- Checks git status
- Handles project linking
- Opens deployment in browser

## GitHub Secrets Setup

### Required Secrets
Add these in GitHub Settings → Secrets:

1. **VERCEL_TOKEN**
   - Get from: https://vercel.com/account/tokens
   - Create new token with full access

2. **VERCEL_ORG_ID**
   - Run `vercel link` locally first
   - Find in `.vercel/project.json`
   - Format: `team_xxxxxxxxxxxxx`

3. **VERCEL_PROJECT_ID**
   - Run `vercel link` locally first
   - Find in `.vercel/project.json`
   - Format: `prj_xxxxxxxxxxxxx`

### Adding Secrets
```bash
# After linking project locally
cat .vercel/project.json
# Copy orgId and projectId values
```

## Deployment URLs

### Production
- Main URL: `https://ys-studio-artifacts.vercel.app`
- Custom domain: Configure in Vercel dashboard

### Preview
- Format: `https://ys-studio-artifacts-[branch]-[username].vercel.app`
- Automatically commented on PRs

### Tool Access
- Main page: `https://ys-studio-artifacts.vercel.app`
- ASCII Creator: `https://ys-studio-artifacts.vercel.app/tools/ascii-creator`
- Other tools: `https://ys-studio-artifacts.vercel.app/tools/[tool-name]`

## Features

### ✅ Enabled Features
- **Zero-config deployment** - No build step needed
- **Automatic HTTPS** - SSL certificates managed by Vercel
- **Global CDN** - Fast loading worldwide
- **Preview deployments** - Test before production
- **Clean URLs** - No .html extensions needed
- **Security headers** - XSS, clickjacking protection
- **Optimized caching** - Fast repeat visits
- **GitHub integration** - Automatic deployments

### 🔄 Workflow Features
- **PR previews** - Every PR gets a unique URL
- **Automatic comments** - Preview URLs posted to PRs
- **Branch deployments** - Each branch can have its deployment
- **Rollback support** - Easy reversion to previous versions

## Troubleshooting

### Common Issues

#### "Project not linked"
```bash
vercel link
# Follow prompts to select/create project
```

#### "Authentication failed"
```bash
vercel logout
vercel login
```

#### "Build failed"
- Check `vercel.json` syntax
- Verify all files are committed
- Check Vercel dashboard logs

#### "404 on tool pages"
- Verify rewrites in `vercel.json`
- Ensure tool has `index.html` file
- Check file paths are correct

### Useful Commands

```bash
# View all deployments
vercel ls

# Check deployment logs
vercel logs [url]

# Remove a deployment
vercel rm [url]

# Set custom domain
vercel alias [deployment-url] [custom-domain]

# Pull environment variables
vercel env pull

# Inspect project settings
vercel inspect
```

## Best Practices

1. **Test Locally First**
   ```bash
   python -m http.server 8000
   # Test at http://localhost:8000
   ```

2. **Use Preview Deployments**
   - Create PR for testing
   - Verify preview deployment
   - Merge to main for production

3. **Monitor Deployments**
   - Check Vercel dashboard
   - Review deployment logs
   - Monitor performance metrics

4. **Version Control**
   - Tag releases: `git tag v1.0.0`
   - Use semantic commit messages
   - Document changes in commits

## Advanced Configuration

### Custom Domain
1. Add domain in Vercel dashboard
2. Update DNS records as instructed
3. SSL automatically configured

### Environment Variables
```bash
# Add variable
vercel env add

# List variables
vercel env ls

# Pull to .env file
vercel env pull
```

### Performance Optimization
- Tools are cached for 1 year (immutable)
- HTML files use smart caching
- CDN automatically optimizes delivery

## Support

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Project Issues](https://github.com/[username]/ys-artifacts/issues)

### Monitoring
- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Actions](https://github.com/[username]/ys-artifacts/actions)
- [Analytics](https://vercel.com/analytics)

---

**Last Updated**: October 2024
**Status**: Ready for deployment
**Deployment Time**: ~30 seconds