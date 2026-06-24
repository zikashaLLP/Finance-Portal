import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useTransactionTab } from "@/modules/transactions/context/TransactionTabContext";

function TransactionTabs() {
  const ctx = useTransactionTab();
  if (!ctx) return null;
  const { activeTab, setActiveTab } = ctx;

  const tabs = [
    { value: "daily", label: "Daily Cash Reconciliation" },
    { value: "ledger", label: "Cash Book" },
  ];

  return (
    <div className="flex items-end gap-6 h-full" data-testid="header-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          data-testid={`tab-${tab.value}`}
          className={[
            "pb-3 text-sm font-medium border-b-[2.5px] transition-colors whitespace-nowrap",
            activeTab === tab.value
              ? "border-foreground text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default function Topbar() {
  const [location] = useLocation();
  const isTransactions = location.startsWith("/transactions");

  const getPageContext = () => {
    if (isTransactions) return { title: "Transactions", subtitle: "Manage cashbook & daily reconciliation" };
    if (location.startsWith("/ledger")) return { title: "Ledger", subtitle: "View complete ledger" };
    return { title: "Dashboard", subtitle: "Overview" };
  };

  const { title, subtitle } = getPageContext();

  return (
    <header
      className="bg-transparent border-b border-border flex flex-col shrink-0 px-8"
      style={{ height: isTransactions ? "5rem" : "4rem" }}
      data-testid="topbar"
    >
      {/* Top row: title + actions */}
      <div className="flex items-center justify-between pt-4" style={{ height: isTransactions ? "3rem" : "100%" }}>
        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-semibold text-foreground tracking-tight leading-tight">{title}</h1>
          {!isTransactions && <p className="text-muted-foreground text-xs mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-56 hidden md:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 bg-background border-border focus-visible:ring-1 focus-visible:bg-background h-9 shadow-sm rounded-full text-sm"
              data-testid="input-global-search"
            />
          </div>

          <button
            className="relative h-9 w-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors shadow-sm"
            data-testid="btn-notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
          </button>
        </div>
      </div>

      {/* Tabs row — only on transactions page */}
      {isTransactions && (
        <TransactionTabs />
      )}
    </header>
  );
}
