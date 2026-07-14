import { useState } from "react";
import {
  Gem, Star, Search, Plus,
  LayoutList, Edit, CreditCard, Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "@/shared/components/Pagination";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";

/* ── MOCK DATA ── */
type Plan = {
  id: string;
  name: "Diamond Harvest Plan" | "Gold Harvest Plan";
  client: string;
  type: "diamond" | "gold";
  group: string | null;
  card: string | null;
  totalValue: number;
  monthly: number;
  duration: string;
  totalPaid: number;
  status: "active" | "redeemed" | "pending";
};

const PLANS: Plan[] = [
  { id:"P001", name:"Diamond Harvest Plan", client:"DHEERAJ M",                 type:"diamond", group:"Group 20", card:"Card #1",  totalValue:180000, monthly:15000, duration:"12 months", totalPaid:135000, status:"active"   },
  { id:"P002", name:"Diamond Harvest Plan", client:"SUSHMA GUPTA",              type:"diamond", group:"Group 20", card:"Card #8",  totalValue:60000,  monthly:5000,  duration:"12 months", totalPaid:5000,   status:"active"   },
  { id:"P003", name:"Diamond Harvest Plan", client:"SUSHMA GUPTA",              type:"diamond", group:"Group 20", card:"Card #7",  totalValue:60000,  monthly:5000,  duration:"12 months", totalPaid:5000,   status:"active"   },
  { id:"P004", name:"Diamond Harvest Plan", client:"MUKESH BHAI (WATER SUPPLY)",type:"diamond", group:"Group 20", card:"Card #23", totalValue:60000,  monthly:5000,  duration:"12 months", totalPaid:10000,  status:"active"   },
  { id:"P005", name:"Gold Harvest Plan",    client:"BHASKAR KANERI CNEXTKRAFT", type:"gold",    group:null,       card:null,       totalValue:120000, monthly:10000, duration:"12 months", totalPaid:40000,  status:"active"   },
  { id:"P006", name:"Gold Harvest Plan",    client:"BASKAR",                    type:"gold",    group:null,       card:null,       totalValue:120000, monthly:10000, duration:"12 months", totalPaid:40000,  status:"active"   },
  { id:"P007", name:"Diamond Harvest Plan", client:"TEJAL SOMAIYA",             type:"diamond", group:"Group 20", card:"Card #17", totalValue:60000,  monthly:5000,  duration:"12 months", totalPaid:15000,  status:"active"   },
  { id:"P008", name:"Gold Harvest Plan",    client:"VARSHAJI DAUGHTER",         type:"gold",    group:null,       card:null,       totalValue:120000, monthly:10000, duration:"12 months", totalPaid:30000,  status:"active"   },
  { id:"P009", name:"Diamond Harvest Plan", client:"BISMI (BHAVESH)",           type:"diamond", group:"Group 20", card:"Card #18", totalValue:108000, monthly:9000,  duration:"12 months", totalPaid:18000,  status:"active"   },
  { id:"P010", name:"Diamond Harvest Plan", client:"HEENA KHATRI",              type:"diamond", group:"Group 20", card:"Card #44", totalValue:24000,  monthly:2000,  duration:"12 months", totalPaid:4000,   status:"active"   },
  { id:"P011", name:"Diamond Harvest Plan", client:"ROHAN PANSARE",             type:"diamond", group:"Group 20", card:"Card #16", totalValue:240000, monthly:20000, duration:"12 months", totalPaid:80000,  status:"active"   },
  { id:"P012", name:"Diamond Harvest Plan", client:"ANKIT C/F BHAVESH BHAI",   type:"diamond", group:"Group 18", card:"Card #17", totalValue:300000, monthly:25000, duration:"12 months", totalPaid:300000, status:"redeemed" },
  { id:"P013", name:"Diamond Harvest Plan", client:"DEEPA MAM",                 type:"diamond", group:"Group 13", card:"Card #21", totalValue:60000,  monthly:5000,  duration:"12 months", totalPaid:5000,   status:"active"   },
  { id:"P014", name:"Gold Harvest Plan",    client:"RAMESH SHAH",               type:"gold",    group:null,       card:null,       totalValue:96000,  monthly:8000,  duration:"12 months", totalPaid:16000,  status:"active"   },
  { id:"P015", name:"Diamond Harvest Plan", client:"PRIYA MEHTA",               type:"diamond", group:"Group 19", card:"Card #5",  totalValue:120000, monthly:10000, duration:"12 months", totalPaid:50000,  status:"active"   },
];

const PAGE_SIZE = 8;

const fmtINR = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits:0 }).format(n);

const totalPlans    = PLANS.length;
const activePlans   = PLANS.filter(p => p.status === "active").length;
const redeemedPlans = PLANS.filter(p => p.status === "redeemed").length;
const totalValue    = PLANS.reduce((s, p) => s + p.totalValue, 0);

export default function HarvestManagement() {
  const [search, setSearch] = useState("");
  const [page,   setPage]   = useState(1);

  const filtered = PLANS.filter(p => {
    const q = search.toLowerCase();
    return !q || p.client.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || (p.group ?? "").toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleSearch(q: string) {
    setSearch(q);
    setPage(1);
  }

  return (
    <div className="w-full flex flex-col h-full">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-5 border-b border-border shrink-0 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Harvest Plan Management</h1>
          </div>
          <p className="text-sm text-muted-foreground">Manage customer installment and investment plans</p>
        </div>
        <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors">
          <Plus className="h-3.5 w-3.5" />
          Create New Plan
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-5">

        {/* METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:"Total Plans",    value: String(totalPlans),    sub:"All time",           icon: LayoutList, iclr:"text-foreground/50" },
            { label:"Active Plans",   value: String(activePlans),   sub:"Currently running",  icon: Star,       iclr:"text-emerald-500"   },
            { label:"Redeemed Plans", value: String(redeemedPlans), sub:"Completed",          icon: Gem,        iclr:"text-foreground/50" },
            { label:"Total Value",    value: fmtINR(totalValue),    sub:"All plans combined", icon: Wallet,     iclr:"text-foreground/50" },
          ].map(({ label, value, sub, icon, iclr }, i) => (
            <AnimatedMetricCard key={label} label={label} value={value} sub={sub} icon={icon} iconCls={iclr} index={i} />
          ))}
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by client name, group number, card number, or monthly amount..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
          />
        </div>

        {/* TABLE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">
                Active Harvest Plans ({filtered.length})
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Plan Name","Client","Type","Group / Card","Total Value","Monthly","Duration","Total Paid","Status","Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paged.map(plan => (
                  <tr key={plan.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="text-xs font-semibold text-foreground whitespace-nowrap">{plan.name}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-xs text-foreground font-medium whitespace-nowrap">{plan.client}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      {plan.type === "diamond"
                        ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold">
                            <Gem className="h-2.5 w-2.5" /> Diamond
                          </span>
                        : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold">
                            <Star className="h-2.5 w-2.5" /> Gold
                          </span>
                      }
                    </td>
                    <td className="px-4 py-3.5">
                      {plan.group
                        ? <div>
                            <p className="text-xs text-foreground/70 font-medium">{plan.group}</p>
                            <p className="text-[10px] text-muted-foreground">{plan.card}</p>
                          </div>
                        : <span className="text-muted-foreground text-xs">—</span>
                      }
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold text-foreground tabular-nums">{fmtINR(plan.totalValue)}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-foreground tabular-nums">{fmtINR(plan.monthly)}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{plan.duration}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <span className={cn(
                          "text-xs font-semibold tabular-nums",
                          plan.totalPaid >= plan.totalValue ? "text-emerald-600" : "text-foreground",
                        )}>
                          {fmtINR(plan.totalPaid)}
                        </span>
                        {/* mini progress */}
                        <div className="mt-1 h-1 w-16 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", plan.totalPaid >= plan.totalValue ? "bg-emerald-500" : "bg-foreground/40")}
                            style={{ width: `${Math.min(100, Math.round((plan.totalPaid / plan.totalValue) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold",
                        plan.status === "active"   && "bg-emerald-100 text-emerald-700",
                        plan.status === "redeemed" && "bg-muted text-muted-foreground",
                        plan.status === "pending"  && "bg-amber-100 text-amber-700",
                      )}>
                        {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border border-border hover:bg-sidebar-accent transition-colors whitespace-nowrap">
                          <Edit className="h-3 w-3" /> Edit
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border border-border hover:bg-sidebar-accent transition-colors whitespace-nowrap">
                          <CreditCard className="h-3 w-3" /> Card
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border border-border hover:bg-sidebar-accent transition-colors whitespace-nowrap">
                          <Wallet className="h-3 w-3" /> Pay
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-6 py-10 text-center text-sm text-muted-foreground">
                      No plans match the search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            itemLabel="plans"
          />
        </div>

      </div>
    </div>
  );
}
