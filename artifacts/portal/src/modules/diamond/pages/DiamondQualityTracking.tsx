import { useState } from "react";
import { Gem, RefreshCw, Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── DATA ── */
type PurchaseRow = { date: string; weight: number; price: number };
type IssueRow    = { date: string; weight: number; issuedTo: string; comment: string };

type Quality = {
  id: string;
  name: string;
  stock: number;
  purchases: PurchaseRow[];
  issues: IssueRow[];
};

const QUALITIES: Quality[] = [
  {
    id:"shade", name:"SHADE", stock:2.533,
    purchases:[
      { date:"1/28/2026",  weight:3.285, price:1       },
      { date:"12/20/2025", weight:4.370, price:15200   },
      { date:"12/20/2025", weight:4.370, price:13064   },
    ],
    issues:[],
  },
  {
    id:"4d", name:"4D", stock:7.123,
    purchases:[
      { date:"10/7/2026",  weight:2.500, price:8500    },
      { date:"9/15/2026",  weight:4.623, price:12000   },
    ],
    issues:[
      { date:"10/10/2026", weight:0.300, issuedTo:"Karigar 23", comment:"Ring set" },
    ],
  },
  {
    id:"cvd", name:"CVD", stock:3.170,
    purchases:[
      { date:"7/10/2026",  weight:2.500, price:48000   },
      { date:"7/4/2026",   weight:0.800, price:16000   },
      { date:"7/1/2026",   weight:2.100, price:29400   },
    ],
    issues:[
      { date:"7/14/2026",  weight:3.170, issuedTo:"Karigar 23", comment:"Order 1525" },
    ],
  },
  {
    id:"2d", name:"2D", stock:0.070,
    purchases:[
      { date:"6/20/2026",  weight:5.000, price:25000   },
    ],
    issues:[
      { date:"7/14/2026",  weight:0.020, issuedTo:"Karigar 23", comment:"Order 1524" },
      { date:"7/14/2026",  weight:0.050, issuedTo:"Karigar 23", comment:"Order 1523" },
      { date:"7/10/2026",  weight:4.860, issuedTo:"Karigar 12", comment:"Bulk issue"  },
    ],
  },
  {
    id:"1d", name:"1D", stock:8.360,
    purchases:[
      { date:"7/13/2026",  weight:10.000, price:450000 },
    ],
    issues:[
      { date:"7/12/2026",  weight:1.640, issuedTo:"Karigar 7",  comment:"Order 2012" },
    ],
  },
  {
    id:"solitaire", name:"Solitaire", stock:1.500,
    purchases:[
      { date:"7/4/2026",   weight:1.500, price:96171   },
    ],
    issues:[],
  },
];

const fmtINR = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

/* ── QUALITY SECTION ── */
function QualitySection({ q }: { q: Quality }) {
  const [open, setOpen] = useState(true);

  const totalPurchased = q.purchases.reduce((s, r) => s + r.weight, 0);
  const totalIssued    = q.issues.reduce((s, r) => s + r.weight, 0);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Section header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Gem className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-bold text-foreground">Quality: {q.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-emerald-600 tabular-nums">
            Stock: {q.stock.toFixed(3)} ct
          </span>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-border grid grid-cols-2 divide-x divide-border">
          {/* Purchase History */}
          <div>
            <div className="px-5 py-3 border-b border-border flex items-center gap-2 bg-muted/10">
              <span className="text-xs font-semibold text-foreground">Purchase History</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {["Date","Weight (ct)","Price (₹)","Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {q.purchases.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-2.5 text-xs font-semibold text-foreground tabular-nums">{r.weight.toFixed(3)}</td>
                    <td className="px-4 py-2.5 text-xs text-foreground tabular-nums">{fmtINR(r.price)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1">
                        <button className="h-6 w-6 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent transition-colors">
                          <Edit className="h-3 w-3" />
                        </button>
                        <button className="h-6 w-6 rounded border border-border flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {q.purchases.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-4 text-center text-xs text-muted-foreground">No purchase transactions</td></tr>
                )}
              </tbody>
            </table>
            <div className="px-4 py-2.5 border-t border-border bg-muted/10">
              <span className="text-xs font-semibold text-foreground">Total Purchased: {totalPurchased.toFixed(3)} ct</span>
            </div>
          </div>

          {/* Issue History */}
          <div>
            <div className="px-5 py-3 border-b border-border flex items-center gap-2 bg-muted/10">
              <span className="text-xs font-semibold text-foreground">Issue History</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {["Date","Weight (ct)","Issued To","Comment","Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {q.issues.map((r, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-2.5 text-xs font-semibold text-foreground tabular-nums">{r.weight.toFixed(3)}</td>
                    <td className="px-4 py-2.5 text-xs text-foreground">{r.issuedTo}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{r.comment}</td>
                    <td className="px-4 py-2.5">
                      <button className="h-6 w-6 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent transition-colors">
                        <Edit className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
                {q.issues.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-4 text-center text-xs text-muted-foreground">No issue transactions</td></tr>
                )}
              </tbody>
            </table>
            <div className="px-4 py-2.5 border-t border-border bg-muted/10">
              <span className="text-xs font-semibold text-foreground">Total Issued: {totalIssued.toFixed(3)} ct</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── MAIN ── */
export default function DiamondQualityTracking() {
  const totalStock = QUALITIES.reduce((s, q) => s + q.stock, 0);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gem className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Loose Diamonds Quality Tracking</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Track diamond purchases, issues &amp; sales by quality. Solitaires are tracked as single pieces.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-4 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-muted-foreground">
            Total Stock: <span className="text-foreground">{totalStock.toFixed(3)} ct</span>
          </div>
          <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-sidebar-accent transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            Sync Missing Ledgers
          </button>
          <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
            <Plus className="h-3.5 w-3.5" />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-4">
        {QUALITIES.map(q => <QualitySection key={q.id} q={q} />)}
      </div>
    </div>
  );
}
