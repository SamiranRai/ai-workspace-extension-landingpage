# AI Workspace landing page (React + Vite)

    npm install
    npm run dev       # local dev
    npm run build     # production build in dist/
    npm run preview   # test the production build locally

Edit copy and links in `src/content.js`. Replace the `TODO` links there before deploying.
Live demo: put your embed inside `<div class="frame" id="demo">` in `src/App.jsx` (Hero).

## Deploy (Vercel)

1. Push this folder to a GitHub repository.
2. In Vercel, select **Add New Project** and import the repository.
3. Vercel detects Vite automatically. The configured build command is `npm run build`
   and the output directory is `dist`.
4. Deploy, then add your custom domain under **Settings > Domains**.

`vercel.json` configures the build output and security/cache headers.
