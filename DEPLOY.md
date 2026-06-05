# Deploying to Vercel

## Quick Deploy

1. Push this project to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Vercel auto-detects the config — just click **Deploy**

## Manual CLI Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Build Settings (auto-configured via vercel.json)

| Setting | Value |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `.output/public` |
| Install Command | `npm install` |

## Local Development

```bash
npm install
npm run dev
```

## Notes

- This project uses **TanStack Start** with SSR
- The Lovable-specific `@lovable.dev/vite-tanstack-config` has been replaced with standard Vite plugins
- Static assets are cached for 1 year via Cache-Control headers
