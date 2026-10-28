# joonjin.com

The source of **[joonjin.com](https://joonjin.com)** — the website of **Joon x Jin Works**.

> 화투 한 장에서 시작한 작은 게임 공방 · A small game studio that started with a single hwatu card.

Our first game is **[Blosharper](https://blosharper.com)**, a Korean Hwatu roguelike deckbuilder — on [Steam](https://store.steampowered.com/app/4718270/) and [STOVE](https://store.onstove.com/ko/games/105719). More from the team at [github.com/Blosharper](https://github.com/Blosharper).

## What this repository is

A static site served on Cloudflare Pages.

## Maintaining

Source for [joonjin.com](https://joonjin.com). Deployable files live in `joonjin/`.

The deployment workflow runs on hosted Ubuntu when `main` changes under the site,
its deploy script or the workflow. It uploads to Cloudflare Pages project
`joonjin-site` using Wrangler `4.118.0` and refreshes the asset cache version.

Required repository secret names:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

For a manual deploy, export those variables (or set them in an ignored `.env`)
and run `bash scripts/deploy-joonjin.sh` with Bun installed.
