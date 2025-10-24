# Deploy to Vercel - YS Studio Artifacts

## Quick Deploy Command
Deploy the YS Studio Artifacts to Vercel with automatic GitHub integration.

## Workflow Overview
1. **Check deployment readiness** - Verify git status and branch
2. **Run deployment** - Execute Vercel CLI deployment
3. **Verify deployment** - Check deployment status and URLs
4. **Update documentation** - Add deployment URL to README if needed

## Deployment Steps

### 1. Pre-deployment Checks
- Ensure all changes are committed
- Verify you're on the main branch
- Check that vercel.json exists

### 2. Initial Setup (First Time Only)
If this is your first deployment:
```bash
# Link to Vercel project
vercel link

# Set up GitHub integration in Vercel dashboard
# Go to: https://vercel.com/new
# Import your GitHub repository
```

### 3. Deploy Commands

#### Production Deployment (Main Branch)
```bash
# Deploy to production
vercel --prod
```

#### Preview Deployment (Development)
```bash
# Deploy preview version
vercel
```

#### Deploy with Specific Configuration
```bash
# Deploy with custom build settings
vercel --build-env NODE_ENV=production
```

### 4. Environment Variables Setup
Add these secrets to GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - Find in `.vercel/project.json` after linking
   - `VERCEL_PROJECT_ID` - Find in `.vercel/project.json` after linking

### 5. Automated Deployment
With GitHub Actions configured:
- **Push to main** → Automatic production deployment
- **Open PR** → Automatic preview deployment with comment
- **Manual trigger** → Use Actions tab in GitHub

## Deployment URLs
- **Production**: `https://ys-studio-artifacts.vercel.app`
- **Preview**: `https://ys-studio-artifacts-[branch]-[username].vercel.app`
- **Custom Domain**: Can be configured in Vercel dashboard

## Troubleshooting

### Common Issues
1. **Build Failed**: Check `vercel.json` configuration
2. **404 Errors**: Verify rewrites in `vercel.json`
3. **Missing Files**: Ensure `.gitignore` doesn't exclude needed files
4. **Auth Issues**: Regenerate and update `VERCEL_TOKEN`

### Useful Commands
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-url]

# Pull environment variables
vercel env pull

# Inspect current project
vercel inspect
```

## Features Enabled
- ✅ Automatic GitHub integration
- ✅ Preview deployments for PRs
- ✅ Production deployment on merge
- ✅ Clean URLs without .html extension
- ✅ Security headers configured
- ✅ Optimized caching for tools
- ✅ Custom rewrites for tool routing

## Best Practices
1. Always test locally before deploying
2. Use preview deployments for testing
3. Keep sensitive data in environment variables
4. Monitor deployment logs for issues
5. Use semantic versioning in commit messages

---

**Note**: This skill provides smooth deployment to Vercel with full GitHub integration. The deployment is optimized for static HTML tools with no build step required.