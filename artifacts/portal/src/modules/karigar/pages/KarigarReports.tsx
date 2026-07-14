import { useState, useMemo } from "react";
import {
  Package, CheckCircle2, Clock, IndianRupee, TrendingUp,
  Download, Eye, SlidersHorizontal, FileBarChart,
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { mockKarigars } from "../data/mockKarigar";

/* ── MOCK REPORT DATA ── */
type ReportStatus = "received" | "pending";

interface ReportRow {
  id: string;
  orderNumber: string;
  karigar: string;
  client: string;
  itemType: string;
  goldWeight: number;
  labourQuoted: number;
  totalBudget: number;
  status: ReportStatus;
  orderDate: string;
}

const REPORT_DATA: ReportRow[] = [
  { id: "r1",  orderNumber: "1525", karigar: "DILIP BHAI SURAT",    client: "Divya Reddy company",    itemType: "necklace_set",  goldWeight: 16.000, labourQuoted: 750,  totalBudget: 200000, status: "received", orderDate: "14/07/2026" },
  { id: "r2",  orderNumber: "1524", karigar: "DILIP BHAI SURAT",    client: "SJ STOCK (KARIGAR ITM)", itemType: "nath",          goldWeight: 0.250,  labourQuoted: 500,  totalBudget: 1,      status: "received", orderDate: "14/07/2026" },
  { id: "r3",  orderNumber: "1523", karigar: "DILIP BHAI SURAT",    client: "SJ STOCK (KARIGAR ITM)", itemType: "nath",          goldWeight: 0.250,  labourQuoted: 500,  totalBudget: 1,      status: "received", orderDate: "14/07/2026" },
  { id: "r4",  orderNumber: "1522", karigar: "DILIP BHAI SURAT",    client: "SJ STOCK (KARIGAR ITM)", itemType: "nath",          goldWeight: 0.248,  labourQuoted: 500,  totalBudget: 1,      status: "received", orderDate: "14/07/2026" },
  { id: "r5",  orderNumber: "1521", karigar: "DILIP BHAI SURAT",    client: "SJ STOCK (KARIGAR ITM)", itemType: "nath",          goldWeight: 0.250,  labourQuoted: 1000, totalBudget: 1,      status: "received", orderDate: "14/07/2026" },
  { id: "r6",  orderNumber: "1520", karigar: "HIRANMAY DADA",       client: "Mahak Mam",              itemType: "pendant_set",   goldWeight: 3.500,  labourQuoted: 1000, totalBudget: 1,      status: "received", orderDate: "11/07/2026" },
  { id: "r7",  orderNumber: "1519", karigar: "HIRANMAY DADA",       client: "TANMAY SIR",             itemType: "nath",          goldWeight: 1.000,  labourQuoted: 650,  totalBudget: 1,      status: "pending",  orderDate: "11/07/2026" },
  { id: "r8",  orderNumber: "1518", karigar: "HIRANMAY DADA",       client: "TANMAY SIR",             itemType: "earrings",      goldWeight: 3.500,  labourQuoted: 1200, totalBudget: 1,      status: "received", orderDate: "11/07/2026" },
  { id: "r9",  orderNumber: "1517", karigar: "DILIP BHAI SURAT",    client: "DARSHANA DIDI",          itemType: "bracelet",      goldWeight: 7.001,  labourQuoted: 750,  totalBudget: 200000, status: "received", orderDate: "11/07/2026" },
  { id: "r10", orderNumber: "1516", karigar: "HIRANMAY DADA",       client: "SUSHMA GUPTA",           itemType: "nath",          goldWeight: 1.000,  labourQuoted: 1000, totalBudget: 1,      status: "received", orderDate: "07/07/2026" },
  { id: "r11", orderNumber: "1514", karigar: "HIRANMAY DADA",       client: "MADHAVI DIDI",           itemType: "tanmaniya",     goldWeight: 1.000,  labourQuoted: 1000, totalBudget: 1,      status: "pending",  orderDate: "07/07/2026" },
  { id: "r12", orderNumber: "1513", karigar: "HIRANMAY DADA",       client: "SUSHMA GUPTA",           itemType: "chain_pendant", goldWeight: 4.998,  labourQuoted: 1000, totalBudget: 1,      status: "pending",  orderDate: "07/07/2026" },
  { id: "r13", orderNumber: "1512", karigar: "HIRANMAY DADA",       client: "SUSHMA GUPTA",           itemType: "chain_pendant", goldWeight: 2.000,  labourQuoted: 1000, totalBudget: 1,      status: "pending",  orderDate: "07/07/2026" },
  { id: "r14", orderNumber: "1511", karigar: "HIRANMAY DADA",       client: "VAIBHAV BHAI",           itemType: "ring",          goldWeight: 7.500,  labourQuoted: 1000, totalBudget: 1,      status: "pending",  orderDate: "07/07/2026" },
  { id: "r15", orderNumber: "1510", karigar: "NITIN KARIGAR UNIQUE", client: "Custom Client",         itemType: "earrings",      goldWeight: 5.800,  labourQuoted: 950,  totalBudget: 63000,  status: "received", orderDate: "04/07/2026" },
  { id: "r16", orderNumber: "1509", karigar: "AMRESH DADA",         client: "Meena Shah",             itemType: "ring",          goldWeight: 2.100,  labourQuoted: 1200, totalBudget: 45000,  status: "received", orderDate: "02/07/2026" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const YEARS  = ["2024","2025","2026"];
const REPORT_TYPES = ["Monthly","Quarterly","Annual","Custom"];

const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const fmtW = (n: number) => `${n.toFixed(3)}g`;

type SubTab = "orders" | "materials" | "receipts" | "payments" | "summary";

const SUB_TABS: { key: SubTab; label: string }[] = [
  { key: "orders",    label: "Orders"    },
  { key: "materials", label: "Materials" },
  { key: "receipts",  label: "Receipts"  },
  { key: "payments",  label: "Payments"  },
  { key: "summary",   label: "Summary"   },
];

/* ── METRIC CARD ── */
function MetricCard({ label, value, icon, accent = "text-foreground" }: {
  label: string; value: string; icon: React.ReactNode; accent?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-5 flex items-center justify-between gap-4 hover:shadow-md hover:border-foreground/15 transition-all duration-200">
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</p>
        <p className={cn("text-2xl font-bold tabular-nums leading-none", accent)}>{value}</p>
      </div>
      <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
        {icon}
      </div>
    </div>
  );
}

/* ── ORDERS TABLE ── */
function OrdersTable({ rows }: { rows: ReportRow[] }) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const total = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const slice = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Table sub-header */}
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Order Details</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {[
                "Order #", "Karigar", "Client", "Item Type",
                "Gold (g)", "Labour Quoted", "Total Budget", "Status", "Order Date", "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((r, i) => (
              <tr key={r.id} className={cn(
                "border-b border-border last:border-0 hover:bg-muted/20 transition-colors group",
                i % 2 !== 0 && "bg-muted/[0.04]",
              )}>
                <td className="px-4 py-3.5">
                  <span className="font-mono text-xs font-semibold text-foreground">{r.orderNumber}</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center text-[10px] font-bold text-background shrink-0">
                      {r.karigar.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-foreground leading-tight">{r.karigar}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-muted-foreground max-w-[120px]">
                  <span className="line-clamp-2 leading-tight">{r.client}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border">
                    {r.itemType}
                  </span>
                </td>
                <td className="px-4 py-3.5 tabular-nums text-xs text-muted-foreground">{fmtW(r.goldWeight)}</td>
                <td className="px-4 py-3.5 tabular-nums text-xs font-medium text-foreground">{fmtAmt(r.labourQuoted)}</td>
                <td className="px-4 py-3.5 tabular-nums text-xs font-semibold text-foreground">{fmtAmt(r.totalBudget)}</td>
                <td className="px-4 py-3.5">
                  {r.status === "received" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      received
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                      pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{r.orderDate}</td>
                <td className="px-4 py-3.5">
                  <button className="h-7 w-7 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors opacity-0 group-hover:opacity-100">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > 1 && (
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, rows.length)} of {rows.length} orders
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
              className="h-7 px-3 rounded-lg text-xs border border-border disabled:opacity-40 hover:bg-muted/40 transition-colors">
              Previous
            </button>
            {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={cn("h-7 w-7 rounded-lg text-xs font-medium transition-colors",
                  p === page ? "bg-foreground text-background" : "hover:bg-muted/40 text-muted-foreground")}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(total, page + 1))} disabled={page === total}
              className="h-7 px-3 rounded-lg text-xs border border-border disabled:opacity-40 hover:bg-muted/40 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── PLACEHOLDER TAB ── */
function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-16 flex flex-col items-center justify-center text-center">
      <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <FileBarChart className="h-6 w-6 text-muted-foreground/40" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">{label}</p>
      <p className="text-xs text-muted-foreground/60 mt-0.5">Coming soon</p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function KarigarReports() {
  const [karigarFilter, setKarigarFilter] = useState("all");
  const [reportType, setReportType]       = useState("Monthly");
  const [month, setMonth]                 = useState("July");
  const [year, setYear]                   = useState("2026");
  const [subTab, setSubTab]               = useState<SubTab>("orders");

  const filtered = useMemo(() => {
    if (karigarFilter === "all") return REPORT_DATA;
    return REPORT_DATA.filter((r) => r.karigar === karigarFilter);
  }, [karigarFilter]);

  const completed       = filtered.filter((r) => r.status === "received").length;
  const pending         = filtered.filter((r) => r.status === "pending").length;
  const totalBudget     = filtered.reduce((s, r) => s + r.totalBudget, 0);
  const completionRate  = filtered.length > 0 ? (completed / filtered.length) * 100 : 0;

  const reportTitle = karigarFilter === "all"
    ? `All Karigars — ${month} ${year}`
    : `${karigarFilter} — ${month} ${year}`;

  const now = new Date();
  const generatedAt = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) +
    ", " + now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

  const selectCls = "h-10 rounded-xl border-border text-sm bg-background";

  return (
    <div className="w-full flex flex-col h-full">

      {/* ── Header ── */}
      <div className="px-8 pt-6 pb-5 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Karigar Reports</h1>
          <p className="text-sm text-muted-foreground">Comprehensive reporting for karigar operations and performance</p>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6">

        {/* ── FILTERS CARD ── */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Report Filters</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Karigar */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Select Karigar</label>
              <Select value={karigarFilter} onValueChange={setKarigarFilter}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Karigars</SelectItem>
                  {mockKarigars.map((k) => <SelectItem key={k.id} value={k.name}>{k.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {/* Report type */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>{REPORT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {/* Month */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Month</label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>{MONTHS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {/* Year */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className={selectCls}><SelectValue /></SelectTrigger>
                <SelectContent>{YEARS.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ── REPORT SUMMARY HEADER ── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">{reportTitle}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Generated on {generatedAt}</p>
          </div>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors shadow-sm">
            <Download className="h-3.5 w-3.5" /> Export Report
          </button>
        </div>

        {/* ── METRIC CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard label="Total Orders"      value={String(filtered.length)} icon={<Package      className="h-5 w-5 text-foreground/60" />} />
          <MetricCard label="Completed"         value={String(completed)}       icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}  accent="text-emerald-700" />
          <MetricCard label="Pending"           value={String(pending)}         icon={<Clock        className="h-5 w-5 text-amber-600"   />}  accent="text-amber-700"   />
          <MetricCard label="Total Budget"      value={fmtAmt(totalBudget)}     icon={<IndianRupee  className="h-5 w-5 text-foreground/60" />} />
          <MetricCard label="Completion Rate"   value={`${completionRate.toFixed(1)}%`} icon={<TrendingUp className="h-5 w-5 text-foreground/60" />} />
        </div>

        {/* ── SUB-TABS ── */}
        <div>
          <div className="flex items-center gap-0 border-b border-border mb-6">
            {SUB_TABS.map((t) => (
              <button key={t.key} onClick={() => setSubTab(t.key)}
                className={cn(
                  "px-6 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                  subTab === t.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}>
                {t.label}
              </button>
            ))}
          </div>

          {subTab === "orders"    && <OrdersTable rows={filtered} />}
          {subTab === "materials" && <PlaceholderTab label="Materials Report" />}
          {subTab === "receipts"  && <PlaceholderTab label="Receipts Report"  />}
          {subTab === "payments"  && <PlaceholderTab label="Payments Report"  />}
          {subTab === "summary"   && <PlaceholderTab label="Summary Report"   />}
        </div>

      </div>
    </div>
  );
}
