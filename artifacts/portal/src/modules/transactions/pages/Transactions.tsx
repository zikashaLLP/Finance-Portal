import { Wallet, Landmark, TrendingUp, TrendingDown } from "lucide-react";
import { mockTransactions } from "../data/mockTransactions";
import MetricCard from "../components/MetricCard";
import CashBookTable from "../components/CashBookTable";
import { useTransactionTab } from "../context/TransactionTabContext";

export default function Transactions() {
  const ctx = useTransactionTab();
  const activeTab = ctx?.activeTab ?? "daily";

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
    <div className="p-8 w-full" data-testid="page-transactions">
      {activeTab === "daily" && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <MetricCard key={metric.title} {...metric} index={i} />
            ))}
          </div>
          <CashBookTable transactions={mockTransactions} />
        </div>
      )}

      {activeTab === "ledger" && (
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-wrap gap-8 items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Cash Book Ledger</h2>
              <p className="text-sm text-muted-foreground">Showing full historical ledger data</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">Opening Balance</p>
                <p className="font-semibold text-foreground">₹4,25,000</p>
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
                <p className="font-bold text-blue-600 text-lg">₹9,29,500</p>
              </div>
            </div>
          </div>
          <CashBookTable transactions={mockTransactions} />
        </div>
      )}
    </div>
  );
}
