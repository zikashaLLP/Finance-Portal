import { useState } from "react";
import { Wallet, Landmark, TrendingUp, TrendingDown, Bell, SlidersHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTransactions } from "../data/mockTransactions";
import MetricCard from "../components/MetricCard";
import CashBookTable from "../components/CashBookTable";
import OpeningBalanceModal, { OpeningBalances } from "../components/OpeningBalanceModal";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export default function Transactions() {
  const [openingBalanceOpen, setOpeningBalanceOpen] = useState(false);
  const [openingBalances, setOpeningBalances] = useState<OpeningBalances>({
    cash: 425000,
    hdfc: 0,
    sbi: 0,
  });

  const totalOpening = openingBalances.cash + openingBalances.hdfc + openingBalances.sbi;

  const metrics = [
    {
      title: "Cash in Hand",
      value: "₹1,24,500",
      delta: "+₹12,400 today",
      icon: <Wallet className="h-5 w-5" />,
      iconBgColor: "var(--emerald-50, #ecfdf5)",
      iconColor: "var(--emerald-600, #059669)",
    },
    {
      title: "Bank Balance",
      value: "₹8,45,320",
      delta: "+₹45,000 this week",
      icon: <Landmark className="h-5 w-5" />,
      iconBgColor: "var(--blue-50, #eff6ff)",
      iconColor: "var(--blue-600, #2563eb)",
    },
    {
      title: "Cash Flow In",
      value: "₹2,18,750",
      delta: "+18% this month",
      icon: <TrendingUp className="h-5 w-5" />,
      iconBgColor: "var(--emerald-50, #ecfdf5)",
      iconColor: "var(--emerald-600, #059669)",
    },
    {
      title: "Bank Flow In",
      value: "₹5,62,100",
      delta: "+₹78,000 this month",
      icon: <TrendingDown className="h-5 w-5" />,
      iconBgColor: "var(--violet-50, #f5f3ff)",
      iconColor: "var(--violet-600, #7c3aed)",
    },
  ];

  return (
    <div className="w-full flex flex-col" data-testid="page-transactions">
      <Tabs defaultValue="daily" className="w-full">

        {/* Page header: heading + tagline + tabs + actions */}
        <div className="px-8 pt-6 border-b border-border flex items-start justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">
              Transactions
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Manage cashbook &amp; daily reconciliation
            </p>
            <TabsList className="bg-transparent p-0 h-auto gap-6 justify-start rounded-none">
              <TabsTrigger
                value="daily"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="tab-daily"
              >
                Daily Cash Reconciliation
              </TabsTrigger>
              <TabsTrigger
                value="ledger"
                className="rounded-none border-b-[3px] border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="tab-ledger"
              >
                Cash Book
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex items-center gap-2 mt-1 shrink-0">
            {/* Opening Balance button */}
            <button
              onClick={() => setOpeningBalanceOpen(true)}
              className="flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors shadow-sm"
              data-testid="btn-opening-balance"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Opening Balance
            </button>

            {/* Bell */}
            <button
              className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm"
              data-testid="btn-notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            </button>
          </div>
        </div>

        <TabsContent value="daily" className="space-y-6 animate-in fade-in-50 duration-500 mt-0 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <MetricCard key={metric.title} {...metric} index={i} />
            ))}
          </div>
          <CashBookTable transactions={mockTransactions} />
        </TabsContent>

        <TabsContent value="ledger" className="animate-in fade-in-50 duration-500 mt-0 space-y-6 p-8">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-wrap gap-8 items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Cash Book Ledger</h2>
              <p className="text-sm text-muted-foreground">Showing full historical ledger data</p>
            </div>
            <div className="flex flex-wrap gap-8">
              {/* Per-account opening balances */}
              <div className="flex flex-col gap-1">
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Opening Balance</p>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="text-xs text-muted-foreground">Cash</span>
                  <span className="text-xs font-semibold text-foreground ml-1">{fmt(openingBalances.cash)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="text-xs text-muted-foreground">HDFC</span>
                  <span className="text-xs font-semibold text-foreground ml-1">{fmt(openingBalances.hdfc)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  <span className="text-xs text-muted-foreground">SBI</span>
                  <span className="text-xs font-semibold text-foreground ml-1">{fmt(openingBalances.sbi)}</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">Total Credits</p>
                <p className="font-semibold text-emerald-600">₹8,52,000</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">Total Debits</p>
                <p className="font-semibold text-red-600">₹3,47,500</p>
              </div>
              <div className="pl-6 border-l border-border">
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">Closing Balance</p>
                <p className="font-bold text-blue-600 text-lg">{fmt(totalOpening + 852000 - 347500)}</p>
              </div>
            </div>
          </div>
          <CashBookTable transactions={mockTransactions} />
        </TabsContent>

      </Tabs>

      {/* Opening Balance Modal */}
      <OpeningBalanceModal
        open={openingBalanceOpen}
        onClose={() => setOpeningBalanceOpen(false)}
        balances={openingBalances}
        onSave={setOpeningBalances}
      />
    </div>
  );
}
