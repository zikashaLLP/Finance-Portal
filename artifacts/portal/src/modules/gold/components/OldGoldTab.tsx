import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Pencil, Flame, Trash2, Package, Gem, TrendingDown, Percent, Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  mockOldGoldItems,
  mockMeltingRecords,
  mockBalanceByDate,
  mockDeletionAudit,
  getOldGoldStats,
  type OldGoldItem,
} from "../data/mockOldGold";

type SubTab = "box" | "melting" | "balance" | "audit";

const PAGE_SIZE = 10;

const fmtW = (n: number) => `${n.toFixed(2)} g`;

function Pagination({
  page, total, onChange,
}: { page: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
      <span className="text-xs text-muted-foreground">
        Page {page} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="h-7 px-2.5 rounded-md border border-border text-xs text-muted-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={cn(
              "h-7 w-7 rounded-md text-xs font-medium transition-colors",
              n === page ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:bg-muted/40",
            )}
          >
            {n}
          </button>
        ))}
        <button
          onClick={() => onChange(Math.min(total, page + 1))}
          disabled={page === total}
          className="h-7 px-2.5 rounded-md border border-border text-xs text-muted-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function MetricCard({
  title, value, sub, icon, accent, index, negative, children,
}: {
  title: string; value: string; sub: string;
  icon: React.ReactNode; accent: string; index: number;
  negative?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className="bg-card border border-border rounded-[18px] p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="mb-3">
        <div className="p-2.5 rounded-full inline-flex items-center justify-center" style={{ backgroundColor: accent + "20", color: accent }}>
          {icon}
        </div>
      </div>
      <p className="text-[13px] font-medium text-muted-foreground mb-1">{title}</p>
      <h3 className={cn("text-[26px] font-semibold tracking-tight mb-1", negative ? "text-red-600" : "text-foreground")}>
        {value}
      </h3>
      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: accent + "15", color: accent }}>
        {sub}
      </span>
      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}

/* ── OLD GOLD BOX TABLE ── */
function OldGoldBoxTable({ search }: { search: string }) {
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return mockOldGoldItems;
    return mockOldGoldItems.filter(
      (i) => i.lotNumber.toLowerCase().includes(q) || i.description.toLowerCase().includes(q),
    );
  }, [search]);

  // Reset to page 1 whenever the search query changes
  useEffect(() => { setPage(1); }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, Math.max(1, totalPages));
  const rows = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Lot Number", "Description", "Gross Wt.", "Net Wt.", "Purity", "Pure Gold", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No items match your search.
                </td>
              </tr>
            ) : rows.map((row: OldGoldItem, i) => {
              const inBox = row.status === "In Box";
              return (
                <tr key={row.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                  <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">{row.lotNumber}</td>
                  <td className="px-4 py-3 text-foreground max-w-[200px] truncate">{row.description}</td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-muted-foreground">{fmtW(row.grossWeight)}</td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-muted-foreground">{fmtW(row.netWeight)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">{row.purity}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums font-semibold text-amber-700">{fmtW(row.pureGold)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {inBox ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        In Box
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">
                        <Flame className="h-3 w-3" /> Melted
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <button className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      {inBox && (
                        <>
                          <button className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button className="h-7 w-7 flex items-center justify-center rounded-md border border-orange-200 text-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-colors">
                            <Flame className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                      <button className="h-7 w-7 flex items-center justify-center rounded-md border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination page={clampedPage} total={totalPages} onChange={setPage} />
    </div>
  );
}

/* ── MELTING RECORDS TABLE ── */
function MeltingRecordsTable() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(mockMeltingRecords.length / PAGE_SIZE));
  const rows = mockMeltingRecords.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Lot Number", "Melt Date", "Gross Wt.", "Net Wt.", "Purity", "Pure Gold Yield", "Notes", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">{row.lotNumber}</td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{row.meltDate}</td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums text-muted-foreground">{fmtW(row.grossWeight)}</td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums text-muted-foreground">{fmtW(row.netWeight)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">{row.purity}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums font-semibold text-amber-700">{fmtW(row.pureGoldYield)}</td>
                <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{row.notes}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-md border border-red-200 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={totalPages} onChange={setPage} />
    </div>
  );
}

/* ── BALANCE BY DATE TABLE ── */
function BalanceByDateTable() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(mockBalanceByDate.length / PAGE_SIZE));
  const rows = mockBalanceByDate.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Date", "Items Added", "Items Melted", "Pure Gold Produced", "Running Balance"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{row.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-emerald-700 font-medium tabular-nums">+{row.itemsAdded}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {row.itemsMelted > 0
                    ? <span className="text-orange-600 font-medium tabular-nums">{row.itemsMelted}</span>
                    : <span className="text-muted-foreground">—</span>}
                </td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums font-medium text-amber-700">
                  {row.pureGoldProduced > 0 ? fmtW(row.pureGoldProduced) : "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap tabular-nums font-semibold text-foreground">
                  {fmtW(row.runningBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={totalPages} onChange={setPage} />
    </div>
  );
}

/* ── DELETION AUDIT TABLE ── */
function DeletionAuditTable() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(mockDeletionAudit.length / PAGE_SIZE));
  const rows = mockDeletionAudit.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Lot Number", "Description", "Deleted At", "Reason", "Deleted By"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className={cn("border-b border-border last:border-0 hover:bg-muted/20 transition-colors", i % 2 !== 0 && "bg-muted/10")}>
                <td className="px-4 py-3 font-mono text-xs text-foreground whitespace-nowrap">{row.lotNumber}</td>
                <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{row.description}</td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground text-xs">{row.deletedAt}</td>
                <td className="px-4 py-3 text-muted-foreground max-w-[220px] truncate">{row.reason}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">{row.deletedBy}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} total={totalPages} onChange={setPage} />
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export default function OldGoldTab() {
  const [subTab, setSubTab] = useState<SubTab>("box");
  const [search, setSearch]  = useState("");

  const stats = useMemo(() => getOldGoldStats(), []);

  const inBoxCount   = mockOldGoldItems.filter((i) => i.status === "In Box").length;
  const meltingCount = mockMeltingRecords.length;
  const balanceCount = mockBalanceByDate.length;
  const auditCount   = mockDeletionAudit.length;

  const SUB_TABS: { key: SubTab; label: string; count: number }[] = [
    { key: "box",     label: "Old Gold Box",     count: mockOldGoldItems.length },
    { key: "melting", label: "Melting Records",  count: meltingCount },
    { key: "balance", label: "Balance by Date",  count: balanceCount },
    { key: "audit",   label: "Deletion Audit",   count: auditCount   },
  ];

  const metrics = [
    {
      title: "Total Box Items",
      value: String(stats.totalBoxItems),
      sub: `${stats.meltedCount} melted`,
      icon: <Package className="h-4 w-4" />,
      accent: "#6366F1",
      index: 0,
    },
    {
      title: "Pure Gold in Box",
      value: fmtW(stats.pureGoldInBox),
      sub: `${inBoxCount} In Box items`,
      icon: <Gem className="h-4 w-4" />,
      accent: "#D97706",
      index: 1,
    },
    {
      title: "Available Pure Gold",
      value: fmtW(stats.availablePureGold),
      sub: "After issuance",
      icon: <TrendingDown className="h-4 w-4" />,
      accent: stats.availablePureGold < 0 ? "#DC2626" : "#059669",
      index: 2,
      negative: stats.availablePureGold < 0,
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate.toFixed(1)}%`,
      sub: "Avg yield from melting",
      icon: <Percent className="h-4 w-4" />,
      accent: "#0891B2",
      index: 3,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground tracking-tight mb-0.5">Old Gold Management</h2>
        <p className="text-sm text-muted-foreground">Track old gold items, melting records &amp; daily balances</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <MetricCard key={m.title} {...m}>
            {m.title === "Available Pure Gold" && stats.availablePureGold < 0 && (
              <div className="flex gap-2">
                <button className="flex-1 h-7 rounded-md bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors">
                  Sell
                </button>
                <button className="flex-1 h-7 rounded-md border border-border text-foreground text-xs font-medium hover:bg-muted/40 transition-colors">
                  Issue
                </button>
              </div>
            )}
          </MetricCard>
        ))}
      </div>

      {/* Sub-tab bar */}
      <div className="flex items-center gap-0 border-b border-border">
        {SUB_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setSubTab(t.key); setSearch(""); }}
            className={cn(
              "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
              subTab === t.key
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Toolbar — search + add button (Old Gold Box only) */}
      {subTab === "box" && (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search lot number or description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/10 transition"
            />
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Add Old Gold Item
          </button>
        </div>
      )}

      {/* Table content */}
      {subTab === "box"     && <OldGoldBoxTable search={search} />}
      {subTab === "melting" && <MeltingRecordsTable />}
      {subTab === "balance" && <BalanceByDateTable />}
      {subTab === "audit"   && <DeletionAuditTable />}
    </div>
  );
}
