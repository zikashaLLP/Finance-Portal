import { useState } from "react";
import { FileBarChart, Download, ChevronDown, Gem, Scale, ClipboardList, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";

/* ── DATA ── */
const REPORT_TYPES  = ["Material Summary", "Gold Flow Report", "Diamond Flow Report", "Karigar Performance", "Completion Report"];
const KARIGAR_OPTS  = ["All Karigars", "Ramesh Kumar", "Suresh Patel", "Mohan Singh", "Arjun Verma"];
const DATE_OPTS     = ["Last 30 days", "Last 7 days", "This Month", "Last Month", "Custom Range"];

const FLOW_ROWS = [
  { label:"Gold Flow",    balance:"Positive Balance", issued:"0.000g",   received:"0.000g",   net:"0.000g"    },
  { label:"Diamond Flow", balance:"Positive Balance", issued:"0.000ct",  received:"0.000ct",  net:"0.000ct"   },
];

const PERF_ROWS = [
  { karigar:"All Karigars", orders:34, completed:26, pending:8, rate:76.5 },
];

/* ── SELECT ── */
function Sel({ value, onChange, options }: { value:string; onChange:(v:string)=>void; options:string[] }) {
  return (
    <div className="relative">
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className="h-9 pl-3 pr-8 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-foreground/20 cursor-pointer transition-colors"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
    </div>
  );
}

/* ── MAIN ── */
export default function MaterialReport() {
  const [reportType, setReportType] = useState(REPORT_TYPES[0]);
  const [karigar,    setKarigar]    = useState(KARIGAR_OPTS[0]);
  const [dateRange,  setDateRange]  = useState(DATE_OPTS[0]);

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileBarChart className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Material Tracking Reports</h1>
          </div>
          <p className="text-sm text-muted-foreground">Generate comprehensive reports on material usage and karigar performance</p>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* FILTERS */}
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-4">Report Filters</p>
          <div className="flex items-end gap-4 flex-wrap">
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Report Type</label>
              <Sel value={reportType} onChange={setReportType} options={REPORT_TYPES} />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Karigar</label>
              <Sel value={karigar} onChange={setKarigar} options={KARIGAR_OPTS} />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Date Range</label>
              <Sel value={dateRange} onChange={setDateRange} options={DATE_OPTS} />
            </div>
            <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
              <Download className="h-3.5 w-3.5" />
              Download Report
            </button>
          </div>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedMetricCard label="Gold Balance"    value="0.000g"   sub="Issued: 0.000g | Received: 0.000g"   icon={Scale}        iconCls="text-foreground/50" index={0} />
          <AnimatedMetricCard label="Diamond Balance" value="0.000ct"  sub="Issued: 0.000ct | Received: 0.000ct" icon={Gem}          iconCls="text-foreground/50" index={1} />
          <AnimatedMetricCard label="Active Orders"   value="8"        sub="Completed: 26"                        icon={ClipboardList} iconCls="text-foreground/50" index={2} />
          <AnimatedMetricCard label="Completion Rate" value="76.5%"    sub="Total: 34 orders"                    icon={TrendingUp}   iconCls="text-foreground/50" index={3} />
        </div>

        {/* MATERIAL FLOW ANALYSIS */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <p className="text-sm font-semibold text-foreground">Material Flow Analysis</p>
            <p className="text-xs text-muted-foreground mt-0.5">Issuance vs receipt balance for {karigar.toLowerCase()}</p>
          </div>
          <div className="divide-y divide-border">
            {FLOW_ROWS.map(({ label, balance, issued, received, net }) => (
              <div key={label} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {balance}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <div className="h-full w-0 bg-foreground/40 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground mb-0.5">Issued</p>
                      <p className="font-semibold text-foreground tabular-nums">{issued}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-0.5">Received</p>
                      <p className="font-semibold text-foreground tabular-nums">{received}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-0.5">Net Balance</p>
                      <p className="font-semibold text-emerald-600 tabular-nums">{net}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KARIGAR PERFORMANCE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Karigar Performance</p>
              <p className="text-xs text-muted-foreground mt-0.5">Order completion rates</p>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Karigar","Total Orders","Completed","Pending","Completion Rate"].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {PERF_ROWS.map(row => (
                <tr key={row.karigar} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-foreground">{row.karigar}</td>
                  <td className="px-5 py-3.5 text-sm tabular-nums text-foreground">{row.orders}</td>
                  <td className="px-5 py-3.5 text-sm tabular-nums text-emerald-600 font-semibold">{row.completed}</td>
                  <td className="px-5 py-3.5 text-sm tabular-nums text-amber-600 font-semibold">{row.pending}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className={cn("h-full rounded-full", row.rate >= 80 ? "bg-emerald-500" : row.rate >= 60 ? "bg-amber-400" : "bg-red-400")}
                          style={{ width: `${row.rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-foreground tabular-nums">{row.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
