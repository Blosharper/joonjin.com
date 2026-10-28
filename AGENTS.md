# Site maintenance

The public website lives in `joonjin/`. Preserve its URLs and Cloudflare Pages
project name. Deployment uses the workflow in `.github/workflows/` and the
matching script in `scripts/`; keep cache updates and Wrangler pin in sync.

Publish only approved public content. Keep credentials in repository secrets or
an ignored `.env`. Do not place operating notes inside the deployed directory.
