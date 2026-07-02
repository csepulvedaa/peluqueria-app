# Peluquería App

A mobile-first PWA for tracking hairdressing services and calculating monthly salary — built to replace a manual Excel spreadsheet.

**Live:** [peluqueria-app-one.vercel.app](https://peluqueria-app-one.vercel.app)

## Features

- **Monthly service log** — add services with name, date, type, and price
- **Automatic salary calculation** — Corte (50%), Color (47%), Tratamiento (45%), Brushing (50%)
- **IVA toggle** — switch between earnings with and without Chilean VAT (19%)
- **PWA** — installable on iOS and Android, works offline for last-viewed data
- **Magic link auth** — single-user, login via email link, session persists across devices

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Database + Auth | Supabase (Postgres + magic link) |
| Hosting | Vercel |
| UI | shadcn/ui (base-ui) + Tailwind CSS v4 |
| PWA | Manual service worker (`public/sw.js`) |

## Business Logic

```
Chilean VAT = 19%

Service percentages:
  Corte      → 50%
  Color      → 47%
  Tratamiento → 45%
  Brushing   → 50%

Per service:
  Earnings with VAT    = price × percentage
  Earnings without VAT = (price / 1.19) × percentage

Monthly summary:
  Total services = Σ price
  Total ex-VAT   = Σ (price / 1.19)
  VAT amount     = Total services − Total ex-VAT
  My earnings    = Σ earnings (based on active IVA toggle)
```

## Development

```bash
npm install
npm run dev
```

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Local dev bypass — skips auth and uses a local JSON file for storage
DEV_BYPASS_AUTH=true
```

### Database

Run migrations in order in your Supabase SQL Editor:

1. `supabase/migrations/0001_init.sql` — creates the `services` table with RLS policies
2. `supabase/migrations/0002_add_brushing.sql` — adds `Brushing` to the `tipo_servicio` enum

## Deployment

All changes go through pull requests. Merging a PR into `main` triggers an automatic production deployment on Vercel via GitHub Actions.

- **PR opened/updated** → preview deployment, URL posted as a PR comment
- **Merged to `main`** → production deployment to [peluqueria-app-one.vercel.app](https://peluqueria-app-one.vercel.app)

### Required GitHub Secrets

Add these in **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | Create at [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `team_kBYz8XYYSHBPjelA7p9UDoeG` |
| `VERCEL_PROJECT_ID` | `prj_T2GsFmfqkRy75Itj9nQBA7uT5PsE` |

## License

MIT
