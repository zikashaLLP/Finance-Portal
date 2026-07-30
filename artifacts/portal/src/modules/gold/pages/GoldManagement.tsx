import { useState } from "react";
import { Scale } from "lucide-react";
import PureGoldTab from "../components/PureGoldTab";
import OldGoldTab from "../components/OldGoldTab";
import { GoldOpeningBalanceModal } from "../components/GoldOpeningBalanceModal";

type Tab = "pure" | "old";

export default function GoldManagement() {
  const [tab, setTab] = useState<Tab>("pure");
  const [openingOpen, setOpeningOpen] = useState(false);

  return (
    <div className="w-full flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border flex items-center justify-between shrink-0">
        {/* Tabs — segmented control */}
        <div className="flex items-center gap-1 bg-zinc-200 rounded-xl p-1">
          <button
            onClick={() => setTab("pure")}
            className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              tab === "pure"
                ? "bg-white text-foreground shadow-sm"
                : "text-zinc-500 hover:text-foreground"
            }`}
          >
            Pure Gold
          </button>
          <button
            onClick={() => setTab("old")}
            className={`px-5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              tab === "old"
                ? "bg-white text-foreground shadow-sm"
                : "text-zinc-500 hover:text-foreground"
            }`}
          >
            Old Gold
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Opening Balance button */}
          <button
            onClick={() => setOpeningOpen(true)}
            className="flex items-center gap-2 h-9 px-4 rounded-lg border border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors text-sm font-medium shadow-sm"
          >
            <Scale className="h-3.5 w-3.5" />
            Opening Balance
          </button>

        </div>
      </div>
      {/* Tab content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8">
        {tab === "pure" && <PureGoldTab />}
        {tab === "old" && <OldGoldTab />}
      </div>
      <GoldOpeningBalanceModal
        open={openingOpen}
        onClose={() => setOpeningOpen(false)}
        onSave={() => setOpeningOpen(false)}
      />
    </div>
  );
}
