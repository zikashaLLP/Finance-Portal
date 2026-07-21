import { useState, useMemo } from "react";
import {
  RefreshCw, ChevronDown, CheckCircle2, Diamond,
  Clock, ArrowLeftRight, PackageCheck, Search,
  RotateCcw, AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
type PendingIssue = {
  id: string; quality: string; orderNo: number;
  karigar: string; date: string; weightCt: number; jobDesc: string;
};

const PENDING_ISSUES: PendingIssue[] = [
  { id:"pi1", quality:"CVD", orderNo:1525, karigar:"Karigar 23", date:"14/07/2026", weightCt:3.170, jobDesc:"Pendant Set — oval natural diamond 18K" },
  { id:"pi2", quality:"2D",  orderNo:1524, karigar:"Karigar 23", date:"14/07/2026", weightCt:0.020, jobDesc:"Earrings — pavé 18K rose gold" },
  { id:"pi3", quality:"2D",  orderNo:1523, karigar:"Karigar 23", date:"14/07/2026", weightCt:0.050, jobDesc:"Ring — bezel solitaire 22K" },
  { id:"pi4", quality:"1D",  orderNo:1520, karigar:"Karigar 18", date:"12/07/2026", weightCt:0.800, jobDesc:"Pendant — cushion cut 18K rose gold" },
  { id:"pi5", quality:"CVD", orderNo:1518, karigar:"Karigar 15", date:"10/07/2026", weightCt:1.200, jobDesc:"Bracelet — tennis CVD diamonds 18K" },
  { id:"pi6", quality:"4D",  orderNo:1515, karigar:"Karigar 12", date:"8/07/2026",  weightCt:0.450, jobDesc:"Necklace — drop cluster 22K" },
];

type ReturnRow = {
  id: string; date: string; quality: string; karigar: string;
  returned: number; original: number; notes: string; orderNo: number;
};

const RETURN_HISTORY: ReturnRow[] = [
  { id:"h1", date:"13/07/2026", quality:"CVD",   karigar:"Karigar 23", returned:0.300, original:3.470, notes:"Partial return — not cut",           orderNo:1521 },
  { id:"h2", date:"10/07/2026", quality:"2D",    karigar:"Karigar 12", returned:1.200, original:4.860, notes:"Balance returned after job",          orderNo:1510 },
  { id:"h3", date:"05/07/2026", quality:"SHADE", karigar:"Karigar 7",  returned:0.150, original:0.800, notes:"Shade mismatch — customer reject",    orderNo:1502 },
  { id:"h4", date:"01/07/2026", quality:"CVD",   karigar:"Karigar 15", returned:2.500, original:2.500, notes:"Full return — job cancelled",         orderNo:1498 },
  { id:"h5", date:"28/06/2026", quality:"1D",    karigar:"Karigar 18", returned:0.600, original:1.400, notes:"Partial — remaining in progress",     orderNo:1490 },
];

type ReassortRow = {
  id: string; date: string; quality: string; fromKarigar: string;
  toKarigar: string; weightCt: number; reason: string;
};

const REASSORTMENTS: ReassortRow[] = [
  { id:"r1", date:"15/07/2026", quality:"CVD", fromKarigar:"Karigar 23", toKarigar:"Karigar 15", weightCt:1.500, reason:"Overflow — capacity rebalance" },
  { id:"r2", date:"12/07/2026", quality:"2D",  fromKarigar:"Karigar 12", toKarigar:"Karigar 7",  weightCt:0.320, reason:"Quality specialist required"    },
  { id:"r3", date:"08/07/2026", quality:"1D",  fromKarigar:"Karigar 18", toKarigar:"Karigar 23", weightCt:0.800, reason:"Urgent order priority"           },
];

type CompletedRow = {
  id: string; date: string; quality: string; karigar: string;
  issued: number; returned: number; orderNo: number; jobDesc: string;
};

const COMPLETED: CompletedRow[] = [
  { id:"c1", date:"17/07/2026", quality:"CVD",  karigar:"Karigar 7",  issued:2.000, returned:0.200, orderNo:1505, jobDesc:"Necklace — solitaire pendant 18K" },
  { id:"c2", date:"14/07/2026", quality:"2D",   karigar:"Karigar 12", issued:0.800, returned:0.050, orderNo:1498, jobDesc:"Earrings — drop 22K yellow gold"   },
  { id:"c3", date:"11/07/2026", quality:"1D",   karigar:"Karigar 18", issued:1.400, returned:0.600, orderNo:1490, jobDesc:"Bracelet — plain gold with stones"  },
  { id:"c4", date:"09/07/2026", quality:"CVD",  karigar:"Karigar 23", issued:3.000, returned:0.300, orderNo:1485, jobDesc:"Pendant set — oval CVD 18K"         },
];

const KARIGAR_LIST  = ["All Karigars","Karigar 7","Karigar 12","Karigar 15","Karigar 18","Karigar 23"];
const ISSUE_OPTS    = ["Select issue", ...PENDING_ISSUES.map(i => `#${i.orderNo} · ${i.quality} · ${i.weightCt.toFixed(3)} ct`)];

const QUALITY_COLORS: Record<string, string> = {
  "1D":    "bg-blue-50 text-blue-700 border-blue-200",
  "2D":    "bg-indigo-50 text-indigo-700 border-indigo-200",
  "4D":    "bg-purple-50 text-purple-700 border-purple-200",
  "CVD":   "bg-teal-50 text-teal-700 border-teal-200",
  "SHADE": "bg-slate-100 text-slate-600 border-slate-200",
  "Natural":"bg-amber-50 text-amber-700 border-amber-200",
};

const qBadge = (q: string) => (
  <span className={cn(
    "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border shrink-0",
    QUALITY_COLORS[q] ?? "bg-muted text-foreground border-border",
  )}>{q}</span>
);

/* ══════════════════════════════════════════════
   FIELD HELPERS
══════════════════════════════════════════════ */
const LABEL_CLS = "block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";
const INPUT_CLS = "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors";

function Sel({ label, options, value, onChange }: { label?: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      {label && <label className={LABEL_CLS}>{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 pl-3 pr-8 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      </div>
    </div>
  );
}

type MainTab = "receive" | "reassortment" | "history" | "completed";

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
export default function DiamondReturnWorkflow() {
  const [mainTab,   setMainTab]   = useState<MainTab>("receive");
  const [issue,     setIssue]     = useState(ISSUE_OPTS[0]);
  const [karigar,   setKarigar]   = useState(KARIGAR_LIST[0]);
  const [weight,    setWeight]    = useState("");
  const [notes,     setNotes]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [histSearch, setHistSearch] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<PendingIssue | null>(null);

  const totalPendingWt = PENDING_ISSUES.reduce((s, i) => s + i.weightCt, 0);

  const filteredHistory = useMemo(() =>
    RETURN_HISTORY.filter((r) => {
      const q = histSearch.toLowerCase();
      return !q || r.karigar.toLowerCase().includes(q) || r.quality.toLowerCase().includes(q) || String(r.orderNo).includes(q);
    }),
    [histSearch],
  );

  function handleSelectIssue(pi: PendingIssue) {
    setSelectedIssue(pi);
    setIssue(ISSUE_OPTS[PENDING_ISSUES.indexOf(pi) + 1]);
    setKarigar(pi.karigar);
    setWeight(pi.weightCt.toFixed(3));
  }

  function handleSubmit() {
    if (issue === ISSUE_OPTS[0] || !weight) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIssue(ISSUE_OPTS[0]);
      setKarigar(KARIGAR_LIST[0]);
      setWeight("");
      setNotes("");
      setSelectedIssue(null);
    }, 2500);
  }

  const TABS: { key: MainTab; label: string; count?: number }[] = [
    { key: "receive",      label: "Receive Returns",  count: PENDING_ISSUES.length },
    { key: "reassortment", label: "Reassortment",     count: REASSORTMENTS.length  },
    { key: "history",      label: "Return History",   count: RETURN_HISTORY.length },
    { key: "completed",    label: "Completed",        count: COMPLETED.length      },
  ];

  return (
    <div className="w-full flex flex-col h-full">

      {/* ── Summary strip ── */}
      <div className="px-8 pt-5 pb-0 shrink-0">
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: "Pending Issues",      value: PENDING_ISSUES.length,         icon: AlertCircle,      cls: "text-amber-600" },
            { label: "Pending Weight",       value: `${totalPendingWt.toFixed(3)} ct`, icon: Diamond,      cls: "text-blue-600"  },
            { label: "Returns This Month",   value: RETURN_HISTORY.length,         icon: RotateCcw,        cls: "text-violet-600"},
            { label: "Completed Jobs",       value: COMPLETED.length,              icon: PackageCheck,     cls: "text-emerald-600"},
          ].map(({ label, value, icon: Icon, cls }) => (
            <div key={label} className="bg-card border border-border rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Icon className={cn("h-4 w-4", cls)} />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground leading-none mb-1">{label}</p>
                <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="flex items-center border-b border-border overflow-x-auto no-scrollbar">
          {TABS.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setMainTab(key)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap shrink-0",
                mainTab === key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
              {count !== undefined && (
                <span className={cn(
                  "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold",
                  mainTab === key ? "bg-foreground text-background" : "bg-muted text-muted-foreground",
                )}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-hidden p-8 min-h-0">

        {/* ── RECEIVE RETURNS ── */}
        {mainTab === "receive" && (
          <div className="grid grid-cols-[1fr_1.4fr] gap-6 h-full">

            {/* Left: Form */}
            <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center shrink-0">
                  <RefreshCw className="h-3.5 w-3.5 text-background" />
                </div>
                <span className="text-sm font-semibold text-foreground">Record Diamond Return</span>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
                {/* Selected issue preview */}
                {selectedIssue && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                    {qBadge(selectedIssue.quality)}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground">Order #{selectedIssue.orderNo}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{selectedIssue.jobDesc}</p>
                    </div>
                    <span className="ml-auto text-xs font-bold text-foreground tabular-nums shrink-0">{selectedIssue.weightCt.toFixed(3)} ct</span>
                  </div>
                )}

                <Sel label="Original Issue" options={ISSUE_OPTS} value={issue} onChange={setIssue} />
                <Sel label="Karigar" options={KARIGAR_LIST} value={karigar} onChange={setKarigar} />

                <div>
                  <label className={LABEL_CLS}>Returned Weight (carats)</label>
                  <input
                    type="number" step="0.001" value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0.000"
                    className={INPUT_CLS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLS}>Return Reason</label>
                  <div className="relative">
                    <select className="w-full h-10 pl-3 pr-8 rounded-lg border border-border bg-background text-sm text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors">
                      {["Select reason","Job Completed","Partial Return","Quality Issue","Order Cancelled","Other"].map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className={LABEL_CLS}>Notes <span className="normal-case font-normal text-muted-foreground">(optional)</span></label>
                  <textarea
                    rows={3} value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional notes about the return…"
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
                  />
                </div>
              </div>

              <div className="px-6 pb-5 pt-3 border-t border-border shrink-0">
                {submitted ? (
                  <div className="flex items-center justify-center gap-2 h-10 rounded-lg bg-emerald-600 text-white text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4" /> Return Recorded Successfully
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="w-full h-10 rounded-lg bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors"
                  >
                    Record Return
                  </button>
                )}
              </div>
            </div>

            {/* Right: Pending issues */}
            <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold text-foreground">Pending Diamond Issues</span>
                  <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold border border-amber-200">
                    {PENDING_ISSUES.length}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{totalPendingWt.toFixed(3)} ct total</span>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border">
                {PENDING_ISSUES.map((pi) => {
                  const isSelected = selectedIssue?.id === pi.id;
                  return (
                    <button
                      key={pi.id}
                      onClick={() => handleSelectIssue(pi)}
                      className={cn(
                        "w-full text-left px-5 py-4 transition-colors flex items-center gap-4",
                        isSelected ? "bg-sidebar-accent" : "hover:bg-muted/20",
                      )}
                    >
                      {/* Quality badge */}
                      {qBadge(pi.quality)}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-foreground">#{pi.orderNo}</span>
                          <span className="text-[11px] text-muted-foreground">·</span>
                          <span className="text-[11px] text-muted-foreground">{pi.karigar}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{pi.jobDesc}</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">{pi.date}</p>
                      </div>

                      {/* Weight */}
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-foreground tabular-nums">{pi.weightCt.toFixed(3)}</p>
                        <p className="text-[10px] text-muted-foreground">ct</p>
                      </div>

                      {isSelected && (
                        <div className="h-5 w-5 rounded-full bg-foreground flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-3 w-3 text-background" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="px-5 py-3 border-t border-border bg-muted/20 shrink-0">
                <p className="text-[11px] text-muted-foreground">Click a row to auto-fill the form →</p>
              </div>
            </div>
          </div>
        )}

        {/* ── REASSORTMENT ── */}
        {mainTab === "reassortment" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2 shrink-0">
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Reassortment Records</span>
              <span className="text-xs text-muted-foreground ml-1">— diamonds transferred between karigars</span>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30">
                    {["Date","Quality","From Karigar","To Karigar","Weight (ct)","Reason"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {REASSORTMENTS.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{r.date}</td>
                      <td className="px-5 py-3.5">{qBadge(r.quality)}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-5 w-5 rounded bg-foreground flex items-center justify-center text-[9px] font-bold text-background shrink-0">
                            {r.fromKarigar.charAt(r.fromKarigar.length - 2)}
                          </div>
                          <span className="text-xs font-medium text-foreground">{r.fromKarigar}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-5 w-5 rounded bg-muted flex items-center justify-center text-[9px] font-bold text-foreground shrink-0">
                            {r.toKarigar.charAt(r.toKarigar.length - 2)}
                          </div>
                          <span className="text-xs font-medium text-foreground">{r.toKarigar}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="flex items-center gap-1 text-xs font-semibold text-foreground tabular-nums">
                          <Diamond className="h-3 w-3 text-blue-500" />{r.weightCt.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-muted-foreground">{r.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── RETURN HISTORY ── */}
        {mainTab === "history" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-3 shrink-0 bg-muted/20">
              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search by karigar, quality or order…"
                value={histSearch}
                onChange={(e) => setHistSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              {histSearch && (
                <button onClick={() => setHistSearch("")} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">Clear</button>
              )}
              <span className="text-[11px] text-muted-foreground tabular-nums">{filteredHistory.length} record{filteredHistory.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30">
                    {["Order","Date","Quality","Karigar","Returned (ct)","Issued (ct)","Balance","Notes"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-12 text-center text-sm text-muted-foreground">No records match your search</td>
                    </tr>
                  ) : filteredHistory.map((row) => {
                    const balance = row.original - row.returned;
                    const balancePct = (row.returned / row.original) * 100;
                    return (
                      <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs font-semibold text-foreground">#{row.orderNo}</span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{row.date}</td>
                        <td className="px-5 py-3.5">{qBadge(row.quality)}</td>
                        <td className="px-5 py-3.5 text-xs font-medium text-foreground">{row.karigar}</td>
                        <td className="px-5 py-3.5">
                          <span className="flex items-center gap-1 text-xs font-semibold text-foreground tabular-nums">
                            <Diamond className="h-3 w-3 text-blue-400" />{row.returned.toFixed(3)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground tabular-nums">{row.original.toFixed(3)}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(balancePct, 100)}%` }} />
                            </div>
                            <span className={cn("text-xs tabular-nums font-medium", balance > 0 ? "text-amber-600" : "text-emerald-600")}>
                              {balance > 0 ? `−${balance.toFixed(3)}` : "0"}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[200px]">{row.notes}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── COMPLETED ── */}
        {mainTab === "completed" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-5 py-4 border-b border-border flex items-center gap-2 shrink-0">
              <PackageCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-foreground">Completed Jobs</span>
              <span className="text-xs text-muted-foreground ml-1">— all diamonds accounted for</span>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30">
                    {["Order","Date","Quality","Karigar","Job","Issued (ct)","Returned (ct)","Used (ct)"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {COMPLETED.map((row) => {
                    const used = row.issued - row.returned;
                    return (
                      <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-xs font-semibold text-foreground">#{row.orderNo}</span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{row.date}</td>
                        <td className="px-5 py-3.5">{qBadge(row.quality)}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <div className="h-5 w-5 rounded bg-foreground flex items-center justify-center text-[9px] font-bold text-background shrink-0">
                              {row.karigar.charAt(row.karigar.length - 2)}
                            </div>
                            <span className="text-xs font-medium text-foreground">{row.karigar}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground max-w-[180px] truncate">{row.jobDesc}</td>
                        <td className="px-5 py-3.5 text-xs text-muted-foreground tabular-nums">{row.issued.toFixed(3)}</td>
                        <td className="px-5 py-3.5">
                          <span className="flex items-center gap-1 text-xs font-medium text-foreground tabular-nums">
                            <RotateCcw className="h-3 w-3 text-muted-foreground" />{row.returned.toFixed(3)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 tabular-nums">
                            <Diamond className="h-3 w-3 text-emerald-500" />{used.toFixed(3)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
