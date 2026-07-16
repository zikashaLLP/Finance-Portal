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
18. [Purchase Management](#18-purchase-management)
19. [Vendor Management](#19-vendor-management)
20. [Client Management](#20-client-management)
21. [Team Management](#21-team-management)
22. [Ground Staff Tracking](#22-ground-staff-tracking)
23. [Stock Tally Report](#23-stock-tally-report)
24. [Stock Summary](#24-stock-summary)
25. [Material Tracking Reports](#25-material-tracking-reports)
26. [Transaction Reports](#26-transaction-reports)
27. [Harvest Plan Groups](#27-harvest-plan-groups)
28. [Settings & Help Center](#28-settings--help-center)
29. [Implementable Quick Wins (Prioritised)](#29-implementable-quick-wins-prioritised)

---

## 1. Cross-cutting Issues

### 🔴 Topbar title is hardcoded "Dashboard / Overview" on most pages — root cause identified
`Topbar.tsx` has a single `getPageContext()` function that only handles `/ledger`. Every route not in the suppression list falls back to `{ title: "Dashboard", subtitle: "Overview" }`. Routes currently affected:
- `/finance` → shows "Dashboard / Overview" (should be "Finance Planning")
- `/team` → shows "Dashboard / Overview" (should be "Team Management")
- `/ground-staff` → shows "Dashboard / Overview" (should be "Ground Staff Tracking")
- `/settings` and `/help` → shows "Dashboard / Overview" on a "Page Not Found" screen

**Fix:** Expand `getPageContext()` with an entry for every active route, or switch to a route-driven title approach (e.g. a `usePageTitle()` hook that pages push their title into).

### 🔴 Duplicate notification bell
Finance Planning and Gold Management show **two bell icons** — one in the topbar and one rendered inside the page sub-header. The in-page bell in `FinancePlanning.tsx` imports `Bell` from lucide-react and renders it manually even though the topbar already has one. Remove the in-page bell; keep only the topbar one.

### 🔴 Inconsistent page header style
- Transactions and Gold Management suppress the topbar and own their full header (white bar with bottom border, large title, action buttons).
- All other pages use a plain `<div>` inside the page content with a title + subtitle — no consistent header component.
- **Fix:** Create a shared `<PageHeader>` component and use it everywhere, or extend the topbar suppression approach consistently to all pages.

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

## 18. Purchase Management

**Route:** `/purchase`

### 🔴 Page header layout is broken
The title "Purchase Management" is placed in the top-left, but the search bar, type filter dropdown, "Sync Gold Ledgers" button, and "+ Record Purchase" primary button are all jammed into the same header row to its right. The title wraps to two lines to make room. This is the most broken header layout in the app.

**Fix:** Separate the page title (with subtitle) into its own row above a dedicated toolbar row containing search + filter + action buttons.

### 🟡 "Sync Gold Ledgers" button — purpose is unclear
A secondary button in the header reads "Sync Gold Ledgers" with a refresh icon. Users cannot tell from the label what syncing does, when to do it, or what happens if they don't. Rename to "Sync to Ledger" and add a tooltip or small description explaining the action.

### 🟡 ITEM NAME column often duplicates ITEM TYPE
For "Loose Diamond" rows, ITEM NAME always reads "Loose Diamond" — identical to ITEM TYPE. No additional information is conveyed. Consider merging these columns or hiding ITEM NAME when it equals ITEM TYPE.

### 🟡 GOLD WEIGHT column is `—` for 75% of rows
Most purchases are diamonds and show `—` in this column. A column that is empty most of the time wastes horizontal space. Make it conditional: hide the column when viewing only non-gold types, or show it only in the "Gold Jewellery" / "Pure Gold" filter view.

### 🟢 Metric cards below the broken header use AnimatedMetricCard — good
AnimatedMetricCard is correctly used here. However the 4 cards (Total Purchases, Total Spend, Diamond Orders, Gold Orders) have no icons and no colour differentiation.

---

## 19. Vendor Management

**Route:** `/purchase/vendors`

### 🟡 CONTACT DETAILS and ADDRESS columns are entirely empty
Every row shows `—` in both columns. These two columns occupy ~35% of table width for zero information. Either populate mock data or hide these columns by default behind a "Show Details" toggle or a row expand.

### 🟡 Vendor ID is exposed as a user-visible label
"ID: 269" is shown below every vendor name as a grey sub-label. Database IDs are internal implementation details. Remove or replace with something meaningful (e.g. date added, transaction count).

### 🟢 3 stat cards (Total Vendors / Diamond Vendors / Gold Vendors) use bare text
No icons, no animation. Adopt AnimatedMetricCard. Use the semantic diamond (blue) and gold (amber) colours for the sub-cards.

### 🟢 Category badge missing on several rows
Some vendors have no category badge (`—`). These appear less important than vendors with "Diamond" or "Gold" badges. Consider showing "General" as a default badge rather than nothing.

---

## 20. Client Management

**Route:** `/sales/clients`

### 🟡 Three data columns (CONTACT DETAILS / PERSONAL INFO / ADDRESS) are entirely `—`
All 20 clients show empty data in these three columns, which together take ~55% of table width. The table effectively has only 3 useful columns (Client, Registration Date, Actions). Either populate mock data or collapse these into a client detail panel that expands on row click.

### 🟡 Client ID is exposed as a user-visible label
"ID: 823" is shown below every name. Same issue as Vendor Management — remove or replace with business-meaningful data.

### 🟡 VIP indicator is a tiny crown emoji in the avatar area
VIP clients have a small crown icon overlaid on the avatar. This is easy to miss. Consider a visible VIP badge (gold pill) next to the client name, or a separate VIP column, so the 4 VIP clients are clearly scannable.

### 🟢 "Filter" button exists but has no visible options
Clicking the Filter button (top-right) should reveal filter controls. If no filters are implemented yet, remove the button or replace it with a clear placeholder ("Coming soon").

### 🟢 3 stat cards use bare text — same issue as Vendor Management
Apply AnimatedMetricCard with icons. "VIP Clients" card should use amber/gold styling to match the VIP concept.

---

## 21. Team Management

**Route:** `/team`

### 🔴 Page title shows "Dashboard / Overview" (topbar bug)
The Topbar `getPageContext()` function has no entry for `/team`, so it falls back to the default "Dashboard / Overview". Should be "Team Management / Manage your team members".

### 🟡 All 4 role stat cards show 0
The mock data file (`mockTeam`) contains no pre-populated members, so all four cards (Owner / Accounts Team / Karigar Team / Sales Team) display `0`. A page with all zeros provides no design value or usability feedback. Add a few mock members so the layout can be validated.

### 🟡 Stat cards use a unique fourth card design
The 4 role cards (Owner / Accounts Team / etc.) use a design not seen elsewhere: large bold number top-left, icon bottom-right, description below the number. This is a fifth distinct card pattern in the app. Adopt AnimatedMetricCard or the Gold Management card style to unify.

### 🟢 Empty state is the best in the app
The "No team members yet" empty state with an illustration icon and a centred "Add Team Member" CTA is the only proper empty state in the entire portal. All other pages should adopt this pattern for their zero-data states.

---

## 22. Ground Staff Tracking

**Route:** `/ground-staff`

### 🔴 Page title shows "Dashboard / Overview" (topbar bug)
Same root cause as Team Management. Should be "Ground Staff Tracking / Track deliveries and dispatches".

### 🟡 Dispatch items use a card-list layout, not a table
All other data-heavy pages use tables. Ground Staff uses individual white cards stacked vertically with no column alignment. This means:
- Staff name + date are on the same line but in different visual weights with no column boundary
- The From → To route uses map-pin icons and an arrow — visually appealing but not scannable at volume

At 6 items this works; at 50 items it would be unmanageable. Consider a hybrid: keep the card aesthetic but align fields in implicit columns using CSS grid.

### 🟡 Stat filter cards (All / Dispatched / Delivered / Returned) use a fifth unique card style
These 4 cards are horizontal: icon left + large count + label below. They function as clickable filters (clicking "Dispatched" filters the list). This is a solid UX pattern. However the card design is unique — not reused anywhere else. Consider using a variant of AnimatedMetricCard with `isFilterActive` styling.

### 🟡 No date/time filter
All dispatch entries are sorted by date, but there's no way to filter by date range. A "Today / This Week / All" quick filter would immediately reduce noise for daily operations.

### 🟢 Edit/delete icons visible on every row without a hover state
The pencil and trash icons appear at full opacity at all times on the right of each card. A hover-reveal pattern (show on row hover only) would clean up the list's visual weight.

---

## 23. Stock Tally Report

**Route:** `/stock/tally`

### 🟡 Yes/No verification buttons have no visible selected state
Each category row has `✓ Yes` and `✗ No` pill buttons. When neither is pressed yet, both appear with the same styling. After pressing "Yes", the selected state needs to be unmistakably clear (e.g. `Yes` fills green, `No` turns grey). The current design may have a subtle selected state but it's hard to distinguish at a glance during a fast daily tally.

### 🟡 Two-column layout (Gold Jewelry | Diamond Jewelry) has no vertical scroll within panels
The category list within each column continues off-screen. The user must scroll the entire page to see all categories. Better: make each column independently scrollable with a fixed height (`max-h-[60vh] overflow-y-auto`), so users can tally both category groups without losing sight of the progress bar at the bottom.

### 🟡 "Submit Daily Report" has no confirmation step
Clicking submit is an irreversible daily action (it closes the tally for the day). Add a confirmation dialog: "Submit report for 16 July 2026? This cannot be undone."

### 🟢 Progress bar is well-designed
"Tally Progress: 0 of 31 categories verified — 0% — Reset All" is clear and functional. One improvement: change the bar colour from grey to green as progress increases (0% grey → 50% amber → 100% green).

### 🟢 "View History" button is well-placed
Top-right placement next to the date picker is clean. No changes needed.

---

## 24. Stock Summary

**Route:** `/stock/summary`

### 🔴 Distribution bars are not proportional to the actual data
The "Stock Distribution by Value" section shows bars for each category. "Pure Gold Stock at 44.7%" should show a bar nearly half the full width. "Gold Jewelry at 0.3%" should be nearly invisible. Instead, all bars appear similar in length — the bars are not scaled correctly to percentages. This makes the visualisation misleading.

**Fix:** Set `style={{ width: percentage + "%" }}` on each bar and give the bar container `w-full`. Use the existing green/amber colour tokens for the fill.

### 🟡 Large blank whitespace below the distribution section
The page ends with ~400px of empty white space below the distribution bars. The cards above do not fill the viewport. Fix: either add more data sections (e.g. Recent Movements, Quick Links to each stock module) or simply reduce the page padding.

### 🟡 The 5 summary cards use a fifth custom bespoke card design
Gold Jewelry / Diamond Jewelry / Loose Diamonds / Pure Gold Stock / Old Gold Stock cards each have a unique layout (icon top-left, item count top-right, bullet list of sub-metrics). This is a fifth distinct card pattern. Standardise — these could use a slightly larger AnimatedMetricCard variant.

### 🟡 No drill-down from summary cards to detailed stock pages
Each category card shows its totals but clicking it does nothing. Add a subtle "View Details →" link at the bottom of each card linking to the relevant sub-page (e.g. Gold Jewelry → `/stock`, Loose Diamonds → `/diamond/tracking`).

### 🟢 TOTAL VALUE header (₹23,82,64,649.28) is prominent — good
The top-right total value is well-placed and clearly styled. No changes needed. Consider formatting in crores (₹23.82 Cr) for readability alongside the raw number.

---

## 25. Material Tracking Reports

**Route:** `/stock/material`

### 🟡 Stat card sub-text overflows on narrow values
"Issued: 0.000g | Received: 0.000g" in the Gold Balance card sub-line is a long string that may wrap or clip at standard card widths. Use two separate lines or abbreviate: "Issued 0g · Rcvd 0g".

### 🟡 "Material Flow Analysis" section shows all zeros with "Positive Balance" badges
All flows show `0.000g` issued and `0.000g` received, yet both badges read "• Positive Balance" in green. A zero balance is not positive — it's neutral. The badge logic should show "• Balanced" for zero and reserve "Positive Balance" (green) for actual surplus.

### 🟡 Report Filters: Download Report button is in the filter row
The "Download Report" black button is placed at the end of the filter row (Report Type / All Karigars / Date Range / **Download Report**). The download is an output action, not a filter parameter. Move it out of the filter bar and into a toolbar area above the results, or below the data.

### 🟢 Filter bar is comprehensive and well-spaced
Three dropdowns (Report Type, Karigar, Date Range) are logically ordered and easy to use. No structural issues.

---

## 26. Transaction Reports

**Route:** `/reports`

### 🟡 Date inputs use native browser chrome, not the app's custom calendar
Both "From Date" and "To Date" fields use `<input type="date">` which renders the browser's native date picker — a completely different visual style from the shadcn/ui Calendar used everywhere else in the app (e.g. Gold Management date filter, Transactions date picker). Replace with the app's Calendar + Popover pattern.

### 🟡 Master-detail layout: right panel doesn't update when report type changes
Clicking a different report type in the left list (e.g. "Monthly Summary Report") does not visually update the right panel's title/description beyond swapping text. The configuration options (date range, generate button) remain identical for all types. If configuration options differ by report type, make them type-specific. If they're always the same, make the selected report type visually active (filled background + checkmark) so users know their selection is registered.

### 🟢 "Today / Last 7 Days / This Month" quick-select pills are a good pattern
These shortcuts reduce date-picker friction. No changes needed.

### 🟢 "Generate Report" button is prominent and clearly labelled
Black filled button with icon and label. Correct primary button style. No changes needed.

---

## 27. Harvest Plan Groups

**Route:** `/harvest/groups`

### 🟡 CAPACITY progress bars are 1–2 px tall and nearly invisible
The capacity column shows a thin grey bar + percentage text. The bar itself is so thin it reads as a decorative rule rather than a progress indicator. Increase to `h-1.5` (6px) with rounded ends and use a colour: green for >50%, amber for 25–50%, grey for <25%.

### 🟡 TYPE column contains inconsistent values
Some rows show "DIAMOND" (category badge), some show "GRP-18" (a group ID), and some show `—`. These are different kinds of data mixed into one column. If TYPE means the plan category, it should always be a category badge. "GRP-18" looks like a group reference ID — it belongs in a separate column or tooltip.

### 🟡 All groups are "ACTIVE" — status column adds no value in this state
With all 20 groups showing green "ACTIVE" badges, the STATUS column is visually uniform and adds no scanning value. Consider hiding or de-emphasising when all items share the same status, or ensure inactive groups exist in mock data to validate the design.

### 🟢 Table columns are well-chosen
GROUP / STATUS / TYPE / ASSIGNED / ACTIVE / AVAILABLE / CAPACITY covers the right dimensions for group management. No structural changes needed.

---

## 28. Settings & Help Center

**Routes:** `/settings`, `/help`

### 🔴 Both routes show "Dashboard / Overview" on a "Page Not Found" error screen
Users who click Settings or Help Center from the sidebar land on a blank screen that shows the shared "Page Not Found / This module is currently under development" message — but with the Topbar still displaying "Dashboard / Overview". The combination of wrong title + error message is confusing.

**Fix (short-term):** Add `/settings` and `/help` to `getPageContext()` so the title at least reflects where the user is:
```ts
if (location.startsWith("/settings")) return { title: "Settings", subtitle: "Application settings" };
if (location.startsWith("/help"))     return { title: "Help Center", subtitle: "Support & documentation" };
```

**Fix (long-term):** Build stub pages with a proper "Coming Soon" layout that matches the ComingSoon component, showing the page title and an ETA or description.

### 🟡 Sidebar links point to pages that don't work
Help Center and Settings are visible in the sidebar for all users but lead nowhere. This erodes trust. Either build stub pages with a "Coming Soon" treatment, or temporarily hide these items from the sidebar navigation until they're implemented.

---

## 29. Implementable Quick Wins (Prioritised)

These are self-contained changes — each can be implemented independently without touching protected files (Gold Management, Transactions Cash Book).

> **Note:** Finance Planning's Days Old badge colour-coding (green/amber/red) is already implemented in code (`daysOldBadge()` function in `FinancePlanning.tsx`). Items below reflect current state.

| # | Page | Change | Effort |
|---|---|---|---|
| 1 | **Topbar.tsx** | Add `getPageContext()` entries for `/team`, `/ground-staff`, `/finance`, `/settings`, `/help` | XS |
| 2 | All pages | Remove duplicate notification bell icon in FinancePlanning (imports `Bell` from lucide manually) | XS |
| 3 | **Purchase Management** | Separate title row from toolbar row — fix broken header layout | S |
| 4 | Settings / Help | Add `/settings` and `/help` to topbar context; build stub Coming Soon pages | S |
| 5 | Finance Planning | Add amount to tab labels ("To Receive ₹34.8L") | XS |
| 6 | **Diamond Quality Tracking** | Replace vertical accordion stack with tab-per-quality bar | L |
| 7 | **Diamond Quality Tracking** | Replace side-by-side tables with Purchase / Issue toggle tabs (full-width) | M |
| 8 | **Diamond Quality Tracking** | Add quality stock breakdown summary row under page header | S |
| 9 | **Diamond Quality Tracking** | Standardise inner table rows to `py-3.5` | XS |
| 10 | Stock Summary | Fix distribution bars to be proportional (`width: percentage%`) | S |
| 11 | Stock Tally | Make Yes/No buttons have unmistakably distinct selected state | S |
| 12 | Stock Tally | Add confirmation dialog before "Submit Daily Report" | S |
| 13 | Ledger | Colour balance badges by direction (green = receivable, red/amber = payable) | S |
| 14 | Ledger | Add count badges to filter tabs (Suppliers · Clients · Karigar) | XS |
| 15 | Material Reports | Fix "Positive Balance" badge to show "Balanced" when flow is zero | XS |
| 16 | Karigar Management | Consolidate 6 overflowing tabs → 3 tabs with sub-filters | M |
| 17 | Sales Management | Collapse 5 row action buttons → Edit + Delete + `⋯` overflow | S |
| 18 | Sales Management | Flatten payment column (remove two-line stacked layout) | S |
| 19 | Silver Management | Collapse entry form behind `+ New Transaction` toggle | M |
| 20 | Stock Management | Move import status to toolbar chip; make warning banner dismissible | S |
| 21 | Transactions | Label the unlabelled floating action button | XS |
| 22 | Diamond Orders | Replace progress text fraction with a thin progress bar | S |
| 23 | Bulk Manufacturing | Reduce 6 header buttons → 1 primary + 1 secondary dropdown | S |
| 24 | Harvest Plan Groups | Fix CAPACITY bar height from 1px to 6px with colour coding | XS |
| 25 | Reports | Replace native `<input type="date">` with the app's Calendar + Popover | M |
| 26 | Vendor / Client Mgmt | Hide or stub the empty CONTACT DETAILS / ADDRESS / PERSONAL INFO columns | S |
| 27 | Vendor / Client Mgmt | Remove database ID sub-labels ("ID: 269") from visible rows | XS |
| 28 | Team Management | Populate mock team member data so stat cards aren't all 0 | XS |
| 29 | All tables | Add hover popover/tooltip for truncated description cells | S |
| 30 | Dashboard | Colour-code shortcut card icons by domain category | S |

**Effort scale:** XS = < 30 min · S = 30–90 min · M = 2–4 hrs · L = 4–8 hrs

---

## Implementation Notes

- **Protected pages:** Gold Management (PureGoldTab, OldGoldTab) and Transactions (CashBookTable, DailyReconciliationTable) must not be modified unless explicitly requested — they serve as design reference implementations.
- **Shared components:** Use `AnimatedMetricCard` (`@/shared/components/AnimatedMetricCard`) for all new stat cards. Use `SharedPagination` (`@/shared/components/Pagination`) for all paginators. Do not create inline alternatives.
- **Table theads:** Canonical style is `bg-muted/30` thead, `px-5 py-3.5` th/td, `text-[11px] font-semibold uppercase tracking-wider`.
- **AppModal:** The `AppModal` body slot has no padding — each modal adds its own `px-6 pt-4 pb-5` wrapper.
