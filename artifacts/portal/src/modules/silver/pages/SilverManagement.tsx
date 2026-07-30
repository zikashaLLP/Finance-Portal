import { useState } from "react";
import PurchaseSaleTab from "../components/PurchaseSaleTab";
import StockSummaryTab from "../components/StockSummaryTab";

type Tab = "purchase-sale" | "stock-summary";

export default function SilverManagement() {
  const [tab, setTab] = useState<Tab>("purchase-sale");

  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border flex items-center shrink-0">
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
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8">
        {tab === "purchase-sale" && <PurchaseSaleTab />}
        {tab === "stock-summary" && <StockSummaryTab />}
      </div>
    </div>
  );
}
