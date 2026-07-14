import { useState } from "react";
import { Diamond, Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";

/* ── DATA ── */
type OrderStatus = "pending" | "confirmed" | "in-progress" | "ready" | "delivered" | "completed";

type Order = {
  id: string;
  orderNo: number;
  client: string;
  quality: string;
  weightCt: number;
  soldCt: number;
  estimatedPrice: number | null;
  orderDate: string;
  targetDelivery: string | null;
  status: OrderStatus;
};

const ORDERS: Order[] = [
  { id:"o1",  orderNo:2012, client:"JIMIT BHAI CLIENT",          quality:"1D",        weightCt:0.800,  soldCt:0,      estimatedPrice:null,       orderDate:"6/6/2026",   targetDelivery:null, status:"confirmed"  },
  { id:"o2",  orderNo:2011, client:"JAYANT KAKA",                quality:"CVD",       weightCt:0.000,  soldCt:0,      estimatedPrice:595174.31,  orderDate:"4/18/2026",  targetDelivery:null, status:"completed"  },
  { id:"o3",  orderNo:2010, client:"RAMESH SHAH",                quality:"2D",        weightCt:0.500,  soldCt:0,      estimatedPrice:12500,      orderDate:"7/1/2026",   targetDelivery:null, status:"pending"    },
  { id:"o4",  orderNo:2009, client:"PRIYA MEHTA",                quality:"SHADE",     weightCt:1.200,  soldCt:0,      estimatedPrice:null,       orderDate:"6/28/2026",  targetDelivery:null, status:"pending"    },
  { id:"o5",  orderNo:2008, client:"ANKIT C/F BHAVESH",          quality:"1D",        weightCt:0.300,  soldCt:0,      estimatedPrice:null,       orderDate:"6/25/2026",  targetDelivery:null, status:"pending"    },
  { id:"o6",  orderNo:2007, client:"DEEPA MAM",                  quality:"CVD",       weightCt:0.800,  soldCt:0,      estimatedPrice:null,       orderDate:"6/22/2026",  targetDelivery:null, status:"pending"    },
  { id:"o7",  orderNo:2006, client:"HEENA KHATRI",               quality:"Solitaire", weightCt:0.500,  soldCt:0,      estimatedPrice:null,       orderDate:"6/20/2026",  targetDelivery:null, status:"pending"    },
  { id:"o8",  orderNo:2005, client:"BISMI (BHAVESH)",            quality:"2D",        weightCt:1.000,  soldCt:0,      estimatedPrice:null,       orderDate:"6/18/2026",  targetDelivery:null, status:"pending"    },
  { id:"o9",  orderNo:2004, client:"TEJAL SOMAIYA",              quality:"CVD",       weightCt:0.600,  soldCt:0,      estimatedPrice:null,       orderDate:"6/15/2026",  targetDelivery:null, status:"pending"    },
  { id:"o10", orderNo:2003, client:"VARSHA TESSI",               quality:"4D",        weightCt:1.500,  soldCt:0,      estimatedPrice:null,       orderDate:"6/12/2026",  targetDelivery:null, status:"pending"    },
  { id:"o11", orderNo:2002, client:"DHEERAJ M",                  quality:"1D",        weightCt:0.300,  soldCt:0,      estimatedPrice:null,       orderDate:"6/10/2026",  targetDelivery:null, status:"confirmed"  },
  { id:"o12", orderNo:2001, client:"SUSHMA GUPTA",               quality:"CVD",       weightCt:2.000,  soldCt:2.000,  estimatedPrice:180000,     orderDate:"5/28/2026",  targetDelivery:null, status:"delivered"  },
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending:     "bg-amber-100 text-amber-700",
  confirmed:   "bg-blue-100 text-blue-700",
  "in-progress":"bg-purple-100 text-purple-700",
  ready:       "bg-emerald-100 text-emerald-700",
  delivered:   "bg-muted text-muted-foreground",
  completed:   "bg-foreground/10 text-foreground",
};

const QUALITY_COLORS: Record<string, string> = {
  "1D":       "bg-blue-100 text-blue-700",
  "2D":       "bg-indigo-100 text-indigo-700",
  "4D":       "bg-purple-100 text-purple-700",
  "CVD":      "bg-teal-100 text-teal-700",
  "SHADE":    "bg-slate-100 text-slate-600",
  "Solitaire":"bg-amber-100 text-amber-700",
};

const fmtINR = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

type Tab = "all" | "pending" | "confirmed" | "in-progress" | "ready" | "delivered";

export default function DiamondOrders() {
  const [tab, setTab] = useState<Tab>("all");

  const counts: Record<Tab, number> = {
    all:         ORDERS.length,
    pending:     ORDERS.filter(o => o.status === "pending").length,
    confirmed:   ORDERS.filter(o => o.status === "confirmed").length,
    "in-progress": ORDERS.filter(o => o.status === "in-progress").length,
    ready:       ORDERS.filter(o => o.status === "ready").length,
    delivered:   ORDERS.filter(o => o.status === "delivered" || o.status === "completed").length,
  };

  const visible = tab === "all"
    ? ORDERS
    : tab === "delivered"
    ? ORDERS.filter(o => o.status === "delivered" || o.status === "completed")
    : ORDERS.filter(o => o.status === tab);

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Diamond className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Diamond Orders</h1>
          </div>
          <p className="text-sm text-muted-foreground">Manage client diamond orders and track their progress</p>
        </div>
        <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="h-3.5 w-3.5" />
          New Order
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* STATUS METRIC CARDS */}
        <div className="grid grid-cols-6 gap-3">
          {([
            { key:"all",          label:"Total Orders" },
            { key:"pending",      label:"Pending",      valueColor:"text-amber-600"   },
            { key:"confirmed",    label:"Confirmed",    valueColor:"text-blue-600"    },
            { key:"in-progress",  label:"In Progress"  },
            { key:"ready",        label:"Ready",        valueColor:"text-emerald-600" },
            { key:"delivered",    label:"Delivered"    },
          ] as { key:Tab; label:string; valueColor?:string }[]).map(({ key, label, valueColor }, i) => (
            <AnimatedMetricCard
              key={key}
              label={label}
              value={String(counts[key])}
              index={i}
              onClick={() => setTab(key)}
              selected={tab === key}
              valueColor={valueColor}
            />
          ))}
        </div>

        {/* TABLE CARD */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <p className="text-sm font-semibold text-foreground mb-3">Diamond Orders</p>
            <p className="text-xs text-muted-foreground -mt-2 mb-3">View and manage all diamond orders by status</p>
            {/* Tab bar */}
            <div className="flex items-center gap-1">
              {(["all","pending","confirmed","in-progress","ready","delivered"] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize whitespace-nowrap",
                    tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                  )}
                >
                  {t === "all" ? `All (${counts.all})` :
                   t === "pending" ? `Pending (${counts.pending})` :
                   t === "confirmed" ? `Confirmed (${counts.confirmed})` :
                   t === "in-progress" ? `In Progress (${counts["in-progress"]})` :
                   t === "ready" ? `Ready (${counts.ready})` :
                   `Delivered (${counts.delivered})`}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Order Number","Client","Quality","Weight (ct)","Progress","Estimated Price","Order Date","Target Delivery","Status","Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visible.map(order => {
                  const pct = order.weightCt > 0 ? Math.round((order.soldCt / order.weightCt) * 100) : 0;
                  return (
                    <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-bold text-foreground tabular-nums">{order.orderNo}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-medium text-foreground">{order.client}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold", QUALITY_COLORS[order.quality] ?? "bg-muted text-foreground")}>
                          {order.quality}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-semibold text-foreground tabular-nums">{order.weightCt.toFixed(3)}</span>
                      </td>
                      <td className="px-5 py-3.5 min-w-[120px]">
                        <div className="text-[10px] text-muted-foreground mb-1">
                          {order.soldCt.toFixed(3)} / {order.weightCt.toFixed(3)} ct
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", pct === 100 ? "bg-emerald-500" : "bg-foreground/40")}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{pct}% sold</div>
                      </td>
                      <td className="px-5 py-3.5">
                        {order.estimatedPrice
                          ? <span className="text-xs font-semibold text-foreground tabular-nums">{fmtINR(order.estimatedPrice)}</span>
                          : <span className="text-muted-foreground text-xs">—</span>
                        }
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{order.orderDate}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs text-muted-foreground">{order.targetDelivery ?? "—"}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize", STATUS_STYLE[order.status])}>
                          {order.status === "in-progress" ? "In Progress" : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <button className="h-7 w-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors">
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          {order.status === "completed"
                            ? <button className="h-7 w-7 rounded border border-border flex items-center justify-center text-emerald-500 transition-colors" disabled>
                                <CheckCircle className="h-3.5 w-3.5" />
                              </button>
                            : <button className="h-7 w-7 rounded border border-border flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-200 transition-colors">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                          }
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-6 py-10 text-center text-sm text-muted-foreground">
                      No orders in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t border-border bg-muted/10">
            <p className="text-xs text-muted-foreground">{visible.length} order{visible.length !== 1 ? "s" : ""} shown</p>
          </div>
        </div>

      </div>
    </div>
  );
}
