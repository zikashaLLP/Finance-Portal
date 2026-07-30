import { useState } from "react";
import { Gem, RefreshCw, Plus, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import DiamondOrders from "./DiamondOrders";

type OuterTab = "tracking" | "orders";

const OUTER_TABS: { key: OuterTab; label: string }[] = [
  { key: "tracking", label: "Quality Tracking" },
  { key: "orders",   label: "Orders"           },
];

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

function PurchaseTable({ purchases }: { purchases: PurchaseRow[] }) {
  const total = purchases.reduce((s, r) => s + r.weight, 0);
  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {["Date", "Weight (ct)", "Rate (₹/ct)", "Actions"].map(h => (
              <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {purchases.map((r, i) => (
            <tr key={i} className="hover:bg-muted/20 transition-colors">
              <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{r.date}</td>
              <td className="px-5 py-3.5 text-xs font-semibold text-foreground tabular-nums">{r.weight.toFixed(3)}</td>
              <td className="px-5 py-3.5 text-xs text-foreground tabular-nums">
                {r.weight > 0 ? fmtINR(r.price / r.weight) : "—"}
                <span className="text-muted-foreground ml-1.5 text-[10px]">({fmtINR(r.price)} total)</span>
              </td>
              <td className="px-5 py-3.5">
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
          {purchases.length === 0 && (
            <tr>
              <td colSpan={4} className="px-5 py-8 text-center text-xs text-muted-foreground">
                No purchase transactions
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="px-5 py-3.5 border-t border-border bg-muted/10 flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">
          Total Purchased: {total.toFixed(3)} ct
        </span>
        <span className="text-xs text-muted-foreground">
          {purchases.length} {purchases.length === 1 ? "record" : "records"}
        </span>
      </div>
    </div>
  );
}

function IssueTable({ issues }: { issues: IssueRow[] }) {
  const total = issues.reduce((s, r) => s + r.weight, 0);
  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {["Date", "Weight (ct)", "Issued To", "Comment", "Actions"].map(h => (
              <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {issues.map((r, i) => (
            <tr key={i} className="hover:bg-muted/20 transition-colors">
              <td className="px-5 py-3.5 text-xs text-muted-foreground whitespace-nowrap">{r.date}</td>
              <td className="px-5 py-3.5 text-xs font-semibold text-foreground tabular-nums">{r.weight.toFixed(3)}</td>
              <td className="px-5 py-3.5 text-xs text-foreground">{r.issuedTo}</td>
              <td className="px-5 py-3.5 text-xs text-muted-foreground">{r.comment}</td>
              <td className="px-5 py-3.5">
                <button className="h-6 w-6 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent transition-colors">
                  <Edit className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
          {issues.length === 0 && (
            <tr>
              <td colSpan={5} className="px-5 py-8 text-center text-xs text-muted-foreground">
                No issue transactions
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="px-5 py-3.5 border-t border-border bg-muted/10 flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">
          Total Issued: {total.toFixed(3)} ct
        </span>
        <span className="text-xs text-muted-foreground">
          {issues.length} {issues.length === 1 ? "record" : "records"}
        </span>
      </div>
    </div>
  );
}

function QualityPanel({ q }: { q: Quality }) {
  const [subTab, setSubTab] = useState<"purchase" | "issue">("purchase");

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-6 py-3.5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
          <button
            onClick={() => setSubTab("purchase")}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-semibold transition-colors",
              subTab === "purchase"
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Purchase History
            <span className={cn("ml-1.5 tabular-nums", subTab === "purchase" ? "text-foreground" : "text-muted-foreground")}>
              ({q.purchases.length})
            </span>
          </button>
          <button
            onClick={() => setSubTab("issue")}
            className={cn(
              "px-4 py-1.5 rounded-md text-xs font-semibold transition-colors",
              subTab === "issue"
                ? "bg-background text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Issue History
            <span className={cn("ml-1.5 tabular-nums", subTab === "issue" ? "text-foreground" : "text-muted-foreground")}>
              ({q.issues.length})
            </span>
          </button>
        </div>
        <div className="text-sm">
          Stock:{" "}
          <span className="font-bold text-emerald-600 tabular-nums">{q.stock.toFixed(3)} ct</span>
        </div>
      </div>

      {subTab === "purchase"
        ? <PurchaseTable purchases={q.purchases} />
        : <IssueTable issues={q.issues} />
      }
    </div>
  );
}

export default function DiamondQualityTracking() {
  const [outerTab, setOuterTab] = useState<OuterTab>("tracking");
  const [activeId, setActiveId] = useState(QUALITIES[0].id);
  const totalStock = QUALITIES.reduce((s, q) => s + q.stock, 0);
  const activeQuality = QUALITIES.find(q => q.id === activeId)!;

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-0 border-b border-border shrink-0">
        {outerTab === "tracking" && (
          <div className="flex items-center justify-end gap-2 shrink-0 py-3">
            <div className="px-4 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-muted-foreground">
                Total Stock:{" "}
                <span className="text-foreground">{totalStock.toFixed(3)} ct</span>
              </div>
              <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-sidebar-accent transition-colors">
                <RefreshCw className="h-3.5 w-3.5" />
                Sync to Ledger
              </button>
              <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
                <Plus className="h-3.5 w-3.5" />
                Add Transaction
              </button>
          </div>
        )}

        {/* Main tab bar */}
        <div className="flex items-center gap-0 overflow-x-auto no-scrollbar">
          {OUTER_TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setOuterTab(t.key)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
                outerTab === t.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quality sub-tab bar — only when on tracking tab */}
      {outerTab === "tracking" && (
        <div className="border-b border-border bg-muted/20 px-4 shrink-0 overflow-x-auto no-scrollbar flex items-center gap-1">
          {QUALITIES.map(q => (
            <button
              key={q.id}
              onClick={() => setActiveId(q.id)}
              className={cn(
                "flex items-center gap-2 shrink-0 px-4 py-2.5 text-sm font-medium rounded-none transition-colors whitespace-nowrap border-b-2 -mb-px",
                activeId === q.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {q.name}
              <span className={cn(
                "text-[11px] tabular-nums px-1.5 py-0.5 rounded-full font-semibold",
                activeId === q.id
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-muted text-muted-foreground"
              )}>
                {q.stock.toFixed(2)}ct
              </span>
            </button>
          ))}
        </div>
      )}

      {/* BODY — Quality Tracking */}
      {outerTab === "tracking" && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-8">
          <QualityPanel key={activeId} q={activeQuality} />
        </div>
      )}

      {/* BODY — Orders */}
      {outerTab === "orders" && (
        <div className="flex-1 min-h-0">
          <DiamondOrders />
        </div>
      )}

    </div>
  );
}
