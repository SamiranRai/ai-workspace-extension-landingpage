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

## Waitlist

The CTAs open the waitlist form at the bottom of the page. The form submits to
the Vercel Function at `/api/waitlist`, which adds the address to a Resend
Audience. Vercel itself hosts the function but does not provide permanent
storage, so this external list is intentional.

Before deploying, create a Resend API key and Audience, then add these Vercel
environment variables for Production (and Preview if needed):

- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID`

The function validates and normalizes the email, quietly handles duplicate
submissions, and returns a clear error if the integration is not configured.
Only the email address is collected; no other form data is sent.

The standard Vite dev server does not run Vercel Functions, so test the
waitlist on a Vercel Preview deployment (or with the Vercel CLI) rather than
`npm run dev` alone.
