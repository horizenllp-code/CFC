# CFC Logistics — Client Demo Website

Production-ready, interactive web experience for CFC Logistics Pvt. Ltd., built with React, TypeScript, and Vite.

## Project Specifications

- **Project name**: CFC Logistics — Client Demo Website
- **Framework**: React 19 + Vite 6 + Tailwind CSS v4 + TypeScript
- **Package manager**: npm (also compatible with Bun, pnpm, yarn)
- **Install command**: `npm install`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

## Features Included in This Build

1. Preloader with animated progress counter
2. Fullscreen interactive CFC entrance experience
3. Interactive supply chain diagram (`cfc_supply_chain_interactive.png`)
4. Central pulsing warehouse anchor
5. 8 interactive logistics capabilities
6. Hover & tap capability annotations
7. Dynamic amber connector line highlighting
8. Transparent official CFC logo with dual entrance trigger
9. "Logistically yours" hero title & "CLICK TO EXPLORE →" action button
10. Cinematic transition into main website
11. Main CFC Logistics website featuring warehouse hero (`9.png`)
12. Comprehensive operational modules, fleet statistics, and corporate capabilities
13. Full responsive layout across all desktop and mobile screen resolutions

## Netlify Deployment Instructions

### Option 1: Git-Based Deployment (Recommended)
1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In the Netlify dashboard, click **Add new site** → **Import an existing project**.
3. Select your repository.
4. Netlify will automatically read `netlify.toml` and populate:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.

### Option 2: Direct Drag-and-Drop (Netlify Drop)
1. Run `npm install` and `npm run build` locally.
2. Drag and drop the generated `dist` folder directly onto [Netlify Drop](https://app.netlify.com/drop).
3. The site deploys instantly with all assets and SPA redirect rules.

## Configuration Files

- `netlify.toml`: Defines build command (`npm run build`), publish directory (`dist`), SPA catch-all rewrite rule (`/* -> /index.html 200`), and asset caching headers.
- `public/_redirects`: Built-in fallback rewrite for Netlify static deployments.
