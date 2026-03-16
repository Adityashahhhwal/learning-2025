# GitHub Pages Deployment Guide

## Overview
This repository is configured to deploy automatically to GitHub Pages using GitHub Actions.

**Live URL:** https://adityashahhhwal.github.io/learning-2025/

## Configuration

### GitHub Actions Workflow
- **File:** `.github/workflows/static.yml`
- **Trigger:** Automatically on push to `main` branch
- **Manual:** Can be triggered from Actions tab using workflow_dispatch

### Key Files for Deployment

#### `.nojekyll`
This empty file in the root directory is **critical** for proper deployment:
- Prevents GitHub Pages from processing the site with Jekyll
- Allows JavaScript ES6 modules to work correctly
- Without it, files starting with `_` and ES6 imports may fail

#### `index.html`
The main landing page that links to all projects.

## Project Structure

```
learning-2025/
├── .nojekyll                    # Disables Jekyll processing
├── index.html                   # Main landing page
├── 01-dom/                      # Toggle effect project
├── 02-calculator/               # Calculator project
├── 03-rock-paper-scissors/      # Game project
├── 04-todo-list/                # Todo app project
└── 05-amazon-project/
    └── javascript-amazon-project/  # Amazon clone (uses ES6 modules)
        ├── amazon.html
        ├── checkout.html
        ├── orders.html
        ├── tracking.html
        ├── styles/
        ├── scripts/
        ├── images/
        └── data/
```

## Project Links

All project paths use relative URLs from the root:
1. Toggle Effect: `/01-dom/index.html`
2. Calculator: `/02-calculator/index.html`
3. Rock Paper Scissors: `/03-rock-paper-scissors/index.html`
4. Todo List: `/04-todo-list/index.html`
5. Amazon Project: `/05-amazon-project/javascript-amazon-project/amazon.html`

## Deployment Process

### Automatic Deployment
1. Push changes to the `main` branch
2. GitHub Actions workflow automatically triggers
3. Static content is uploaded to GitHub Pages
4. Site is deployed and accessible within minutes

### Manual Deployment
1. Go to repository → Actions tab
2. Select "Deploy static content to Pages"
3. Click "Run workflow" → "Run workflow"

## Troubleshooting

### JavaScript Module Errors
**Problem:** Errors like "Failed to load module" or MIME type issues  
**Solution:** Ensure `.nojekyll` file exists in root directory

### 404 Errors for Assets
**Problem:** CSS, images, or scripts not loading  
**Solution:** Verify all paths are relative and correct

### Workflow Failures
**Problem:** GitHub Actions workflow fails  
**Check:**
- Repository Settings → Pages → Source is set to "GitHub Actions"
- Workflow has necessary permissions (contents: read, pages: write, id-token: write)

## Verification Checklist

After deployment, verify:
- ✅ Main page loads at https://adityashahhhwal.github.io/learning-2025/
- ✅ All 5 project links work correctly
- ✅ No console errors for missing files
- ✅ JavaScript functionality works (especially Amazon project modules)
- ✅ CSS styles load properly
- ✅ Images display correctly

## GitHub Pages Settings

**Required Repository Settings:**
- Settings → Pages → Source: **GitHub Actions**
- No custom domain configuration needed
- HTTPS enforcement: Enabled (recommended)

## Notes

- The site deploys the entire repository (not just a `docs/` folder)
- All pushes to `main` trigger automatic deployment
- The Amazon project uses ES6 modules, which require the `.nojekyll` file
- Deployment typically takes 1-3 minutes after a successful workflow run
