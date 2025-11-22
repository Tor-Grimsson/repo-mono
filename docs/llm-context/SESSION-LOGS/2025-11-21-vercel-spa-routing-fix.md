# Session Log: Vercel SPA Routing Fix
**Date:** 2025-11-21
**Status:** Complete

## Summary
Fixed 404 errors when directly accessing routes (e.g., `kolkrabbi.io/work`) on Vercel deployment. The issue was that the Vite SPA uses React Router for client-side routing, but Vercel's server didn't know to serve `index.html` for all routes.

## Problem
- Navigation within the app worked fine (React Router handled it client-side)
- Direct URL access or page refresh returned Vercel 404 errors
- Routes like `/work`, `/foundry`, `/workshop` were inaccessible via direct links

## Root Cause
- Vite builds a single-page application with client-side routing
- When users directly access a route, Vercel's server looks for that path on disk
- No file exists at `/work/index.html`, so server returns 404
- The app needed to tell Vercel to serve `index.html` for all routes

## Solution
Created `apps/web/vercel.json` with SPA rewrite configuration:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This tells Vercel: "For any route request, serve the main `index.html` file, then let React Router handle the routing client-side."

## Implementation Details
1. Initially attempted to configure via root `vercel.json` with build commands
2. This broke both `web` and `studio` deployments (separate Vercel projects)
3. Reverted root `vercel.json` to original state
4. Created app-specific `apps/web/vercel.json` with rewrite rule
5. Studio deployment remained unaffected

## Files Changed
- `apps/web/vercel.json` - Created with SPA routing rewrite rule
- Root `vercel.json` - Reverted to original minimal configuration

## Result
✅ Direct URL access works correctly for all routes
✅ Browser refresh on any route works
✅ Navigation within app continues to work
✅ Studio deployment unaffected
✅ All routes accessible: `/`, `/work`, `/foundry`, `/workshop`, etc.

## Commits
- `1f2fb507` - fix: add SPA routing configuration to web app
- `a0a379f3` - revert: restore original vercel.json, configure routing per project instead
- Earlier attempts reverted due to monorepo structure misunderstanding

## Lessons Learned
- Monorepo with multiple Vercel projects requires app-specific configuration
- Root `vercel.json` shouldn't contain build commands when apps are deployed separately
- SPA routing configuration belongs in the specific app directory
- Always verify deployment setup before modifying build configurations

## Next Steps
None - routing issue resolved and working in production.
