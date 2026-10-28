# Joon x Jin Works

Source for [joonjin.com](https://joonjin.com). Deployable files live in `joonjin/`.

The deployment workflow runs on hosted Ubuntu when `main` changes under the site,
its deploy script or the workflow. It uploads to Cloudflare Pages project
`joonjin-site` using Wrangler `4.118.0` and refreshes the asset cache version.

Required repository secret names:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

For a manual deploy, export those variables (or set them in an ignored `.env`)
and run `bash scripts/deploy-joonjin.sh` with Bun installed.
