# Technical Plan: System-wide Social Metadata (Edge Injection)

## Objective

Transition from client-side metadata (React-only) to **Edge Injection** on Vercel. This ensures that social crawlers (Slack, LinkedIn, Discord, X) receive hydrated OpenGraph tags without needing to execute JavaScript.

## 1. Architectural Changes

Since this is a Vite SPA, the `index.html` is static. We will use a **Vercel Edge Function** as a proxy to intercept requests for HTML and perform string replacement on meta tags before delivery.

### Step 1: Prepare `index.html`

Replace hardcoded meta tags in the root `index.html` with unique placeholder strings.

- `<title>__TITLE__</title>`
    
- `<meta property="og:title" content="__TITLE__" />`
    
- `<meta property="og:description" content="__DESCRIPTION__" />`
    
- `<meta property="og:image" content="__IMAGE__" />`
    
- `<meta property="og:url" content="__URL__" />`
    

### Step 2: Implement Metadata Proxy (`/api/metadata-proxy.js`)

Create a serverless/edge function to handle the injection logic.

- **Route Detection:** Identify if the request is for a Blog Post (Sanity) or a Static Page (About, Contact, Home).
    
- **Data Fetching:**
    
    - **CMS Pages:** Query Sanity using the slug.
        
    - **Static Pages:** Maintain a local `const STATIC_META` mapping routes to titles/descriptions.
        
- **Injection:** Read the `dist/index.html` file, perform `.replace()` on the placeholders, and return the modified HTML.
    

### Step 3: Vercel Routing Configuration (`vercel.json`)

Redirect all incoming HTML requests through the proxy.

```
{
  "rewrites": [
    {
      "source": "/(blog/.*|about|contact|portfolio)",
      "destination": "/api/metadata-proxy"
    },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 2. Sanity Schema Enhancements

To provide granular control, update the Sanity schema for `post` and a new `siteConfig` singleton:

- **Field:** `seoTitle` (String, max 60 chars)
    
- **Field:** `seoDescription` (Text, max 160 chars)
    
- **Field:** `ogImage` (Image)
    
- **Logic:** The proxy should use these fields if present, otherwise fallback to the post title and a global default image.
    

## 3. Verification & Quality Control System

### Phase A: Local Handoff Script

Create a local utility `scripts/test-meta.sh` to simulate crawler behavior:

```
# Usage: ./scripts/test-meta.sh /blog/my-post
URL=$1
curl -A "Twitterbot" -L "http://localhost:3000$URL" | grep -E "og:|title"
```

### Phase B: Automated CI/CD Check (Playwright)

Add a "Metadata Audit" step to the build process:

- Use Playwright to visit critical paths (`/`, `/blog`, `/services`).
    
- Assert that `<meta property="og:image">` contains a valid URL and is not the placeholder `__IMAGE__`.
    
- Fail build if metadata is missing or contains template strings.
    

### Phase C: Visual Debugging Workflow

Before every production deploy, use these URLs for final validation:

1. **Facebook Sharing Debugger:** `https://developers.facebook.com/tools/debug/?q={URL}`
    
2. **LinkedIn Post Inspector:** `https://www.linkedin.com/post-inspector/inspect/{URL}`
    
3. **SocialSharePreview:** `https://socialsharepreview.com/`
    

## 4. Implementation Priorities for Agent

1. **Setup `vercel.json` rewrites** to ensure the API function is actually catching traffic.
    
2. **Implement the Sanity fetch logic** in the API function using `@sanity/client`.
    
3. **Handle Edge Caching:** Ensure `Cache-Control` headers are set in the proxy to prevent fetching Sanity data on every single hit (use `s-maxage=60, stale-while-revalidate`).