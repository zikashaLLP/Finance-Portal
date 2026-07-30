import { useState } from "react";
import { TrendingUp, TrendingDown, Landmark } from "lucide-react";
import NotificationBell from "@/shared/components/NotificationBell";
import { cn } from "@/lib/utils";
import AnimatedMetricCard from "@/shared/components/AnimatedMetricCard";
import Transactions from "../../transactions/pages/Transactions";
import Ledger from "../../ledger/pages/Ledger";
import FinancePlanning from "../../finance/pages/FinancePlanning";
import AccountCard from "../components/AccountCard";
import { mockAccounts, accountsSummary } from "../data/mockAccounts";

type Tab = "transactions" | "ledger" | "accounts" | "planning";

const TABS: { key: Tab; label: string }[] = [
  { key: "transactions", label: "Transactions" },
  { key: "ledger",       label: "Ledger"       },
  { key: "accounts",     label: "Accounts"     },
  { key: "planning",     label: "Planning"     },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export default function Accounts() {
  const [tab, setTab] = useState<Tab>("transactions");

  const { totalCashIn, totalCashOut, netPosition } = accountsSummary;

  return (
    <div className="w-full flex flex-col h-full" data-testid="page-accounts">

      {/* ── Page header ── */}
      <div className="px-8 pt-6 border-b border-border shrink-0">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">Accounts</h1>
            <p className="text-sm text-muted-foreground">Cash, bank &amp; financial overview</p>
          </div>

          <div className="flex items-center gap-2 mt-1 shrink-0">
            <NotificationBell />
          </div>
        </div>

        {/* Summary metric cards */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <AnimatedMetricCard
            label="Total Cash In"
            value={fmt(totalCashIn)}
            sub="All accounts combined"
            icon={TrendingDown}
            iconCls="text-emerald-600"
            index={0}
          />
          <AnimatedMetricCard
            label="Total Cash Out"
            value={fmt(totalCashOut)}
            sub="All accounts combined"
            icon={TrendingUp}
            iconCls="text-red-500"
            index={1}
          />
          <AnimatedMetricCard
            label="Net Position"
            value={fmt(Math.abs(netPosition))}
            sub={netPosition >= 0 ? "Net receivable" : "Net payable"}
            icon={Landmark}
            iconCls={netPosition >= 0 ? "text-indigo-600" : "text-red-600"}
            valueColor={netPosition >= 0 ? "text-indigo-600" : "text-red-600"}
            index={2}
          />
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "pb-2 text-sm font-medium border-b-[3px] transition-colors",
                tab === t.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
              data-testid={`tab-${t.key}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-hidden min-h-0">

        {tab === "transactions" && (
          <div className="h-full overflow-y-auto no-scrollbar">
            <Transactions />
          </div>
        )}

        {tab === "ledger" && (
          <div className="h-full overflow-hidden">
            <Ledger />
          </div>
        )}

        {tab === "accounts" && (
          <div className="h-full overflow-y-auto no-scrollbar px-8 py-6 space-y-4">
            {mockAccounts.map((account, i) => (
              <AccountCard key={account.id} account={account} defaultExpanded={i === 0} />
            ))}
          </div>
        )}

        {tab === "planning" && (
          <div className="h-full overflow-hidden">
            <FinancePlanning />
          </div>
        )}

      </div>
    </div>
  );
}
