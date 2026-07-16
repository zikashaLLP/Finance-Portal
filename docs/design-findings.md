# Portal — Design Findings & Improvement Roadmap

> **Generated:** July 16, 2026  
> **Scope:** All pages reviewed via live screenshots + code inspection  
> **Legend:** 🔴 Critical UX issue · 🟡 Moderate improvement · 🟢 Quick win · ✅ Already solid

---

## Table of Contents

1. [Cross-cutting Issues](#1-cross-cutting-issues)
2. [Dashboard](#2-dashboard)
3. [Transactions (Cash Book)](#3-transactions-cash-book)
4. [Gold Management](#4-gold-management)
5. [Silver Management](#5-silver-management)
6. [Ledger](#6-ledger)
7. [Finance Planning](#7-finance-planning)
8. [Karigar Management](#8-karigar-management)
9. [Karigar Reports](#9-karigar-reports)
10. [Bulk Manufacturing System](#10-bulk-manufacturing-system)
11. [Stock Management](#11-stock-management)
12. [Diamond Quality Tracking](#12-diamond-quality-tracking)
13. [Diamond Orders](#13-diamond-orders)
14. [Diamond Return & Reassortment](#14-diamond-return--reassortment)
15. [Harvest Plan Management](#15-harvest-plan-management)
16. [Approval Management](#16-approval-management)
17. [Sales Management](#17-sales-management)
18. [Implementable Quick Wins (Prioritised)](#18-implementable-quick-wins-prioritised)

---

## 1. Cross-cutting Issues

### 🔴 Duplicate notification bell
Ledger, Finance Planning, and Gold Management show **two bell icons** — one in the topbar and one rendered inside the page sub-header. Remove the in-page bell; keep only the topbar one.

### 🔴 Inconsistent page header style
- Transactions and Gold Management have a taller white header with a bottom border and custom topbar suppression.
- All other pages (Ledger, Finance, Stock, etc.) use a plain white card header with the page title.
- **Fix:** Standardise to one header pattern. The Gold/Transactions header style is richer — consider extending it to all pages.

### 🟡 Three distinct metric card designs in use
1. **Gold Management style** — large icon circle, coloured sub-label, tall card (~180px). Most premium.
2. **AnimatedMetricCard** — compact, label / value / sub-line / icon right. Standardised but plain.
3. **Transactions style** — large icon in pastel pill, tall card, trend badge underneath.

All pages should use **one** system. Recommended: use AnimatedMetricCard as the base but add optional coloured icon backgrounds for pages where colour context matters.

### 🟡 Button hierarchy not enforced
Primary and secondary actions use similar button weights across pages. Apply a clear rule:
- **Primary:** black filled (e.g. `+ New Sale`, `+ Create Order`)
- **Secondary:** outlined grey
- **Utility:** ghost / text link

### 🟡 Empty states missing
Filtered views with no results show plain "No data" text in a table row. Replace with a centred icon + label + clear-filter button.

### 🟢 Colour palette has too many accent colours
Blue, purple, green, orange, amber, and teal appear ad hoc across badges and icons. Define 5 semantic colours and stick to them:
- **Gold** (amber/yellow) → gold/commodity data
- **Success** (emerald) → completed, in-stock, received
- **Warning** (amber/orange) → pending, overdue
- **Danger** (red) → outflow, negative balance, delete
- **Info** (blue/slate) → neutral data, client badges

### 🟢 Table row height inconsistency
Some pages still use `py-2.5` in accordion inner tables. Standardise to `py-3.5` everywhere.

---

## 2. Dashboard

### ✅ Strengths
- Quick-access shortcut grid is a good "command centre" mental model.
- Total Portfolio Value is prominent in the top-right.

### 🔴 Portfolio value is unstyled
₹11.48 Cr is the most important number in the app. It displays as a plain right-aligned label. Give it a large display treatment — bigger font, subtle gold tint, maybe a thin amber underline.

### 🟡 Stat cards have no trend context
The 4 stat cards (Today's Sales, Active Clients, Pending Orders, Stock Items) show bare numbers. Add a micro sparkline or a `+X% this week` badge so numbers feel actionable rather than static.

### 🟡 Shortcut cards all look identical
8 quicklink cards share the same grey icon + label + description with no visual hierarchy:
- Colour icon backgrounds by domain (gold for Gold Ops, green for Sales, blue for Ledger).
- Mark "Most Used" with a warm background or coloured left border — not just a top-right text badge.
- Group into domain rows (Operations · Finance · Procurement) with faint section dividers.

### 🟢 Static date subtitle
"Thursday, July 16, 2026 · Your Daily Operations Hub" — replace the subtitle with a live alert count: e.g. "3 pending approvals · 5 overdue receivables".

---

## 3. Transactions (Cash Book)

### ✅ Strengths
- Two-panel reconciliation table (Cash + Bank side by side) is unique and functional.
- Account filter tabs (All / Cash / HDFC Bank / SBI Account) are clean.

### 🔴 Floating action button (FAB) has no label
The dark circle button in the bottom-right has an icon but no tooltip or label — users cannot tell what it does. Either label it (`+ Add Transaction`) or move it to the header as a named button.

### 🟡 Stat cards are too tall and icon-heavy
The 4 top cards have a large icon in a pastel circle taking ~40% of card height. Compact them: small icon top-left, large value, trend badge on the same line as the sub-label.

### 🟡 Reconciliation column group separator is too faint
`CASH` / `BANK (ALL)` column group headers use coloured text, but the visual separator between the two groups is barely a pixel. Add a visible vertical divider or a stronger column group background difference.

### 🟢 Alternating row shading barely visible
`bg-muted/10` on alternating rows is nearly imperceptible. Either remove it (clean white table) or increase to `bg-muted/20`.

---

## 4. Gold Management

### ✅ Strengths
- The 3 metric cards (Pure Gold Stock, Old Gold Stock, Gold Coins) are the best-looking cards in the app — large number, coloured sub-label ("24K refined"), icon circle. Should inspire the cross-app card standard.
- Pure Gold / Old Gold pill toggle is clean.
- Date filter summary bar (Opening / Closing / Transactions count) is a clever pattern.

### 🟡 Two tab styles on the same page
The Pure Gold / Old Gold selector is a pill-group toggle; Transactions / Daily Balance below is an underline tab. Two different tab styles on one page is inconsistent. Convert Transactions / Daily Balance to match the pill-group style.

### 🟡 Description column truncated with no fallback
The DESCRIPTION column clips with ellipsis and no way to see the full text. Add a `title` attribute or a hover popover.

### 🟢 Date filter bar pills are too small
Increase height (`py-2 px-4`) and group Opening / Closing / Transactions count in one bordered container so it reads as one "daily summary bar" unit.

---

## 5. Silver Management

### 🔴 Entry form dominates the viewport, pushing history off-screen
The "New Transaction" form occupies ~55% of the viewport, immediately hiding the 40-entry transaction history. On pages with persistent entry forms, use a **side-by-side layout** (form 30% / table 70%) or collapse the form behind a `+ New Transaction` toggle button.

### 🟡 Stock Summary tab metric sub-text is dense
The `sub` prop on AnimatedMetricCard shows "↑ X purchased · ↓ Y sold" all on one line. Consider a two-row sub layout or a small progress bar (stock vs total) for visual clarity.

### 🟢 No collapse toggle on the entry form
When the user is browsing the history table, the entry form above it is wasted space. A "Hide Form" / "Show Form" toggle would reclaim the viewport.

---

## 6. Ledger

### ✅ Strengths
- Best-structured page in the app. Party cards (avatar / name / phone / transaction count / balance badge) are clean and scannable.
- Filter tabs (All Parties / Suppliers / Clients / Karigar) are well-placed.

### 🟡 Balance badge colour does not show direction
Every balance badge is amber/orange regardless of whether money is owed to you or by you. Colour-code by direction:
- **Green badge** → money to receive from this party
- **Red/amber badge** → money you owe this party

### 🟡 No sort control beyond search
Add a sort dropdown (Balance: High to Low, Most Transactions, Recently Active) to help prioritise follow-up.

### 🟢 Party count badges on filter tabs
Add counts to each tab: "Suppliers (4) · Clients (3) · Karigar (2)" so users can orient without switching tabs.

### 🟢 Expand all / Collapse all toggle
For long party lists, an "Expand All" button lets power users scan all balances in one scroll.

---

## 7. Finance Planning

### 🔴 Page title bug
The topbar shows **"Dashboard / Overview"** on the Finance Planning page. Should be "Finance Planning".

### 🟡 Days Old badges have no colour coding
Badges like 15d, 56d, 24d are all the same neutral grey. Colour-code urgency:
- 🟢 `< 15 days` — green
- 🟡 `15–45 days` — amber  
- 🔴 `> 45 days` — red

### 🟡 "Set Timeline" looks like a disabled label
This is an important CTA in every row but reads as a secondary text link. Convert to a small outlined button or an icon-button.

### 🟢 Tab labels should include totals
"To Receive (15)" and "To Pay (25)" in the tab already show counts, but adding the amount — "To Receive ₹34.8L (15)" — would eliminate redundant glances at the metric cards above.

---

## 8. Karigar Management

### 🔴 Tab overflow — 6+ tabs clip on the row
"Karigars / Pending Orders / Executed Orders / Pending Diamonds / Diamond Issue / Receive Jewellery / + Create" — the row clips `+ Create` on any standard screen.

**Fix — consolidate into 3 primary tabs:**
- **Karigars** (list + management)
- **Orders** (sub-filter: Pending · Executed)
- **Diamonds** (sub-filter: Pending · Issue · Receive)

### 🟡 Karigar list rows are sparse
Each row shows Name, Phone, Address, Actions. Add an inline stat: active order count or outstanding balance, so users can triage without clicking "View Balance".

### 🟡 All avatar initials look identical (black circle)
Use a colour derived from the initial letter — as Ledger does — to differentiate karigars at a glance.

### 🟢 Show balance inline
Display the outstanding balance as a small badge next to the karigar name, with "View Balance" as a secondary detail action.

---

## 9. Karigar Reports

### ✅ Strengths
- Filter bar (Select Karigar / Report Type / Month / Year) is comprehensive.
- 5 AnimatedMetricCards with stagger animation work well.
- Export Report button is well-positioned.

### 🟡 Report tabs should be sticky
Orders / Materials / Receipts / Payments / Summary tabs disappear off the top as the user scrolls through long tables. Make the tab bar sticky so context is never lost.

### 🟢 "Generated on" timestamp styling
"Generated on 16 July 2026, 03:32 pm" reads at the same weight as the report title. Style it smaller and lighter (muted text).

---

## 10. Bulk Manufacturing System

### ✅ Strengths
- Table rows are information-rich (Lot + category, Karigar avatar, Client, Description, Pieces, Cost, Status) without feeling overwhelming.
- Status badges (Completed / In Progress) are clearly colour-coded.

### 🟡 6 header action buttons is cognitive overload
"Export to Excel · View Orders · Order Form · + Create Order · Issue Diamonds · Process Receipt" — all equal weight.

**Recommended grouping:**
- **Primary:** `+ Create Order`
- **Secondary dropdown (`⋯`):** Export to Excel, View Orders, Order Form
- **Contextual (appear on row select):** Issue Diamonds, Process Receipt

### 🟢 Lot number sub-label could use a colour dot
"Diamond Jewellery / Gold Jewellery" as grey text below the lot number is subtle. Add a colour dot (gold for Gold, blue/diamond for Diamond) for faster scanning.

---

## 11. Stock Management

### 🟡 Two banners before data occupy 35% of viewport
The green import status banner + amber opening stock warning appear before the user reaches any stock data.
- **Fix:** Collapse import status to a small chip/badge in the toolbar.
- Make the opening stock warning dismissible (with local state memory).

### 🟡 4 equal-weight toolbar buttons
"Download Template · Import Excel · Export Excel · Image URL Generator" all look the same. Differentiate:
- **Import Excel** → primary filled (most common workflow)
- **Download Template / Export Excel** → outlined
- **Image URL Generator** → ghost/text

### 🟢 Filter dropdowns need a container
The 3 dropdowns (Category / Source / Status) float on an open white surface. Wrap them in a `bg-muted/30` rounded bar.

### 🟢 "In Stock" should be the hero metric
"TOTAL STOCK: 30 / IN STOCK: 14 / SOLD: 16" — all equal weight. "In Stock" is the operationally critical number; highlight it with a larger value or distinct `valueColor`.

---

## 12. Diamond Quality Tracking

> ⚠️ **Densest page in the app.** Multiple quality grades each render a full two-panel table (Purchase History | Issue History) stacked vertically with no pagination or limit. With 5–8+ quality types (SHADE, 4D, CVD, 2D, 1D, Solitaire…) this creates an extremely long page where all data is simultaneously visible and navigation is impossible.

### 🔴 Vertical accordion stack is unnavigable

Each quality (SHADE, 4D, CVD…) renders as a full card with two tables inside. With 6 qualities at ~250px each this is 1,500px of unbroken content. Users cannot orient or jump to a specific quality.

**Recommended fix — Tab-per-quality:**
Replace the vertical stack with a horizontal quality tab bar:
```
[SHADE ▸ 2.53ct]  [4D ▸ 7.12ct]  [CVD ▸ ...]  [2D ▸ ...]  [1D]  ...
```
Each tab shows one quality's data. The page collapses to a fixed, manageable height.

**Alternative fix — True collapse accordion:**
Default all sections to collapsed; allow expanding one at a time. Currently the accordion header is clickable but all sections start expanded, defeating the purpose.

### 🔴 Side-by-side table layout is too narrow

Purchase History | Issue History at 50/50 width on a 1280px screen gives ~600px per table — tight for 4–5 columns. Numbers like "0.050 ct" and "₹13,064" are cramped.

**Recommended fix — Stacked tabs within each quality card:**
```
Quality: SHADE   Stock: 2.533 ct
[Purchase History]  [Issue History]   ← toggle tabs
```
Show one table at a time, full width. This doubles readability per table.

### 🔴 Only a single total shown in the page header

"Total Stock: 22.756 ct" in the header gives no breakdown. With multiple qualities, a quality breakdown summary helps users prioritise which section to inspect:

```
SHADE 2.53ct  ·  4D 7.12ct  ·  CVD 5.20ct  ·  2D 4.10ct  ·  ...
```
A compact summary row under the header (or as a set of small metric chips) would make the header genuinely useful for navigation.

### 🟡 Inner table rows are `py-2.5` (below canonical)
The inner table rows are shorter than the canonical `py-3.5`. On a data-critical page with small carat values this makes errors harder to catch visually. Standardise.

### 🟡 "Price (₹)" column is less useful than "Rate (₹/ct)"
Purchase rows show "Price (₹)" as a total (₹1, ₹13,064, ₹15,200) with no per-carat context. A "Rate (₹/ct)" column is more useful for comparing purchases across rows.

### 🟢 "Sync Missing Ledgers" button — purpose is unclear
Rename to "Sync to Ledger" or add a tooltip explaining what syncing does and when to use it.

---

## 13. Diamond Orders

### ✅ Strengths
- 6 status metric cards (Total / Pending / Confirmed / In Progress / Ready / Delivered) double as clickable filter tabs — excellent UX pattern that combines overview + filtering.

### 🟡 PROGRESS column uses text fractions instead of a visual bar
"0.000 / 0.800 ct · 0% sold" as two text lines conveys little at a glance. Replace with a thin progress bar (showing issued vs ordered carats) — a bar at 0% communicates status more immediately than a fraction.

### 🟡 TARGET DELIVERY column is mostly `—`
If delivery dates are usually unset, consider hiding this column by default or replacing with "Days Since Order" (always derivable from Order Date), which is never empty and gives urgency context.

### 🟢 6 equal-size status cards at narrow viewports
On narrow screens the 6-card row wraps awkwardly. Make "Total Orders" the hero card (slightly larger) and show status counts as smaller secondary cards.

---

## 14. Diamond Return & Reassortment

### ✅ Strengths
- Two-panel layout (entry form left / pending issues list right) is well-suited to the workflow — form and context visible simultaneously.
- Quality badge (CVD, 2D, 1D) in the pending issues list adds useful context.

### 🟡 No inline validation feedback on the form
Fields (Original Issue, Karigar, Returned Weight, Notes) have no field-level error hints. For a data-critical form, add validation with a confirmation summary before submission.

### 🟡 Tab labels lack count badges
"Receive Returns / Reassortment / Return History / Completed" — users can't tell how many items are in each tab without switching. Add counts: "Receive Returns (6)", "Reassortment (3)".

### 🟢 "Record Return" CTA is far from the first field
The full-width black button at the bottom of the form requires scrolling. Make it sticky within the form panel so it's always visible.

---

## 15. Harvest Plan Management

### ✅ Strengths
- Table is clean: Plan Name / Client / Type badge / Group + Card / Total Value / Monthly / Duration.
- Type badges (Diamond, Gold) are colour-coded with matching icons.
- AnimatedMetricCard stat row is well-implemented.

### 🟡 Duplicate plan names obscure the primary identifier
Many rows share "Diamond Harvest Plan" as the plan name. The differentiating data is Client and Group/Card. Consider making the plan name a secondary label and elevating Client name as the row's primary identifier.

### 🟡 No installment progress column
Each plan has a duration and monthly amount but no "payments made / total" indicator. Adding this makes the table actionable (who is behind on payments?) rather than purely informational.

### 🟢 Pagination lacks item count
"Page 1 of 2" — add "Showing 1–8 of 15 plans" for better orientation.

---

## 16. Approval Management

### ✅ Strengths
- Approval # badge (`APP000216`) styled as monospace pill — distinctive and scannable.
- Item detail (name, weight, karat) shown as two-line cell — good information density.

### 🟡 Filter bar is above metric cards — breaks visual flow
Standard layout: Title → Metrics → Filters → Table. Having filters before metrics means the user sees them before understanding the summary context. Move the filter bar between the metric cards and the table.

### 🟡 Source column is three-line stacked
"Stock Item · GLR/24 · VENDOR" stacked in three levels inflates row height. Flatten: item reference as main text, "Vendor" / "Client" as a small badge beside it.

### 🟢 Status badge consistency
"Given" and "Received" have subtly styled badges. Ensure an "Overdue" status (if applicable) uses the red danger colour from the shared semantic palette.

---

## 17. Sales Management

### 🟡 5 action icon buttons per row — too dense
Each row has: view (doc), download, edit, share, delete — 5 icon buttons clustered at ~24px each with minimal spacing.

**Fix:**
- Show only **Edit** and **Delete** inline.
- Move view / download / share into a `⋯` overflow menu.

### 🟡 Payment column two-line layout inflates row height
`₹0.00 / Pending: ₹18,540.00` stacked makes rows taller than needed and buries the important "Pending" amount in the second line. Flatten: total on one line, then a red `Pending ₹18.5K` badge inline.

### 🟡 Metric cards have no icons and no colour
Total Bills / Total Revenue / Pending are bare text-only cards. Apply AnimatedMetricCard with icons; use red for Pending to signal urgency.

### 🟢 Search bar is in an unusual position
The search is placed top-right next to the page description and "+ New Sale" button. Move it to a standard search + filter bar between the metric cards and the table.

---

## 18. Implementable Quick Wins (Prioritised)

These are self-contained changes — each can be implemented independently without touching protected files (Gold Management, Transactions Cash Book).

| # | Page | Change | Effort |
|---|---|---|---|
| 1 | All pages | Remove duplicate notification bell icons | XS |
| 2 | Finance Planning | Fix page title ("Dashboard" → "Finance Planning") | XS |
| 3 | Finance Planning | Colour-code Days Old badges (green / amber / red thresholds) | S |
| 4 | Finance Planning | Add amount to tab labels ("To Receive ₹34.8L") | XS |
| 5 | **Diamond Quality Tracking** | Replace vertical accordion stack with tab-per-quality bar | L |
| 6 | **Diamond Quality Tracking** | Replace side-by-side tables with Purchase / Issue toggle tabs (full-width) | M |
| 7 | **Diamond Quality Tracking** | Add quality stock breakdown summary row under page header | S |
| 8 | **Diamond Quality Tracking** | Standardise inner table rows to `py-3.5` | XS |
| 9 | Ledger | Colour balance badges by direction (green = receivable, red/amber = payable) | S |
| 10 | Ledger | Add count badges to filter tabs (Suppliers · Clients · Karigar) | XS |
| 11 | Karigar Management | Consolidate 6 overflowing tabs → 3 tabs with sub-filters | M |
| 12 | Sales Management | Collapse 5 row action buttons → Edit + Delete + `⋯` overflow | S |
| 13 | Sales Management | Flatten payment column (remove two-line stacked layout) | S |
| 14 | Silver Management | Collapse entry form behind `+ New Transaction` toggle | M |
| 15 | Stock Management | Move import status to toolbar chip; make warning banner dismissible | S |
| 16 | Transactions | Label the unlabelled floating action button | XS |
| 17 | Diamond Orders | Replace progress text fraction with a thin progress bar | S |
| 18 | Bulk Manufacturing | Reduce 6 header buttons → 1 primary + 1 secondary dropdown | S |
| 19 | All tables | Add hover popover/tooltip for truncated description cells | S |
| 20 | Dashboard | Colour-code shortcut card icons by domain category | S |

**Effort scale:** XS = < 30 min · S = 30–90 min · M = 2–4 hrs · L = 4–8 hrs

---

## Implementation Notes

- **Protected pages:** Gold Management (PureGoldTab, OldGoldTab) and Transactions (CashBookTable, DailyReconciliationTable) must not be modified unless explicitly requested — they serve as design reference implementations.
- **Shared components:** Use `AnimatedMetricCard` (`@/shared/components/AnimatedMetricCard`) for all new stat cards. Use `SharedPagination` (`@/shared/components/Pagination`) for all paginators. Do not create inline alternatives.
- **Table theads:** Canonical style is `bg-muted/30` thead, `px-5 py-3.5` th/td, `text-[11px] font-semibold uppercase tracking-wider`.
- **AppModal:** The `AppModal` body slot has no padding — each modal adds its own `px-6 pt-4 pb-5` wrapper.
