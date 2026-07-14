import { useState } from "react";
import { RefreshCw, ChevronDown, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── DATA ── */
type PendingIssue = {
  id: string;
  quality: string;
  orderNo: number;
  issuedTo: string;
  date: string;
  weightCt: number;
};

const PENDING_ISSUES: PendingIssue[] = [
  { id:"pi1", quality:"CVD", orderNo:1525, issuedTo:"23", date:"14/07/2026", weightCt:3.170 },
  { id:"pi2", quality:"2D",  orderNo:1524, issuedTo:"23", date:"14/07/2026", weightCt:0.020 },
  { id:"pi3", quality:"2D",  orderNo:1523, issuedTo:"23", date:"14/07/2026", weightCt:0.050 },
  { id:"pi4", quality:"1D",  orderNo:1520, issuedTo:"18", date:"12/07/2026", weightCt:0.800 },
  { id:"pi5", quality:"CVD", orderNo:1518, issuedTo:"15", date:"10/07/2026", weightCt:1.200 },
  { id:"pi6", quality:"4D",  orderNo:1515, issuedTo:"12", date:"8/07/2026",  weightCt:0.450 },
];

type HistoryRow = {
  id: string; date: string; quality: string; karigar: string;
  returned: number; original: number; notes: string;
};

const RETURN_HISTORY: HistoryRow[] = [
  { id:"h1", date:"13/7/2026", quality:"CVD",  karigar:"Karigar 23", returned:0.300, original:3.470, notes:"Partial return - not cut"      },
  { id:"h2", date:"10/7/2026", quality:"2D",   karigar:"Karigar 12", returned:1.200, original:4.860, notes:"Balance returned after job"    },
  { id:"h3", date:"5/7/2026",  quality:"SHADE", karigar:"Karigar 7", returned:0.150, original:0.800, notes:"Shade mismatch - customer reject" },
];

const KARIGAR_LIST = ["Select karigar","Karigar 7","Karigar 12","Karigar 15","Karigar 18","Karigar 23"];
const ISSUE_OPTS   = ["Select diamond issue", ...PENDING_ISSUES.map(i => `Order ${i.orderNo} · ${i.quality} · ${i.weightCt.toFixed(3)} ct`)];

const QUALITY_COLORS: Record<string, string> = {
  "1D":  "bg-blue-100 text-blue-700",
  "2D":  "bg-indigo-100 text-indigo-700",
  "4D":  "bg-purple-100 text-purple-700",
  "CVD": "bg-teal-100 text-teal-700",
  "SHADE":"bg-slate-100 text-slate-600",
};

/* ── SMALL SELECT ── */
function Sel({ options, value, onChange }: { options:string[]; value:string; onChange:(v:string)=>void }) {
  return (
    <div className="relative">
      <select
        value={value} onChange={e => onChange(e.target.value)}
        className="w-full h-9 pl-3 pr-8 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
    </div>
  );
}

type MainTab = "receive" | "reassortment" | "history" | "completed";

/* ── MAIN ── */
export default function DiamondReturnWorkflow() {
  const [mainTab,    setMainTab]    = useState<MainTab>("receive");
  const [issue,      setIssue]      = useState(ISSUE_OPTS[0]);
  const [karigar,    setKarigar]    = useState(KARIGAR_LIST[0]);
  const [weight,     setWeight]     = useState("0.000");
  const [notes,      setNotes]      = useState("");
  const [submitted,  setSubmitted]  = useState(false);

  function handleSubmit() {
    if (issue === ISSUE_OPTS[0] || karigar === KARIGAR_LIST[0]) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssue(ISSUE_OPTS[0]);
      setKarigar(KARIGAR_LIST[0]);
      setWeight("0.000");
      setNotes("");
    }, 2500);
  }

  const TABS: { key: MainTab; label: string }[] = [
    { key:"receive",      label:"Receive Returns"    },
    { key:"reassortment", label:"Reassortment"       },
    { key:"history",      label:"Return History"     },
    { key:"completed",    label:"Completed"          },
  ];

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <RefreshCw className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Diamond Return &amp; Reassortment</h1>
        </div>
        <p className="text-sm text-muted-foreground">Manage diamond returns and quality control</p>
      </div>

      {/* TAB BAR */}
      <div className="border-b border-border shrink-0 flex">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setMainTab(key)}
            className={cn(
              "px-6 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              mainTab === key
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-hidden p-8 min-h-0">

        {/* RECEIVE RETURNS */}
        {mainTab === "receive" && (
          <div className="grid grid-cols-2 gap-6 h-full">

            {/* LEFT: Record form */}
            <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">Record Diamond Return</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Original Issue</label>
                  <Sel options={ISSUE_OPTS} value={issue} onChange={setIssue} />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Karigar</label>
                  <Sel options={KARIGAR_LIST} value={karigar} onChange={setKarigar} />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Returned Weight (carats)</label>
                  <input
                    type="number" step="0.001" value={weight}
                    onChange={e => setWeight(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Notes</label>
                  <textarea
                    rows={4} value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Additional notes about the return..."
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                  />
                </div>
              </div>
              <div className="px-6 pb-6 shrink-0">
                {submitted
                  ? <div className="flex items-center justify-center gap-2 h-10 rounded-lg bg-emerald-600 text-white text-sm font-semibold">
                      <CheckCircle className="h-4 w-4" /> Return Recorded!
                    </div>
                  : <button
                      onClick={handleSubmit}
                      className="w-full h-10 rounded-lg bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
                    >
                      Record Return
                    </button>
                }
              </div>
            </div>

            {/* RIGHT: Pending issues */}
            <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border">
                <span className="text-sm font-semibold text-foreground">Pending Diamond Issues</span>
                <span className="ml-2 text-xs text-muted-foreground">({PENDING_ISSUES.length} items)</span>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border">
                {PENDING_ISSUES.map(issue => (
                  <div key={issue.id} className="px-5 py-4 hover:bg-muted/20 transition-colors flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold shrink-0 mt-0.5", QUALITY_COLORS[issue.quality] ?? "bg-muted text-foreground")}>
                        {issue.quality}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-foreground">Order: {issue.orderNo}</p>
                        <p className="text-[11px] text-muted-foreground">Issued to: {issue.issuedTo}</p>
                        <p className="text-[11px] text-muted-foreground">Date: {issue.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground tabular-nums shrink-0">
                      {issue.weightCt.toFixed(2)} ct
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RETURN HISTORY */}
        {mainTab === "history" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <span className="text-sm font-semibold text-foreground">Return History</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Date","Quality","Karigar","Returned (ct)","Original (ct)","Notes"].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {RETURN_HISTORY.map(row => (
                  <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{row.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold", QUALITY_COLORS[row.quality] ?? "bg-muted text-foreground")}>
                        {row.quality}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">{row.karigar}</td>
                    <td className="px-5 py-3.5 text-xs font-semibold text-foreground tabular-nums">{row.returned.toFixed(3)}</td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground tabular-nums">{row.original.toFixed(3)}</td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* REASSORTMENT & COMPLETED — empty state */}
        {(mainTab === "reassortment" || mainTab === "completed") && (
          <div className="bg-card border border-border rounded-xl flex items-center justify-center h-48">
            <p className="text-sm text-muted-foreground">No {mainTab === "reassortment" ? "reassortment" : "completed"} records yet.</p>
          </div>
        )}

      </div>
    </div>
  );
}
