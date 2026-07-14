import { Gem, Star, Package, Layers, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── DATA ── */
const TOTAL_VALUE = "₹23,82,64,649.28";
const PURE_GOLD_G = "15554.66g";

const CATEGORIES = [
  {
    title: "Gold Jewelry",
    sub: "Finished gold jewelry items",
    icon: Star,
    items: 564,
    rows: [
      { label:"Total Weight",    value:"2729.07g" },
      { label:"Avg Purity",      value:"2.0K"     },
      { label:"Pure Gold",       value:"2231.49g", em: true },
      { label:"Value",           value:"₹8,33,728.24" },
    ],
  },
  {
    title: "Diamond Jewelry",
    sub: "Finished diamond jewelry items",
    icon: Gem,
    items: 294,
    rows: [
      { label:"Total Carats",    value:"270.54 ct"      },
      { label:"Gold Weight",     value:"1907.16g"       },
      { label:"Pure Gold",       value:"1307.29g",  em:true },
      { label:"Value",           value:"₹1,01,45,325.00" },
    ],
    notes: ["EF VVS (Premium Quality)", "FG-GH VVS-VS (High Quality)", "All SI (Standard Quality)"],
  },
  {
    title: "Loose Diamonds",
    sub: "Diamond quality tracking inventory",
    icon: Gem,
    items: null,
    rows: [
      { label:"Total Carats",  value:"91.51 ct"        },
      { label:"1D (EF VVS)",   value:"8.36 ct"         },
      { label:"2D (FG-GH VVS-VS)", value:"29.37 ct"   },
      { label:"3D (All SI)",   value:"53.79 ct"        },
      { label:"Total Value",   value:"₹32,13,209.00", em:true },
    ],
  },
  {
    title: "Pure Gold Stock",
    sub: "Raw gold inventory",
    icon: Star,
    items: 233,
    rows: [
      { label:"Total Weight", value:"12015.87g"           },
      { label:"Purity",       value:"999 (24K)"           },
      { label:"Pure Gold",    value:"12015.87g",  em:true  },
      { label:"Value",        value:"₹10,64,44,170.47"    },
    ],
  },
  {
    title: "Old Gold Stock",
    sub: "Old gold for melting/recycling",
    icon: Package,
    items: 0,
    rows: [
      { label:"Total Weight", value:"0.00g"   },
      { label:"Avg Purity",   value:"0.0K"    },
      { label:"Pure Gold",    value:"0.00g",  em:true },
      { label:"Value",        value:"₹0.00"   },
    ],
  },
];

const DISTRIBUTION = [
  { label:"Gold Jewelry",    value:"₹8,33,728.24",       pct:0.3,  pureGold:"2231.49g" },
  { label:"Diamond Jewelry", value:"₹1,01,45,325.00",    pct:4.3,  pureGold:"1307.29g" },
  { label:"Loose Diamonds",  value:"₹32,13,209.00",      pct:1.3,  pureGold:null       },
  { label:"Pure Gold Stock", value:"₹10,64,44,170.47",   pct:44.7, pureGold:"12015.87g"},
  { label:"Old Gold Stock",  value:"₹0.00",              pct:0,    pureGold:null       },
];

/* ── MAIN ── */
export default function StockSummary() {
  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Stock Summary</h1>
          </div>
          <p className="text-sm text-muted-foreground">Complete overview of your jewelry inventory</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Total Value</p>
          <p className="text-2xl font-bold text-foreground tabular-nums tracking-tight">{TOTAL_VALUE}</p>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* PURE GOLD BANNER */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">Total Pure Gold Equivalent</p>
            <span className="text-xs text-muted-foreground">— Combined pure gold value of all inventory</span>
          </div>
          <p className="text-4xl font-bold text-foreground tabular-nums tracking-tight mb-1">{PURE_GOLD_G}</p>
          <p className="text-xs text-muted-foreground">This represents the total pure gold content across all your inventory</p>
        </div>

        {/* CATEGORY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(({ title, sub, icon: Icon, items, rows, notes }) => (
            <div key={title} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-bold text-foreground">{title}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{sub}</p>
                </div>
                {items !== null && (
                  <span className="text-[11px] font-semibold text-muted-foreground tabular-nums shrink-0">{items}</span>
                )}
              </div>

              {notes && (
                <div className="mb-3 space-y-0.5">
                  {notes.map(n => (
                    <p key={n} className="text-[10px] text-muted-foreground">• {n}</p>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                {rows.map(({ label, value, em }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className={cn("text-xs", em ? "font-semibold text-foreground" : "text-muted-foreground")}>{label}:</span>
                    <span className={cn("text-xs tabular-nums font-semibold", em ? "text-emerald-600" : "text-foreground")}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DISTRIBUTION */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">Stock Distribution by Value</p>
            <span className="text-xs text-muted-foreground ml-1">— Breakdown of inventory value across different categories</span>
          </div>
          <div className="p-6 space-y-4">
            {DISTRIBUTION.map(({ label, value, pct, pureGold }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-xs text-muted-foreground">{value} ({pct}%)</span>
                    {pureGold && <span className="text-xs text-muted-foreground">• {pureGold} pure gold</span>}
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground/70 rounded-full transition-all"
                    style={{ width: `${Math.max(pct * 2, pct > 0 ? 1 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
