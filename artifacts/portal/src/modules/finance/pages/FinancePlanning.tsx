import { useState, useMemo } from "react";
import { Bell, ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "@/shared/components/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockFinanceEntries, type FinanceEntry, type FinanceType } from "../data/mockFinance";

type MainTab = "planning" | "pnl";
type SubTab = "receive" | "pay";
type AmountSort = "high-to-low" | "low-to-high";
type TimelineFilter = "all" | "overdue" | "upcoming" | "unset";
type TypeFilter = "all" | FinanceType;

const PAGE_SIZE = 15;

const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const TYPE_PILL: Record<FinanceType, string> = {
  Client:  "bg-blue-50 text-blue-700 border border-blue-200",
  Vendor:  "bg-violet-50 text-violet-700 border border-violet-200",
  Karigar: "bg-amber-50 text-amber-700 border border-amber-200",
};

function daysOldBadge(days: number) {
  if (days <= 30) return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  if (days <= 90) return "bg-amber-50 text-amber-700 border border-amber-200";
  return "bg-red-50 text-red-600 border border-red-200";
}

export default function FinancePlanning() {
  const [mainTab, setMainTab] = useState<MainTab>("planning");
  const [subTab, setSubTab]   = useState<SubTab>("receive");
  const [amountSort, setAmountSort]     = useState<AmountSort>("high-to-low");
  const [timelineFilter, setTimelineFilter] = useState<TimelineFilter>("all");
  const [typeFilter, setTypeFilter]     = useState<TypeFilter>("all");
  const [page, setPage] = useState(1);

  const allReceive = mockFinanceEntries.filter((e) => e.direction === "receive");
  const allPay     = mockFinanceEntries.filter((e) => e.direction === "pay");

  const totalReceive = allReceive.reduce((s, e) => s + e.amount, 0);
  const totalPay     = allPay.reduce((s, e) => s + e.amount, 0);
  const netPosition  = totalReceive - totalPay;

  function applyFilters(entries: FinanceEntry[]) {
    let out = entries;
    if (typeFilter !== "all") {
      out = out.filter((e) => e.type === typeFilter);
    }
    if (timelineFilter === "unset") {
      out = out.filter((e) => e.timeline === null);
    }
    out = out.slice().sort((a, b) =>
      amountSort === "high-to-low" ? b.amount - a.amount : a.amount - b.amount,
    );
    return out;
  }

  const displayEntries = useMemo(() => {
    const base = subTab === "receive" ? allReceive : allPay;
    return applyFilters(base);
  }, [subTab, amountSort, timelineFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(displayEntries.length / PAGE_SIZE));
  const paginated  = displayEntries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSubTab(t: SubTab) {
    setSubTab(t);
    setPage(1);
  }

  function handleFilterChange<T>(setter: (v: T) => void) {
    return (v: T) => { setter(v); setPage(1); };
  }

  return (
    <div className="w-full flex flex-col h-full">
      {/* ── Header ── */}
      <div className="px-8 pt-6 pb-5 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Finance Planning</h1>
          <p className="text-sm text-muted-foreground">Receivables, payables &amp; net position</p>
        </div>

        {/* Planning / PNL segmented control */}
        <div className="flex items-center gap-1 bg-zinc-200 rounded-xl p-1">
          <button
            onClick={() => setMainTab("planning")}
            className={cn(
              "px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
              mainTab === "planning"
                ? "bg-white text-foreground shadow-sm"
                : "text-zinc-500 hover:text-foreground",
            )}
          >
            Planning
          </button>
          <button
            onClick={() => setMainTab("pnl")}
            className={cn(
              "px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
              mainTab === "pnl"
                ? "bg-white text-foreground shadow-sm"
                : "text-zinc-500 hover:text-foreground",
            )}
          >
            PNL
          </button>
        </div>

        {/* Bell */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-6 space-y-6">

        {mainTab === "pnl" && (
          <div className="h-64 flex items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground text-sm">
            PNL — Coming Soon
          </div>
        )}

        {mainTab === "planning" && (
          <>
            {/* ── Metric cards ── */}
            <div className="grid grid-cols-3 gap-4">
              {/* Total to Receive */}
              <div className="bg-white rounded-2xl border border-border shadow-[0_1px_4px_rgba(0,0,0,0.04)] px-5 py-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-muted-foreground mb-0.5 uppercase tracking-wide">Total to Receive</p>
                  <p className="text-xl font-bold text-foreground leading-none">{fmtAmt(totalReceive)}</p>
                  <p className="text-[12px] text-emerald-600 font-medium mt-0.5">{allReceive.length} entities</p>
                </div>
              </div>

              {/* Total to Pay */}
              <div className="bg-white rounded-2xl border border-border shadow-[0_1px_4px_rgba(0,0,0,0.04)] px-5 py-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="h-5 w-5 text-red-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-muted-foreground mb-0.5 uppercase tracking-wide">Total to Pay</p>
                  <p className="text-xl font-bold text-foreground leading-none">{fmtAmt(totalPay)}</p>
                  <p className="text-[12px] text-red-500 font-medium mt-0.5">{allPay.length} entities</p>
                </div>
              </div>

              {/* Net Position */}
              <div className="bg-white rounded-2xl border border-border shadow-[0_1px_4px_rgba(0,0,0,0.04)] px-5 py-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-muted-foreground mb-0.5 uppercase tracking-wide">Net Position</p>
                  <p className={cn(
                    "text-xl font-bold leading-none",
                    netPosition >= 0 ? "text-indigo-600" : "text-red-600",
                  )}>
                    {netPosition < 0 ? "-" : ""}{fmtAmt(Math.abs(netPosition))}
                  </p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    {netPosition >= 0 ? "Net receivable" : "Net payable"}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Filters & Sorting bar ── */}
            <div className="flex items-center gap-2 flex-wrap">
              <Select
                value={amountSort}
                onValueChange={handleFilterChange<AmountSort>(setAmountSort)}
              >
                <SelectTrigger className="h-9 w-[170px] rounded-lg border border-border bg-white shadow-sm text-sm">
                  <SelectValue placeholder="Sort by amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-to-low">Amount: High to Low</SelectItem>
                  <SelectItem value="low-to-high">Amount: Low to High</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={timelineFilter}
                onValueChange={handleFilterChange<TimelineFilter>(setTimelineFilter)}
              >
                <SelectTrigger className="h-9 w-[160px] rounded-lg border border-border bg-white shadow-sm text-sm">
                  <SelectValue placeholder="All Timelines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Timelines</SelectItem>
                  <SelectItem value="unset">Not Set</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={handleFilterChange<TypeFilter>(setTypeFilter)}
              >
                <SelectTrigger className="h-9 w-[150px] rounded-lg border border-border bg-white shadow-sm text-sm">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Vendor">Vendor</SelectItem>
                  <SelectItem value="Karigar">Karigar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ── Sub-tabs: To Receive / To Pay ── */}
            <div className="flex items-center gap-0 border-b border-border">
              <button
                onClick={() => handleSubTab("receive")}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                  subTab === "receive"
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                To Receive ({allReceive.length})
              </button>
              <button
                onClick={() => handleSubTab("pay")}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                  subTab === "pay"
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                To Pay ({allPay.length})
              </button>
            </div>

            {/* ── Table ── */}
            <div className="bg-white border border-border rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {["Name", "Type", "Amount", "Since", "Days Old", "Timeline", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground text-sm">
                          No entries match your filters.
                        </td>
                      </tr>
                    ) : (
                      paginated.map((entry, i) => (
                        <tr
                          key={entry.id}
                          className={cn(
                            "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                            i % 2 !== 0 && "bg-muted/10",
                          )}
                        >
                          <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap">{entry.name}</td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", TYPE_PILL[entry.type])}>
                              {entry.type}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap tabular-nums font-semibold text-foreground">
                            {fmtAmt(entry.amount)}
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                            {new Date(entry.since).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", daysOldBadge(entry.daysOld))}>
                              {entry.daysOld}d
                            </span>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground text-[13px] italic">
                            {entry.timeline ?? "Not set"}
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <button className="text-xs font-medium text-foreground underline-offset-2 hover:underline transition-colors opacity-70 hover:opacity-100">
                              Set Timeline
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={displayEntries.length} pageSize={PAGE_SIZE} itemLabel="entries" />
          </>
        )}
      </div>
    </div>
  );
}
