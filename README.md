# Repo Doctor

This repository includes a `repo-doctor` script to help normalize and clean up the project structure if it becomes nested or disorganized.

### Why does this exist?

Sometimes, project files and folders (like `src/`, `public/`, `prisma/`, or `package.json`) can end up inside nested directories (e.g., `ilf-ebook-app/`). The repo doctor script safely moves all core project files and folders to the repository root, making the project easier to work with and maintain.

### How to run it

```bash
bash scripts/repo-doctor.sh
```

### What does it do?
- Detects the best project root using a scoring system (based on presence of `package.json`, `src/app`, configs, etc).
- Moves all core folders and config files to the repository root.
- If a destination already exists, it is renamed with a `__old` suffix before moving.
- Removes nested `node_modules` folders (but never touches the root `node_modules`).
- Cleans up empty directories after moving.
- Prints a summary of the new repo structure and recommended next steps.

This script is safe and idempotent: you can run it multiple times without risk of losing work. All replaced files/folders are backed up with a `__old` suffix.
# ILF_Ebook_App


## Cloudflare Deployment (Non-Interactive)

### Required Environment Variables

- `CLOUDFLARE_API_TOKEN` (required)
- `CLOUDFLARE_ACCOUNT_ID` (required)

### Token Permissions

- **Workers Scripts**: Edit (required)
- **Workers Tail**: Read (optional, for tailing logs)
- **Workers KV Storage**: Edit (optional, if using KV)

### Non-Interactive Deploy

To deploy without prompts:

```bash
npm run deploy:cf
# or
CI=1 wrangler deploy
```

To validate authentication:

```bash
npm run whoami:cf
# or
CI=1 wrangler whoami
```
