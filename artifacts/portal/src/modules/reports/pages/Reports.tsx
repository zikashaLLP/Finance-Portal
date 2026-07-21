import { useState } from "react";
import {
  BarChart2, TrendingUp, Truck, Users, Hammer,
  Package, Gem, ArrowLeftRight, BookOpen, FileText,
  Calendar, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import KarigarReports from "../../karigar/pages/KarigarReports";

/* ── REPORT TYPES ── */
const REPORT_TYPES = [
  {
    id: "daily-summary",
    title: "Daily Summary Report",
    desc: "Complete overview of today's transactions, sales, and purchases",
    icon: BarChart2,
    sources: "transactions, sales, purchases, ledger",
  },
  {
    id: "monthly-summary",
    title: "Monthly Summary Report",
    desc: "Comprehensive monthly financial summary with trends",
    icon: TrendingUp,
    sources: "transactions, sales, purchases, ledger",
  },
  {
    id: "vendor-transaction",
    title: "Vendor Transaction Report",
    desc: "All vendor payments, purchases, and outstanding balances",
    icon: Truck,
    sources: "purchases, vendors, payments",
  },
  {
    id: "client-transaction",
    title: "Client Transaction Report",
    desc: "Client sales, payments, and account balances",
    icon: Users,
    sources: "sales, clients, payments",
  },
  {
    id: "karigar-transaction",
    title: "Karigar Transaction Report",
    desc: "Karigar gold issuance, receipts, and balance tracking",
    icon: Hammer,
    sources: "karigar, gold, receipts",
  },
  {
    id: "stock-summary",
    title: "Stock Summary Report",
    desc: "Complete inventory status for gold and diamond jewellery",
    icon: Package,
    sources: "stock, inventory",
  },
  {
    id: "gold-operations",
    title: "Gold Operations Report",
    desc: "Pure gold and old gold transactions with purity details",
    icon: Gem,
    sources: "gold, karigar",
  },
  {
    id: "cash-book",
    title: "Cash Book Report",
    desc: "All cash inflows and outflows with running balance",
    icon: ArrowLeftRight,
    sources: "transactions, cash",
  },
  {
    id: "ledger-summary",
    title: "Ledger Summary Report",
    desc: "Account-wise ledger balances and movement",
    icon: BookOpen,
    sources: "ledger, accounts",
  },
  {
    id: "custom",
    title: "Custom Report",
    desc: "Build a report with custom date range and filters",
    icon: FileText,
    sources: "all modules",
  },
];

/* ── HELPERS ── */
const todayStr = () => new Date().toISOString().split("T")[0];

const addDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};

type PageTab = "transaction" | "karigar";

/* ── TRANSACTION REPORTS PANEL ── */
function TransactionReportsPanel() {
  const [selectedId, setSelectedId] = useState("daily-summary");
  const [fromDate, setFromDate] = useState(todayStr());
  const [toDate,   setToDate]   = useState(todayStr());
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const selected = REPORT_TYPES.find((r) => r.id === selectedId)!;
  const SelIcon  = selected.icon;

  function quickRange(mode: "today" | "7d" | "month") {
    setGenerated(false);
    if (mode === "today") {
      setFromDate(todayStr()); setToDate(todayStr());
    } else if (mode === "7d") {
      setFromDate(addDays(-6)); setToDate(todayStr());
    } else {
      const d = new Date();
      const first = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
      setFromDate(first); setToDate(todayStr());
    }
  }

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 900);
  }

  return (
    <div className="flex gap-6 h-full min-h-0">
      {/* LEFT: Report Type List */}
      <div className="w-[340px] shrink-0 flex flex-col">
        <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col flex-1">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Report Types</span>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border">
            {REPORT_TYPES.map((report) => {
              const Icon     = report.icon;
              const isActive = report.id === selectedId;
              return (
                <button
                  key={report.id}
                  onClick={() => { setSelectedId(report.id); setGenerated(false); }}
                  className={cn(
                    "w-full flex items-start gap-3 px-5 py-4 text-left transition-colors",
                    isActive ? "bg-sidebar-accent" : "hover:bg-muted/30",
                  )}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    isActive ? "bg-foreground" : "bg-muted",
                  )}>
                    <Icon className={cn("h-4 w-4", isActive ? "text-background" : "text-foreground/60")} />
                  </div>
                  <div className="min-w-0">
                    <p className={cn(
                      "text-sm font-semibold leading-none mb-1.5",
                      isActive ? "text-foreground" : "text-foreground/80",
                    )}>
                      {report.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-snug">{report.desc}</p>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: Config + Generate */}
      <div className="flex-1 min-w-0 flex flex-col gap-5">
        {/* Report info card */}
        <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <SelIcon className="h-6 w-6 text-foreground/70" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-0.5">{selected.title}</h2>
            <p className="text-sm text-muted-foreground">{selected.desc}</p>
          </div>
        </div>

        {/* Date range card */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <p className="text-sm font-semibold text-foreground">Date Range</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">From Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => { setFromDate(e.target.value); setGenerated(false); }}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">To Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => { setToDate(e.target.value); setGenerated(false); }}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 pr-10 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(["Today", "Last 7 Days", "This Month"] as const).map((label) => {
              const mode = label === "Today" ? "today" : label === "Last 7 Days" ? "7d" : "month";
              return (
                <button
                  key={label}
                  onClick={() => quickRange(mode)}
                  className="px-4 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate card */}
        <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-0.5">Generate Report</p>
            <p className="text-[11px] text-muted-foreground">Data sources: {selected.sources}</p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all",
              "bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60 disabled:cursor-not-allowed",
            )}
          >
            <BarChart2 className="h-4 w-4" />
            {generating ? "Generating…" : "Generate Report"}
          </button>
        </div>

        {/* Generated result */}
        {generated && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{selected.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{fromDate} → {toDate}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 text-[11px] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Ready
              </span>
            </div>
            <div className="p-6 space-y-3">
              {[
                { label: "Total Transactions", value: "142" },
                { label: "Total Income",       value: "₹4,82,300" },
                { label: "Total Expenses",     value: "₹1,23,450" },
                { label: "Net Balance",        value: "₹3,58,850" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-semibold text-foreground tabular-nums">{value}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-border bg-muted/20 flex gap-3">
              <button className="flex-1 h-9 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-sidebar-accent transition-colors">Download PDF</button>
              <button className="flex-1 h-9 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-sidebar-accent transition-colors">Export Excel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── MAIN ── */
export default function Reports() {
  const [pageTab, setPageTab] = useState<PageTab>("transaction");

  const PAGE_TABS: { key: PageTab; label: string }[] = [
    { key: "transaction", label: "Transaction Reports" },
    { key: "karigar",     label: "Karigar Reports"     },
  ];

  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="px-8 pt-6 pb-0 border-b border-border shrink-0">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Reports</h1>
          </div>
          <p className="text-sm text-muted-foreground">Generate comprehensive business reports with one click</p>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
          {PAGE_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setPageTab(t.key)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                pageTab === t.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {pageTab === "transaction" && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
          <TransactionReportsPanel />
        </div>
      )}

      {pageTab === "karigar" && (
        <div className="flex-1 min-h-0">
          <KarigarReports />
        </div>
      )}
    </div>
  );
}
