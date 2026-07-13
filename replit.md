# Portal — Accounting

A frontend accounting web app for a jewellery/gold business. Tracks cash transactions, gold stock, and daily balances.

## Run & Operate

- `pnpm --filter @workspace/portal run dev` — start the portal (served at `/`)
- `pnpm run typecheck` — typecheck all artifacts

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React 19 + Vite 7
- Tailwind CSS v4
- shadcn/ui component library
- wouter (client-side routing)
- framer-motion (animations)
- All data is mock — no backend or database

## Where things live

```
artifacts/portal/src/
├── app/               — router (wouter) + MainLayout shell
├── components/ui/     — shadcn/ui primitives
├── shared/components/ — Sidebar, Topbar, AppModal (reusable modal shell)
├── modules/
│   ├── gold/          — Gold Management page (/gold)
│   └── transactions/  — Cash Book / Transactions page (/transactions)
└── pages/             — ComingSoon, NotFound
```

- Theme: `src/index.css` (Tailwind v4 tokens)
- Routes: `src/app/router/AppRouter.tsx`
- Shared modal shell: `src/shared/components/AppModal.tsx`

## Architecture decisions

- Frontend-only — all data lives in `modules/*/data/mock*.ts` files
- Topbar is suppressed on `/gold` and `/transactions` (those pages own their own header)
- All modals use the `AppModal` shell for consistent structure
- Black primary buttons, light sidebar, grey canvas, floating white cards

## Product

- **Cash Book** (`/transactions`) — income/expense transactions with pagination, edit modal, opening balance, and daily reconciliation
- **Gold Management** (`/gold`) — pure gold & old gold tabs, metric cards, transactions table (edit modal), daily balance table, opening balance modal

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `no-scrollbar` utility is defined in `src/index.css` under `@layer utilities`
- Calendar uses a custom `MonthCaption` component — do not restore the default Nav/MonthCaption
- `AppModal` body slot has no padding — each modal adds its own `px-6 pt-4 pb-5` wrapper
