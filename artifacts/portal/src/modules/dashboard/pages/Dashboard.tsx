import { useLocation } from "wouter";
import {
  Crown, TrendingUp, Users, Clock, Package,
  ShoppingCart, Layers, ShoppingBag, UserCheck,
  Diamond, Hammer, Gem, BookOpen,
  ArrowLeftRight, RefreshCw, Truck,
  CheckCircle, Shield, Zap,
  ArrowDownLeft, ArrowUpRight,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── MOCK DATA ── */
const PORTFOLIO_VALUE = "₹11,48,23,049.81";

const METRICS = [
  { label: "Today's Sales",   value: "₹0.00",      icon: TrendingUp, accent: "text-foreground", bg: "bg-muted" },
  { label: "Active Clients",  value: "625",         icon: Users,      accent: "text-foreground", bg: "bg-muted" },
  { label: "Pending Orders",  value: "13",          icon: Clock,      accent: "text-foreground", bg: "bg-muted" },
  { label: "Stock Items",     value: "56,42,94,295",icon: Package,    accent: "text-foreground", bg: "bg-muted" },
];

const QUICK_ACCESS = [
  { label: "MOST USED",  title: "Quick Sale",         desc: "Create new sales instantly",     icon: ShoppingCart, path: "/sales",            iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "INVENTORY",  title: "Stock Manager",      desc: "Add & manage inventory",          icon: Layers,       path: "/stock",            iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "BUYING",     title: "Purchase Orders",    desc: "Create purchase orders",          icon: ShoppingBag,  path: "/purchase",         iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "CRM",        title: "Client Manager",     desc: "Manage client relationships",     icon: UserCheck,    path: "/sales/clients",    iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "PREMIUM",    title: "Diamond Orders",     desc: "Manage diamond orders",           icon: Diamond,      path: "/diamond/orders",   iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "CRAFT",      title: "Karigar Work",       desc: "Manufacturing workflow",          icon: Hammer,       path: "/karigar",          iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "GOLD",       title: "Gold Operations",    desc: "Gold inventory & purity",         icon: Gem,          path: "/gold",             iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "PLANS",      title: "Finance Planning",   desc: "Financial planning & reports",    icon: BarChart3,    path: "/finance",          iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "FINANCE",    title: "Ledger Balance",     desc: "Account balances",                icon: BookOpen,     path: "/ledger",           iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "PAYMENTS",   title: "Transactions",       desc: "Payment tracking",                icon: ArrowLeftRight,path: "/transactions",    iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "RECYCLING",  title: "Old Gold Process",   desc: "Gold recycling workflow",         icon: RefreshCw,    path: "/gold",             iconBg: "bg-foreground",       iconColor: "text-background"  },
  { label: "SUPPLIERS",  title: "Vendor Management",  desc: "Supplier relationships",          icon: Truck,        path: "/purchase/vendors", iconBg: "bg-foreground",       iconColor: "text-background"  },
];

const RECENT_TXN = [
  { id:"t1", name:"SANDWICH",              amount:-300,   date:"14/07/2026", type:"debit"  },
  { id:"t2", name:"DONATION TO JIMIT BHAI",amount:-3000,  date:"14/07/2026", type:"debit"  },
  { id:"t3", name:"VIKAS",                 amount:-300,   date:"14/07/2026", type:"debit"  },
  { id:"t4", name:"ANISH DISHIT SIR & AUTO",amount:-400,  date:"14/07/2026", type:"debit"  },
  { id:"t5", name:"VIKAS VARIYALI",        amount:-200,   date:"14/07/2026", type:"debit"  },
];

const fmtAmt = (n: number) => {
  const abs = Math.abs(n);
  return new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(abs);
};

const today = new Date().toLocaleDateString("en-US", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

/* ── QUICK ACCESS CARD ── */
function QuickCard({ item, navigate }: {
  item: typeof QUICK_ACCESS[0];
  navigate: (path: string) => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={() => navigate(item.path)}
      className="group bg-card border border-border rounded-2xl p-5 text-left hover:shadow-md hover:border-foreground/20 hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", item.iconBg)}>
          <Icon className={cn("h-5 w-5", item.iconColor)} />
        </div>
        <span className="text-[10px] font-bold tracking-widest text-muted-foreground/60 uppercase">{item.label}</span>
      </div>
      <div>
        <p className="text-sm font-bold text-foreground group-hover:text-foreground transition-colors mb-0.5">{item.title}</p>
        <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
      </div>
    </button>
  );
}

/* ── MAIN ── */
export default function Dashboard() {
  const [, navigate] = useLocation();

  return (
    <div className="w-full flex flex-col h-full">

      {/* ── HERO HEADER ── */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 bg-foreground">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="h-6 w-6 text-background/80" />
              <h1 className="text-2xl font-bold text-background tracking-tight">Business Command Center</h1>
            </div>
            <p className="text-sm text-background/60">{today} • Your Daily Operations Hub</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-bold text-background tabular-nums tracking-tight">{PORTFOLIO_VALUE}</p>
            <p className="text-xs text-background/50 mt-0.5 uppercase tracking-wider">Total Portfolio Value</p>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-6">

        {/* ── METRIC CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map(({ label, value, icon: Icon, accent, bg }) => (
            <div key={label} className="bg-card border border-border rounded-2xl shadow-sm p-5 flex items-center justify-between hover:shadow-md hover:border-foreground/15 transition-all duration-200">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</p>
                <p className={cn("text-xl font-bold tabular-nums leading-none", accent)}>{value}</p>
              </div>
              <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center shrink-0", bg)}>
                <Icon className="h-5 w-5 text-foreground/60" />
              </div>
            </div>
          ))}
        </div>

        {/* ── DAILY OPERATIONS HUB ── */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="bg-foreground px-6 py-4">
            <div className="flex items-center gap-2 mb-0.5">
              <Zap className="h-4 w-4 text-background/70" />
              <h2 className="text-base font-bold text-background">Daily Operations Hub</h2>
            </div>
            <p className="text-xs text-background/50">Quick access to your most used business functions</p>
          </div>
          {/* Grid of tiles */}
          <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {QUICK_ACCESS.map((item) => (
              <QuickCard key={item.title} item={item} navigate={navigate} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM ROW: Recent Txns + System Status ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Transactions */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-foreground px-6 py-4">
              <h3 className="text-sm font-bold text-background">Recent Transactions</h3>
              <p className="text-[11px] text-background/50 mt-0.5">Latest business activity</p>
            </div>
            <div className="divide-y divide-border">
              {RECENT_TXN.map((txn) => (
                <div key={txn.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors">
                  <div className={cn(
                    "h-8 w-8 rounded-xl flex items-center justify-center shrink-0",
                    txn.type === "credit" ? "bg-emerald-100" : "bg-red-100",
                  )}>
                    {txn.type === "credit"
                      ? <ArrowUpRight   className="h-4 w-4 text-emerald-600" />
                      : <ArrowDownLeft  className="h-4 w-4 text-red-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{txn.name}</p>
                    <p className="text-[11px] text-muted-foreground">{txn.date}</p>
                  </div>
                  <span className={cn(
                    "text-sm font-bold tabular-nums",
                    txn.type === "credit" ? "text-emerald-600" : "text-red-500",
                  )}>
                    {txn.type === "credit" ? "+" : "-"}{fmtAmt(txn.amount)}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-border">
              <button onClick={() => navigate("/transactions")}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View all transactions <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-foreground px-6 py-4">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-background/70" />
                <h3 className="text-sm font-bold text-background">System Status</h3>
              </div>
              <p className="text-[11px] text-background/50 mt-0.5">Business health overview</p>
            </div>
            <div className="p-5 space-y-4">
              {/* All systems operational */}
              <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">All Systems Operational</p>
                  <p className="text-[11px] text-emerald-600">Business running smoothly</p>
                </div>
              </div>

              {[
                { label: "Data Protection", status: "ACTIVE",  cls: "bg-emerald-100 text-emerald-700" },
                { label: "Backup System",   status: "SECURE",  cls: "bg-blue-100 text-blue-700"       },
                { label: "Performance",     status: "OPTIMAL", cls: "bg-violet-100 text-violet-700"   },
              ].map(({ label, status, cls }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide", cls)}>
                    {status}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini stats */}
            <div className="border-t border-border px-5 py-4 grid grid-cols-3 gap-3">
              {[
                { label: "Uptime",    value: "99.9%"  },
                { label: "Modules",   value: "12"     },
                { label: "Users",     value: "3"      },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
