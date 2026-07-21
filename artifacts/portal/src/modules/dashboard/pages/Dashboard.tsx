import { useLocation } from "wouter";
import {
  Crown, TrendingUp, Users, Clock, Package,
  ShoppingCart, Layers, ShoppingBag,
  Diamond, Hammer, Gem, Coins,
  ArrowLeftRight, Zap,
  ArrowDownLeft, ArrowUpRight,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── MOCK DATA ── */
const PORTFOLIO_VALUE = "₹11,48,23,049.81";

const METRICS = [
  { label: "Today's Sales",  value: "₹0.00",       icon: TrendingUp },
  { label: "Active Clients", value: "625",          icon: Users      },
  { label: "Pending Orders", value: "13",           icon: Clock      },
  { label: "Stock Items",    value: "56,42,94,295", icon: Package    },
];

const QUICK_ACCESS = [
  { label: "MOST USED", title: "Quick Sale",        desc: "Create new sales instantly",   icon: ShoppingCart,   path: "/sales"        },
  { label: "INVENTORY", title: "Stock Manager",     desc: "Add & manage inventory",       icon: Layers,         path: "/stock"        },
  { label: "BUYING",    title: "Purchase Orders",   desc: "Create purchase orders",       icon: ShoppingBag,    path: "/purchase"     },
  { label: "PREMIUM",   title: "Diamond Mgmt",      desc: "Quality tracking & orders",    icon: Diamond,        path: "/diamond"      },
  { label: "CRAFT",     title: "Karigar Work",      desc: "Manufacturing workflow",       icon: Hammer,         path: "/karigar"      },
  { label: "GOLD",      title: "Gold Operations",   desc: "Gold inventory & purity",      icon: Gem,            path: "/gold"         },
  { label: "SILVER",    title: "Silver Mgmt",       desc: "Silver stock & transactions",  icon: Coins,          path: "/silver"       },
  { label: "PAYMENTS",  title: "Transactions",      desc: "Payment tracking",             icon: ArrowLeftRight, path: "/transactions" },
  { label: "REPORTS",   title: "Reports",           desc: "Business analytics",           icon: BarChart3,      path: "/reports"      },
];

const RECENT_TXN = [
  { id:"t1", name:"SANDWICH",                amount:-300,  date:"14/07/2026", type:"debit"  },
  { id:"t2", name:"DONATION TO JIMIT BHAI",  amount:-3000, date:"14/07/2026", type:"debit"  },
  { id:"t3", name:"VIKAS",                   amount:-300,  date:"14/07/2026", type:"debit"  },
  { id:"t4", name:"ANISH DISHIT SIR & AUTO", amount:-400,  date:"14/07/2026", type:"debit"  },
  { id:"t5", name:"VIKAS VARIYALI",          amount:-200,  date:"14/07/2026", type:"debit"  },
];

const fmtAmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(Math.abs(n));

const today = new Date().toLocaleDateString("en-US", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

/* ── QUICK ACCESS CARD ── */
function QuickCard({ item, navigate }: { item: typeof QUICK_ACCESS[0]; navigate: (p: string) => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => navigate(item.path)}
      className="group bg-background border border-border rounded-xl p-3.5 text-left hover:shadow-sm hover:border-foreground/20 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2.5"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-foreground/8 transition-colors">
          <Icon className="h-3.5 w-3.5 text-foreground/70" />
        </div>
        <span className="text-[9px] font-bold tracking-widest text-muted-foreground/40 uppercase pt-0.5">{item.label}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground mb-0.5">{item.title}</p>
        <p className="text-[11px] text-muted-foreground leading-snug">{item.desc}</p>
      </div>
    </button>
  );
}

/* ── MAIN ── */
export default function Dashboard() {
  const [, navigate] = useLocation();

  return (
    <div className="w-full flex flex-col h-full">

      {/* ── HEADER ── */}
      <div className="px-8 pt-5 pb-4 border-b border-border shrink-0 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Crown className="h-4.5 w-4.5 text-muted-foreground" />
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Business Command Center</h1>
          </div>
          <p className="text-xs text-muted-foreground">{today} • Your Daily Operations Hub</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-foreground tabular-nums tracking-tight">{PORTFOLIO_VALUE}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">Total Portfolio Value</p>
        </div>
      </div>

      {/* ── BODY (no scroll) ── */}
      <div className="flex-1 min-h-0 flex flex-col gap-4 p-6">

        {/* Metric cards */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          {METRICS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-card border border-border rounded-xl px-4 py-3.5 flex items-center justify-between hover:shadow-sm hover:border-foreground/15 transition-all duration-200">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</p>
                <p className="text-lg font-bold text-foreground tabular-nums leading-none">{value}</p>
              </div>
              <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-foreground/50" />
              </div>
            </div>
          ))}
        </div>

        {/* Main row: Quick Access (2/3) + Recent Transactions (1/3) */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">

          {/* Quick Access — 3×3 grid */}
          <div className="col-span-2 bg-card border border-border rounded-xl overflow-hidden flex flex-col min-h-0">
            <div className="px-5 py-3 border-b border-border shrink-0 flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-sm font-semibold text-foreground">Quick Access</p>
              <span className="text-xs text-muted-foreground/50 ml-1">— jump to any section</span>
            </div>
            <div className="flex-1 p-4 grid grid-cols-3 auto-rows-fr gap-3">
              {QUICK_ACCESS.map((item) => (
                <QuickCard key={item.title} item={item} navigate={navigate} />
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col min-h-0">
            <div className="px-5 py-3 border-b border-border shrink-0 flex items-center gap-2">
              <ArrowLeftRight className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-sm font-semibold text-foreground">Recent Transactions</p>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-border">
              {RECENT_TXN.map((txn) => (
                <div key={txn.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className={cn(
                    "h-7 w-7 rounded-lg flex items-center justify-center shrink-0",
                    txn.type === "credit" ? "bg-emerald-50" : "bg-red-50",
                  )}>
                    {txn.type === "credit"
                      ? <ArrowUpRight  className="h-3.5 w-3.5 text-emerald-600" />
                      : <ArrowDownLeft className="h-3.5 w-3.5 text-red-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{txn.name}</p>
                    <p className="text-[10px] text-muted-foreground">{txn.date}</p>
                  </div>
                  <span className={cn(
                    "text-sm font-bold tabular-nums shrink-0",
                    txn.type === "credit" ? "text-emerald-600" : "text-red-500",
                  )}>
                    {txn.type === "credit" ? "+" : "−"}{fmtAmt(txn.amount)}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border shrink-0">
              <button
                onClick={() => navigate("/transactions")}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                View all transactions <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
