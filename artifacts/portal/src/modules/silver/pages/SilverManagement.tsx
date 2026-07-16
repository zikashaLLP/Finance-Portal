import { useState } from "react";
import { Medal } from "lucide-react";
import PurchaseSaleTab from "../components/PurchaseSaleTab";
import StockSummaryTab from "../components/StockSummaryTab";

type Tab = "purchase-sale" | "stock-summary";

export default function SilverManagement() {
  const [tab, setTab] = useState<Tab>("purchase-sale");

  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="px-8 pt-6 pb-5 border-b border-border flex items-center justify-between shrink-0">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center">
            <Medal className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-0.5">
              Silver Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Track silver stock, rates &amp; transactions
            </p>
          </div>
        </div>

        {/* Tabs — segmented control */}
        <div className="flex items-center gap-1 bg-zinc-200 rounded-xl p-1">
          <button
            onClick={() => setTab("purchase-sale")}
            className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              tab === "purchase-sale"
                ? "bg-white text-foreground shadow-sm"
                : "text-zinc-500 hover:text-foreground"
            }`}
          >
            Purchase / Sale
          </button>
          <button
            onClick={() => setTab("stock-summary")}
            className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              tab === "stock-summary"
                ? "bg-white text-foreground shadow-sm"
                : "text-zinc-500 hover:text-foreground"
            }`}
          >
            Stock Summary
          </button>
        </div>

        <div className="w-[180px]" />
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8">
        {tab === "purchase-sale" && <PurchaseSaleTab />}
        {tab === "stock-summary" && <StockSummaryTab />}
      </div>
    </div>
  );
}
