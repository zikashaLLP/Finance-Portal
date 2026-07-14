import { useState } from "react";
import {
  ClipboardCheck, Clock, CheckCircle2, AlertCircle, FileText,
  Search, ChevronDown, Download, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── MOCK DATA ── */
type Approval = {
  id: string;
  item: string;
  weight: string;
  kt: string;
  source: string;
  sourceRef: string;
  sourceType: string;
  recipient: string;
  recipientType: string;
  value: number;
  date: string;
  status: "given" | "received" | "overdue";
};

const MOCK: Approval[] = [
  { id:"APP000216", item:"SJM (GLR/24)", weight:"3.440g", kt:"22K", source:"Stock Item", sourceRef:"GLR/24",  sourceType:"Vendor",  recipient:"DTC NEW (ARPIT SIR)", recipientType:"Vendor",  value:0, date:"13/7/2026", status:"given"    },
  { id:"APP000215", item:"SJM (GLR/31)", weight:"2.600g", kt:"22K", source:"Stock Item", sourceRef:"GLR/31",  sourceType:"Vendor",  recipient:"Arpit",               recipientType:"Vendor",  value:0, date:"8/7/2026",  status:"received" },
  { id:"APP000214", item:"SJM (LR18/5)", weight:"2.770g", kt:"18K", source:"Stock Item", sourceRef:"LR18/5",  sourceType:"Client",  recipient:"Arpit Thakkar",       recipientType:"Client",  value:0, date:"8/7/2026",  status:"received" },
  { id:"APP000213", item:"SJM (GLR/54)", weight:"3.120g", kt:"22K", source:"Stock Item", sourceRef:"GLR/54",  sourceType:"Vendor",  recipient:"Arpit",               recipientType:"Vendor",  value:0, date:"8/7/2026",  status:"received" },
  { id:"APP000212", item:"SJM (GLR/22)", weight:"4.100g", kt:"22K", source:"Stock Item", sourceRef:"GLR/22",  sourceType:"Vendor",  recipient:"DTC NEW",             recipientType:"Vendor",  value:0, date:"7/7/2026",  status:"received" },
  { id:"APP000211", item:"BRC (BR/04)",  weight:"1.890g", kt:"18K", source:"Stock Item", sourceRef:"BR/04",   sourceType:"Client",  recipient:"Priya Shah",          recipientType:"Client",  value:0, date:"7/7/2026",  status:"received" },
  { id:"APP000210", item:"SJM (GLR/18)", weight:"3.560g", kt:"22K", source:"Stock Item", sourceRef:"GLR/18",  sourceType:"Vendor",  recipient:"Arpit",               recipientType:"Vendor",  value:0, date:"6/7/2026",  status:"overdue"  },
  { id:"APP000209", item:"NKL (NK/11)",  weight:"2.230g", kt:"22K", source:"Stock Item", sourceRef:"NK/11",   sourceType:"Vendor",  recipient:"Rakesh Vendor",       recipientType:"Vendor",  value:0, date:"5/7/2026",  status:"overdue"  },
  { id:"APP000208", item:"SJM (GLR/09)", weight:"4.450g", kt:"22K", source:"Stock Item", sourceRef:"GLR/09",  sourceType:"Client",  recipient:"Meera Patel",         recipientType:"Client",  value:0, date:"5/7/2026",  status:"overdue"  },
  { id:"APP000207", item:"RNG (RG/22)",  weight:"1.650g", kt:"18K", source:"Stock Item", sourceRef:"RG/22",   sourceType:"Client",  recipient:"Jai Mehta",           recipientType:"Client",  value:0, date:"4/7/2026",  status:"given"    },
  { id:"APP000206", item:"SJM (GLR/44)", weight:"3.880g", kt:"22K", source:"Stock Item", sourceRef:"GLR/44",  sourceType:"Vendor",  recipient:"DTC NEW (ARPIT SIR)", recipientType:"Vendor",  value:0, date:"3/7/2026",  status:"given"    },
  { id:"APP000205", item:"CHN (CH/15)",  weight:"5.120g", kt:"22K", source:"Stock Item", sourceRef:"CH/15",   sourceType:"Client",  recipient:"Sunita Desai",        recipientType:"Client",  value:0, date:"2/7/2026",  status:"given"    },
];

const STATUS_OPTS   = ["All Status",     "Given",    "Received", "Overdue"];
const SOURCE_OPTS   = ["All Sources",    "Vendor",   "Client",   "Stock"];
const RECIPIENT_OPTS= ["All Recipients", "Vendor",   "Client"];

const statusMeta = {
  given:    { label: "Given",    cls: "bg-muted text-foreground/70"                },
  received: { label: "Received", cls: "bg-emerald-100 text-emerald-700"            },
  overdue:  { label: "Overdue",  cls: "bg-red-100 text-red-600"                   },
};

/* ── MAIN ── */
export default function Approvals() {
  const [search,    setSearch]    = useState("");
  const [statusF,   setStatusF]   = useState("All Status");
  const [sourceF,   setSourceF]   = useState("All Sources");
  const [recipF,    setRecipF]    = useState("All Recipients");

  const filtered = MOCK.filter((a) => {
    const q = search.toLowerCase();
    const matchQ = !q || a.id.toLowerCase().includes(q) || a.item.toLowerCase().includes(q) || a.recipient.toLowerCase().includes(q);
    const matchS = statusF === "All Status"     || a.status === statusF.toLowerCase();
    const matchSrc = sourceF === "All Sources"  || a.sourceType === sourceF;
    const matchR = recipF === "All Recipients"  || a.recipientType === recipF;
    return matchQ && matchS && matchSrc && matchR;
  });

  const given    = MOCK.filter(a => a.status === "given").length;
  const received = MOCK.filter(a => a.status === "received").length;
  const overdue  = MOCK.filter(a => a.status === "overdue").length;
  const total    = MOCK.length;

  return (
    <div className="w-full flex flex-col h-full">

      {/* ── HEADER ── */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Approval Management</h1>
          </div>
          <p className="text-sm text-muted-foreground">Track and manage approval items given and received</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-sidebar-accent transition-colors">
            <Download className="h-3.5 w-3.5" />
            Receive Items
          </button>
          <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Give on Approval
          </button>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* FILTERS */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 flex-wrap">
          <p className="text-sm font-semibold text-foreground mr-1 shrink-0">Filters</p>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search approvals..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
            />
          </div>

          {/* Status filter */}
          <Select value={statusF} onChange={setStatusF} options={STATUS_OPTS} />
          <Select value={sourceF} onChange={setSourceF} options={SOURCE_OPTS} />
          <Select value={recipF}  onChange={setRecipF}  options={RECIPIENT_OPTS} />
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={Clock}         label="Given"    value={given}    iconCls="text-foreground/50" />
          <MetricCard icon={CheckCircle2}  label="Received" value={received} iconCls="text-emerald-500"  />
          <MetricCard icon={AlertCircle}   label="Overdue"  value={overdue}  iconCls="text-red-500"      />
          <MetricCard icon={FileText}      label="Total"    value={total}    iconCls="text-foreground/50" />
        </div>

        {/* TABLE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Approvals ({filtered.length})
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Approval #</th>
                  <th className="text-left px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Item</th>
                  <th className="text-left px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Source</th>
                  <th className="text-left px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Recipient</th>
                  <th className="text-left px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                  <th className="text-left px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Date Given</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((a) => {
                  const meta = statusMeta[a.status];
                  return (
                    <tr key={a.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-foreground/70 bg-muted px-2 py-1 rounded">
                          {a.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground text-sm">{a.item}</p>
                        <p className="text-[11px] text-muted-foreground">{a.weight} • {a.kt}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">{a.source}</p>
                        <p className="text-[11px] text-muted-foreground">{a.sourceRef}</p>
                        <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase">{a.sourceType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">{a.recipient}</p>
                        <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase">{a.recipientType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-foreground tabular-nums">
                          ₹{a.value}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold",
                          meta.cls,
                        )}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground tabular-nums">{a.date}</span>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted-foreground">
                      No approvals match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── HELPERS ── */
function MetricCard({ icon: Icon, label, value, iconCls }: {
  icon: React.ElementType; label: string; value: number; iconCls: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition-all">
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">{label}</p>
        <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
      </div>
      <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
        <Icon className={cn("h-5 w-5", iconCls)} />
      </div>
    </div>
  );
}

function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-9 pl-3 pr-8 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-foreground/20 cursor-pointer transition-colors"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
    </div>
  );
}
